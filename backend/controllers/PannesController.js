const Panne = require('../models/PannesModel');
const Dashboard = require('../models/DashboardModel');
const StatisticsCentre = require('../models/StatisticsCentreModel');
const Transaction = require('../models/TransactionModel')
const validator = require('validator');
const multer = require('multer');
const path = require('path');
const { Op, Sequelize } = require('sequelize');


const index = async (req, res) => {
  // Handle request to get all Pannes
  const { Role, CentreDepot, UserID} = req.query;
  try {
    if(Role === 'Admin'){
      const Pannes = await Panne.findAll({
        where: {
          Progres: {
            [Op.lt]: 5, // Less than 5
          },
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }else{
      const Pannes = await Panne.findAll({
        where: {
          CentreDepot: CentreDepot,
          Progres: {
            [Op.lt]: 5,
          },
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}
const GetAllDelivred = async (req, res) => {
  const { Role, CentreDepot, UserID} = req.query;
  
  try {
    if(Role === 'Admin'){
      const Pannes = await Panne.findAll({
        where: {
          Progres: 5,
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }else if(Role === 'DRCentre'){
      const Pannes = await Panne.findAll({
        where: {
          CentreDepot: CentreDepot,
          Progres: 5,
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }else{
      const Pannes = await Panne.findAll({
        where: {
          CentreDepot: CentreDepot,
          Progres: 5,
          UserID: UserID
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}
const GetByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Pannes = await Panne.findByPk(id);
    if (Pannes) {
      res.json(Pannes);
    } else {
      res.json({ message: 'No panne found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error getting panne by ID');
  }
  
}
const GetByUserID = async (req, res) => {
  const { id } = req.params;
  try {
    const Pannes = await Panne.findAll({
      where: {
        UserID: id
      }
    });
    if (Pannes) {
      res.status(200).json(Pannes);
    } else {
      res.status(440).json({ message: 'No panne found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error getting panne by ID');
  }
}
const GetByRefProduct = async (req, res) => {
  const { Ref, id } = req.params;

  try {
    const currentPanne = await Panne.findOne({
      where: {
        id: id,
      },
    });

    if (!currentPanne) {
      return res.json({ message: 'Panne not found' });
    }

    const allPannes = await Panne.findAll({
      where: {
        ReferanceProduit: Ref,
      },
    });

    const filteredPannes = allPannes.filter((panne) => panne.id !== currentPanne.id);

    if (filteredPannes.length > 0) {
      res.json({ Pannes: filteredPannes });
    } else {
      res.json({ message: 'No panne found without the current panne' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const GetByBon = async (req, res) => {
  const { BonRef } = req.params;

  try {
    const currentPanne = await Panne.findOne({
      where: {
        BDPDFfile: BonRef + '.pdf',
      },
    });

    if (!currentPanne) {
      return res.status(400).json({ message: 'Numero de bon incorrect' });
    }
    res.status(200).json({ Panne: currentPanne });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Create = async (req, res) => {
  // Handle request to create a new Panne
  const { Nom, Prenom, Email, Telephone, 
    ReferanceProduit, TypePanne, Wilaya, 
    CentreDepot, DateDepot, PDFFilename} = req.body;
try {
    // validation
    if(!Nom || !Prenom || !Email || !Telephone || !ReferanceProduit 
      || !TypePanne || !Wilaya || !CentreDepot || !DateDepot 
      || validator.isEmpty(Nom) || validator.isEmpty(Prenom) || validator.isEmpty(Email) 
      || validator.isEmpty(Telephone) || validator.isEmpty(ReferanceProduit) || validator.isEmpty(TypePanne) 
      || validator.isEmpty(Wilaya) || validator.isEmpty(CentreDepot) || validator.isEmpty(DateDepot)){
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis" });
    }
    if(!validator.isEmail(Email)){
        return res.status(400).json({message: "L'email n'est pas valide"});
    }
    if(PDFFilename){
      const newPanne = await Panne.create({ Nom, Prenom, Email, Telephone, 
        ReferanceProduit, TypePanne, Wilaya,
        CentreDepot, DateDepot,
        [PDFFilename.startsWith('BD') ? 'BDPDFfile' : PDFFilename.startsWith('BL') ? 'BLPDFfile' : '']: PDFFilename
      }).then(async (Panne) => {
          const dashboard = await Dashboard.findOne({
            where: {
              createdAt : new Date().toISOString().slice(0, 10),
            }
          });
          const statistics = await StatisticsCentre.findOne({
            where: {
              Centre: CentreDepot,
              createdAt : new Date().toISOString().slice(0, 10),
            }
          });
          // check if dashboard and statistics exist for today
          if (!dashboard && !statistics) {
            // create dashboard
            const newDashboard = await Dashboard.create({
              ProduitEnAttente: 1,
              NbTicketsOuverts: 1,
            });
            await newDashboard.save().then(async () => {
              // create statistics
              const newStatistics = await StatisticsCentre.create({
                Centre: CentreDepot,
                ProduitEnAttente: 1,
                NbTicketsOuverts: 1,
              });
              await newStatistics.save();
              return res.status(200).json({message: 'Panne created successfully', Panne: Panne});
            }).catch((err) => {
              console.log("Error while creating dashboard", err);
            });
          }
          if(dashboard && !statistics){
            // create statistics
            const newStatistics = await StatisticsCentre.create({
              Centre: CentreDepot,
              ProduitEnAttente: 1,
              NbTicketsOuverts: 1,
            });
            await newStatistics.save().then(async () => {
              // update dashboard
              dashboard.ProduitEnAttente += 1;
              dashboard.NbTicketsOuverts += 1;          
              await dashboard.save();
              console.log("Dashboard updated successfully");
              return res.status(200).json({message: 'Panne created successfully', Panne: Panne});         
            }).catch((err) => {
              console.log("Error while creating statistics", err);
            });
          }
          if(dashboard && statistics){
            // update dashboard
            dashboard.ProduitEnAttente += 1;  
            dashboard.NbTicketsOuverts += 1;        
            await dashboard.save().then(async () => {
              // update statistics where centre = CentreDepot
              await StatisticsCentre.update(
                {
                  ProduitEnAttente:  statistics.ProduitEnAttente + 1,
                  NbTicketsOuverts: statistics.NbTicketsOuverts + 1,
                },
                {
                  where: {
                    Centre: CentreDepot,
                  },
                }
              );
              console.log("Dashboard updated successfully");
              // response
              return res.status(200).json({message: 'Panne created successfully', Panne: Panne});
            }).catch((err) => {
              console.log("Error while updating dashboard", err);
            });            
          }
        }).catch((err) => {
            console.log("Error while creating panne", err);
        });
    }else{
      const newPanne = await Panne.create({ Nom, Prenom, Email, Telephone, 
        ReferanceProduit, TypePanne, Wilaya,
        CentreDepot, DateDepot }).then(async (Panne) => {
          const dashboard = await Dashboard.findOne({
            where: {
              createdAt : new Date().toISOString().slice(0, 10),
            }
          });
          const statistics = await StatisticsCentre.findOne({
            where: {
              Centre: CentreDepot,
              createdAt : new Date().toISOString().slice(0, 10),
            }
          });
          // check if dashboard and statistics exist for today
          if (!dashboard && !statistics) {
            // create dashboard
            const newDashboard = await Dashboard.create({
              ProduitEnAttente: 1,
              NbTicketsOuverts: 1,
            });
            await newDashboard.save().then(async () => {
              // create statistics
              const newStatistics = await StatisticsCentre.create({
                Centre: CentreDepot,
                ProduitEnAttente: 1,
                NbTicketsOuverts: 1,
              });
              await newStatistics.save();
              return res.status(200).json({message: 'Panne created successfully', Panne: Panne});
            }).catch((err) => {
              console.log("Error while creating dashboard", err);
            });
          }
          if(dashboard && !statistics){
            // create statistics
            const newStatistics = await StatisticsCentre.create({
              Centre: CentreDepot,
              ProduitEnAttente: 1,
              NbTicketsOuverts: 1,
            });
            await newStatistics.save().then(async () => {
              // update dashboard
              dashboard.ProduitEnAttente += 1;
              dashboard.NbTicketsOuverts += 1;          
              await dashboard.save();
              console.log("Dashboard updated successfully");
              return res.status(200).json({message: 'Panne created successfully'});         
            }).catch((err) => {
              console.log("Error while creating statistics", err);
            });
          }
          if(dashboard && statistics){
            // update dashboard
            dashboard.ProduitEnAttente += 1;  
            dashboard.NbTicketsOuverts += 1;        
            await dashboard.save().then(async () => {
              // update statistics where centre = CentreDepot
              await StatisticsCentre.update(
                {
                  ProduitEnAttente:  statistics.ProduitEnAttente + 1,
                  NbTicketsOuverts: statistics.NbTicketsOuverts + 1,
                },
                {
                  where: {
                    Centre: CentreDepot,
                  },
                }
              );
              console.log("Dashboard updated successfully");
              // response
              return res.status(200).json({message: 'Panne created successfully'});
            }).catch((err) => {
              console.log("Error while updating dashboard", err);
            });            
          }
        }).catch((err) => {
            console.log("Error while creating panne", err);
        });
    }
} catch (error) {
    console.error(error);
    res.status(500).send('Error creating panne');
}
}
const Update = async (req, res) => {
  // Handle request to update a Panne
  const { id } = req.params;
  const { progres, action, userID, PDFFilename, NbrSerie } = req.body;
  try {
    //get user by id
    const panne = await Panne.findByPk(id);
    //check if panne exist
    if (!panne) {
        return res.status(404).json({ error: 'panne not found' });
    }
    const oldProgres = panne.Progres;
    // assign panne new values
    panne.Progres = progres;
    panne.UserID = userID;
    panne.NbrSerie = NbrSerie; 
  
    if(PDFFilename && PDFFilename.startsWith('BD')){
      panne.BDPDFfile = PDFFilename;
    }else if(PDFFilename && PDFFilename.startsWith('BL')){
      panne.BLPDFfile = PDFFilename;
    }
    // current date
    const todayDate = new Date().toISOString();
    if(progres == 1){
      panne.DateDepot = todayDate;
    }
    if(progres == 4){
      panne.FinReparation = todayDate;
    }else if(progres == 5 && oldProgres != 4){
      panne.FinReparation = todayDate;
    }
    // save panne
    await panne.save().then(async () => {
      // update dashboard
      const Date = panne.createdAt;
      const centre = panne.CentreDepot;
      UpdateDashboard(progres, oldProgres, Date, centre);
      await Transaction.create({
        UserID : userID , Action : action
      }).then(async () => {
        console.log("Transaction created successfully");
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
    // return updated panne
    res.json({panne: panne, message: 'La panne a été déposée avec succès.'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating panne');
  }
}
const UpdateGarantie = async (req, res) => {
  const { id } = req.params;
  const { StatueGarantie, userID, action } = req.body;
  try {
    //get panne by id
    const panne = await Panne.findByPk(id);
    //check if panne exist
    if (!panne) {
        return res.status(404).json({ error: 'panne not found' });
    }
    // assign panne new values
    panne.StatueGarantie = StatueGarantie;
    // save panne
    await panne.save().then(async () => {
      await Transaction.create({
        UserID : userID , Action : action
      }).then(async () => {
        console.log("Transaction created successfully");
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));;
    res.status(200).json({message: 'success'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating panne');
  }
}
const UpdateNbrserie = async (req, res) => {
  // Handle request to update a Panne
  const { id } = req.params;
  const { TypePanne, NbrSerie, Description, action } = req.body;
  try {
    if(!TypePanne && validator.isEmpty(NbrSerie) && validator.isEmpty(Description)) {
      res.status(400).json({message: 'Un des champs doivent être remplis'});
    }else{
      //get user by id
      const panne = await Panne.findByPk(id);
      //check if panne exist
      if (!panne) {
          return res.status(404).json({ error: 'panne not found' });
      }
      // assign panne new values
      if(TypePanne) panne.TypePanne = TypePanne;
      if(NbrSerie) panne.NbrSerie = NbrSerie;
      if(Description) panne.Description = Description;
      // save panne
      await panne.save().then(async () => {
        await Transaction.create({
          UserID : panne.UserID , Action : action
        }).then(async () => {
          console.log("Transaction created successfully");
        }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
      // return updated panne
      res.status(200).json({panne: panne});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating panne');
  }
}
const UpdateSuspendedStatus = async (req, res) => {
  const {id} = req.params;
  const {Etat, action} = req.body;
  try{
    //get user by id
    const panne = await Panne.findByPk(id);
    //check if panne exist
    if (!panne) {
        return res.status(404).json({ error: 'panne not found' });
    }
    // assign panne new values
    panne.Etat = Etat;
    // current date and time
    panne.DateDepot = new Date().toISOString();
    // save panne
    await panne.save().then(async () => {
      const Date = panne.DateDepot;
      const centre = panne.CentreDepot;
      if(Etat !== null && !validator.isEmpty(Etat)){
        // update dashboard
        const dashboard = await Dashboard.findOne({
          where: { createdAt: Date },
        });

        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: Date },
        });

        if (dashboard) {
          await Dashboard.update(
            { ProduitSuspendu: dashboard.ProduitSuspendu + 1 },
            { where: { createdAt: Date } }
          );
        }

        if (sourceStatistics) {
          await StatisticsCentre.update(
            { ProduitSuspendu: sourceStatistics.ProduitSuspendu + 1 },
            { where: { Centre: centre, createdAt: Date } }
          );
        }
      }else if(Etat === null){
        // update dashboard
        const dashboard = await Dashboard.findOne({
          where: { createdAt: Date },
        });

        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: Date },
        });

        if (dashboard) {
          await Dashboard.update(
            { ProduitSuspendu: dashboard.ProduitSuspendu - 1 },
            { where: { createdAt: Date } }
          );
        }

        if (sourceStatistics) {
          await StatisticsCentre.update(
            { ProduitSuspendu: sourceStatistics.ProduitSuspendu - 1 },
            { where: { Centre: centre, createdAt: Date } }
          );
        }
      }
      await Transaction.create({
        UserID : panne.UserID , Action : action
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
    // return updated panne
    res.status(200).json({panne: panne});
  }catch (error) {
    console.error(error);
    res.status(500).send('Error updating panne');
  }
}
const UpdateActionCorrective = async (req, res) => {
  const {id} = req.params;
  const {ActionCorrective, DescriptionAC, action} = req.body;
  try{
    if(!validator.isEmail(ActionCorrective) || !validator.isEmpty(DescriptionAC)){
      //get user by id
      const panne = await Panne.findByPk(id);
      //check if panne exist
      if (!panne) {
          return res.status(404).json({ error: 'panne not found' });
      }
      // assign panne new values
      if(ActionCorrective) panne.ActionCorrective = ActionCorrective;
      if(DescriptionAC) panne.DescriptionAC = DescriptionAC;
      // save panne
      await panne.save().then(async () => {
        await Transaction.create({
          UserID : panne.UserID , Action : action
        }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
      // return updated panne
      res.status(200).json({panne: panne});
    }else{
      res.status(400).json({message: 'Un des champs doivent être remplis'});
    }
  }catch (error) {
    console.error(error);
    res.status(500).send('Error updating panne');
  }
}
const Remove = async (req, res) => {
  // Handle request to delete a Panne
  const { id } = req.params;
  const {userID} = req.body;
  try {
    const panne = await Panne.findByPk(id);

    if (!panne) {
      return res.status(404).json({ error: 'Panne not found' });
    }

    await panne.destroy().then(async () => {
      await Transaction.create({
        UserID : userID , Action : 'l\'utilisateur supprimer une panne'
      }).then(async () => {
        console.log("Transaction created successfully");
      }).catch((error) => console.log(error));
    }).catch((err) => console.log(err));
    res.json({ message: 'Panne deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting panne');
  }
}
const GetTop3Product = async (req, res) => {
  try {
    // get all data from dashboard
    const PannesData = await Panne.findAll();
    if (!PannesData || PannesData.length === 0) {
      return res.json({ message: 'No pannes found' });
    }
    // get top 3 repetitive ReferanceProduit
    const top3RepetitiveReferanceProduits = getTop3RepetitiveReferanceProduits(PannesData);
    res.status(200).json({ top3: top3RepetitiveReferanceProduits });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting top 5');
  }
};
const GetTop3Pannes = async (req, res) => {
  try {
    // get all data from dashboard
    const PannesData = await Panne.findAll();
    if (!PannesData || PannesData.length === 0) {
      return res.json({ message: 'No pannes found' });
    }
    // get top 3 repetitive ReferanceProduit
    const top3RepetitiveReferanceProduits = getTop3RepetitiveTypePanne(PannesData);
    res.status(200).json({ top3: top3RepetitiveReferanceProduits });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting top 5');
  }
}
const UplaodIMG = async (req, res) => {
    const id  = req.body.id;
    if(req.file === undefined){
      return res.status(400).json({message: 'No file uploaded'});
    }
    const image = req.file.filename;
    const userID = req.body.userID;
    try{
        const panne = await Panne.findByPk(id);
        if (!panne) {
            return res.status(404).json({ error: 'Panne not found' });
        }
        panne.image = image;
        await panne.save().then(async () => {
          await Transaction.create({
            UserID : userID , Action : 'joindre une image pour la panne ID= ' + id
          }).then(async () => {
            console.log("Transaction created successfully");
          }).catch((error) => console.log(error));
        }).catch((err) => console.log(err));
        res.json({panne: panne, message: 'Image uploaded successfully'});
    }catch(error){
      res.status(500).send('Error uploading image');
    }
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images'));
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Check the file size limit
  fileFilter: (req, file, cb) => {
    // Check the file types
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files format to upload');
  }
}).single('image');
const UpdateDashboard = async (progres, oldProgres, todayDate, centre) => {
  if(progres !== 0){
    if(progres === 1){
      // update dashboard
      const dashboard = await Dashboard.findOne({
        where: { createdAt: todayDate },
      });
  
      const sourceStatistics = await StatisticsCentre.findOne({
        where: { Centre: centre, createdAt: todayDate },
      });
  
      if (dashboard) {
        await Dashboard.update(
          { ProduitDeposes: dashboard.ProduitDeposes + 1,
            ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
          { where: { createdAt: todayDate } }
        );
      }
  
      if (sourceStatistics) {
        await StatisticsCentre.update(
          { ProduitDeposes: sourceStatistics.ProduitDeposes + 1,
            ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
          { where: { Centre: centre, createdAt: todayDate } }
        );
      }
    }else if(progres === 2){
      // update dashboard
      const dashboard = await Dashboard.findOne({
        where: { createdAt: todayDate },
      });
  
      const sourceStatistics = await StatisticsCentre.findOne({
        where: { Centre: centre, createdAt: todayDate },
      });
  
      if (dashboard && dashboard.ProduitDeposes > 0) {
        await Dashboard.update(
          { ProduitEnReparation: dashboard.ProduitEnReparation + 1,
            ProduitDeposes: dashboard.ProduitDeposes - 1 },
          { where: { createdAt: todayDate } }
        );
      }
      
      if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
        await StatisticsCentre.update(
          { ProduitEnReparation: sourceStatistics.ProduitEnReparation + 1,
            ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
          { where: { Centre: centre, createdAt: todayDate } }
        );
      }
    }else if(progres === 3){
      // update dashboard
      if(oldProgres === 2){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnReparation > 0) {
          await Dashboard.update(
            { ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnReparation: dashboard.ProduitEnReparation - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnReparation > 0) {
          await StatisticsCentre.update(
            { ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnReparation: sourceStatistics.ProduitEnReparation - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 1){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitDeposes > 0) {
          await Dashboard.update(
            { ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitDeposes: dashboard.ProduitDeposes - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
          await StatisticsCentre.update(
            { ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if (oldProgres === 0){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnAttente > 0) {
          await Dashboard.update(
            { ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnAttente > 0) {
          await StatisticsCentre.update(
            { ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }else if(progres === 4){
      // update dashboard
      if(oldProgres === 3){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitRepares > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitRepares > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 2){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnReparation > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnReparation: dashboard.ProduitEnReparation - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnReparation > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnReparation: sourceStatistics.ProduitEnReparation - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 1){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitDeposes > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitDeposes: dashboard.ProduitDeposes - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 0){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnAttente > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnAttente > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }else if(progres === 5){
      // update dashboard
      if(oldProgres === 4){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.EnAttenteDePickup > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              EnAttenteDePickup: dashboard.EnAttenteDePickup - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.EnAttenteDePickup > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              EnAttenteDePickup: sourceStatistics.EnAttenteDePickup - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 3){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitRepares > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1, },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitRepares > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 2){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnReparation > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnReparation: dashboard.ProduitEnReparation - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnReparation > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnReparation: sourceStatistics.ProduitEnReparation - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 1){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitDeposes > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitDeposes: dashboard.ProduitDeposes - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 0){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }
  }
}
function getTop3RepetitiveReferanceProduits(pannesData) {
  // Create an empty object to store the counts of each ReferanceProduit
  const referanceCounts = {};

  // Iterate through the pannesData array and count the occurrences of each ReferanceProduit
  for (const panne of pannesData) {
      const referance = panne.ReferanceProduit;
      if (referanceCounts[referance]) {
          referanceCounts[referance]++;
      } else {
          referanceCounts[referance] = 1;
      }
  }

  // Convert the object into an array of objects with ReferanceProduit and count properties
  const referanceCountArray = Object.entries(referanceCounts).map(([referance, count]) => ({
      ReferanceProduit: referance,
      Count: count,
  }));

  // Sort the array in descending order based on count
  referanceCountArray.sort((a, b) => b.Count - a.Count);

  // Return the top 3 repetitive ReferanceProduits
  return referanceCountArray.slice(0, 3);
}
function getTop3RepetitiveTypePanne(pannesData) {
  // Create an empty object to store the counts of each ReferanceProduit
  const typePanneCounts = {};

  // Iterate through the pannesData array and count the occurrences of each TypePanne
  for (const panne of pannesData) {
      const typePanne = panne.TypePanne;
      if (typePanneCounts[typePanne]) {
          typePanneCounts[typePanne]++;
      } else {
          typePanneCounts[typePanne] = 1;
      }
  }

  // Convert the object into an array of objects with TypePanne and count properties
  const typePanneCountArray = Object.entries(typePanneCounts).map(([typePanne, count]) => ({
      TypePanne: typePanne,
      Count: count,
  }));

  // Sort the array in descending order based on count
  typePanneCountArray.sort((a, b) => b.Count - a.Count);

  // Return the top 3 repetitive TypePannes
  return typePanneCountArray.slice(0, 3);
}
const calculateAverageRepairTime = async (req, res) =>{
  const {id} = req.params;
  try {
    if(id == 0){
      // Retrieve all Pannes
      const allPannes = await Panne.findAll();
      if(!allPannes || allPannes.length <= 0){
        return res.json({ message: 'No pannes found' });
      }
      // Initialize an array to store time differences
      const timeDifferences = [];

      // Calculate the time difference for each "Panne" record
      for (const panne of allPannes) {
        if (panne.DateDepot && panne.FinReparation) {
          const startDate = new Date(panne.DateDepot);
          const endDate = new Date(panne.FinReparation);
          const timeDiff = endDate - startDate;
          timeDifferences.push(timeDiff);
        }
      }

      // Calculate the average repair time
      if (timeDifferences.length > 0) {
        const totalRepairTime = timeDifferences.reduce((acc, timeDiff) => acc + timeDiff, 0);
        const averageRepairTimeMilliseconds = totalRepairTime / timeDifferences.length;

        const seconds = Math.floor(averageRepairTimeMilliseconds / 1000);
        const days = Math.floor(seconds / (3600 * 24));
        const remainingSeconds = seconds - days * 3600 * 24;
        const hours = Math.floor(remainingSeconds / 3600);
        const remainingSecondsAfterHours = remainingSeconds - hours * 3600;
        const minutes = Math.floor(remainingSecondsAfterHours / 60);
        const secondsRemaining = (remainingSecondsAfterHours - minutes * 60);

        res.status(200).json({ averageRepairTime: `${days}J ${hours}h ${minutes}min ${secondsRemaining}s` });
      }else{
        return res.status(500).json({message: 'Error calculating average repair time'});
      }
    }else{
      // Retrieve all Pannes by id
      const allPannes = await Panne.findAll({
        where:{
          UserID: id
        }
      });
      if(!allPannes || allPannes.length <= 0){
        return res.json({ message: 'No pannes found' });
      }
      // Initialize an array to store time differences
      const timeDifferences = [];

      // Calculate the time difference for each "Panne" record
      for (const panne of allPannes) {
        if (panne.DateDepot && panne.FinReparation) {
          const startDate = new Date(panne.DateDepot);
          const endDate = new Date(panne.FinReparation);
          const timeDiff = endDate - startDate;
          timeDifferences.push(timeDiff);
        }
      }

      // Calculate the average repair time
      if (timeDifferences.length > 0) {
        const totalRepairTime = timeDifferences.reduce((acc, timeDiff) => acc + timeDiff, 0);
        const averageRepairTimeMilliseconds = totalRepairTime / timeDifferences.length;

        const seconds = Math.floor(averageRepairTimeMilliseconds / 1000);
        const days = Math.floor(seconds / (3600 * 24));
        const remainingSeconds = seconds - days * 3600 * 24;
        const hours = Math.floor(remainingSeconds / 3600);
        const remainingSecondsAfterHours = remainingSeconds - hours * 3600;
        const minutes = Math.floor(remainingSecondsAfterHours / 60);
        const secondsRemaining = (remainingSecondsAfterHours - minutes * 60);

        res.status(200).json({ averageRepairTime: `${days}J ${hours}h ${minutes}min ${secondsRemaining}s` });
      }else{
        return res.status(500).json({message: 'Error calculating average repair time'});
      }
    }
  } catch (error) {
    console.error('Error calculating average repair time:', error);
  }
}
module.exports = {
  index,
  GetAllDelivred,
  GetByID,
  GetByUserID,
  GetByRefProduct,
  GetByBon,
  Create,
  Update,
  Remove,
  GetTop3Product,
  GetTop3Pannes,
  UplaodIMG,
  upload,
  UpdateGarantie,
  calculateAverageRepairTime,
  UpdateNbrserie,
  UpdateSuspendedStatus,
  UpdateActionCorrective
};

const SAV = require('../models/SAVModel');

const GetSAV = async (req, res) => {
  try {
    const sav = await SAV.findAll();
      if (sav.length > 0) {
        res.status(200).json(sav);
      }else{
        res.status(400).json({message: 'No SAV found'});
      }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}

module.exports = {
    GetSAV,
}
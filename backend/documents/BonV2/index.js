module.exports = ({ Nom, Prenom, Email, Telephone, 
   ReferanceProduit, TypePanne, Wilaya, 
   CentreDepot, DateDepot, BonID, NbrSerie }) => {
    const today = new Date();
return `
      <!doctype html>
      <html>
         <head>
            <meta charset="utf-8">
            <style type="text/css">
               @font-face {
                  font-family: Poppins;
               }
               *{
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: "Poppins", sans-serif;
                  outline: none;
                  border: none;
                  text-decoration: none;
                  color: #060e30;
                  letter-spacing: 0.5%;
               }
               .container {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center; 
                  align-content: center;
                  align-self: center;
               }
               .title{
                  font-size: 20px;
                  color: black;
                  padding-top: 50px;
               }
               .Line1{
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  padding-left: 40px;
                  padding-right: 40px;
                  padding-top: 20px;
                  font-size: 10px;
                  color: black;
               }
               .line2{
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center; 
                  padding-left: 40px;
                  padding-right: 40px;
                  padding-top: 40px;
                  padding-bottom: 50px;
                  font-size: 10px;
                  color: black;
               }
               .informations {
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  margin-bottom: 10px;
               }
               .informations-result {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
               }
               .informations-result-text{
                  color: rgb(0, 43, 152);
               }
               .informations-result h3 {

                  height: 1px; 
               }

               .line3{
                  display: flex;
                  width: 100%;
                  padding-bottom: 60px;
                  padding-inline-start: 40px;
                  padding-inline-end: 40px;
               }
               .first-table {
                  border-collapse: collapse;
                  width: 100%;
                  font-size: 10px;
                  color: black;
               }
               .first-table th, .first-table td {
                  border: 1px solid black; 
                  padding: 8px; 
               }

               .first-table th {
                  background-color: rgb(202, 217, 255); 
                  color: black; 
                  text-align: left; 
               }
               .second-table {
                  border-collapse: collapse;
                  width: 80%;
                  font-size: 10px;
                  color: black;
               }
               .second-table th, .second-table td {
                  border: 1px solid black; 
                  padding: 8px; 
                  text-align: center;
               }

               .second-table th {
                  background-color: rgb(202, 217, 255); 
                  color: black; 
                  text-align: center; 
               }
               .second-table td {
                  height: 200px; 
               }
         </style>
         </head>
         <body>
            <div class="container">
                  <h2 class="title">
                     Bon de livraison
                  </h2>
                  <div class="Line1">
                     <div class="BonInfos">
                        <h3>
                              SAV ${CentreDepot}
                        </h3>
                        <h3>
                              Reference: ${BonID}
                        </h3>
                     </div>
                     <h3>
                        Date: ${new Date().toISOString().slice(0, 10)}
                     </h3>
                  </div>
                  <div class="line2">
                     <div class="informations">
                        <h3 class="text-left">
                              Date de depot
                        </h3>
                        <div class="informations-result">
                              <h3 class="informations-result-text">${DateDepot}</h3>
                              <h3 class="text-center">
                                 ...........................................................................................................................................................................
                              </h3>
                        </div>
                        
                        <h3 class="text-right">
                              تاريخ الإيداع
                        </h3>
                     </div>
                     <div class="informations">
                        <h3 class="title-left">
                              SAV
                        </h3>
                        <div class="informations-result">
                              <h3 class="informations-result-text">${CentreDepot}</h3>
                              <h3 class="title-center">
                                 ...................................................................................................................................................................................
                              </h3>
                        </div>
                        <h3 class="title-right">
                              مركز خدمة ما بعد البيع
                        </h3>
                     </div>
                     <div class="informations">
                        <h3 class="title-left">
                              ID client
                        </h3>
                        <div class="informations-result">
                              <h3 class="informations-result-text">${Email}</h3>
                              <h3 class="title-center">
                                 .......................................................................................................................................................................................
                              </h3>
                        </div>
                        <h3 class="title-right">
                              رمز الزبون
                        </h3>
                     </div>
                     <div class="informations">
                        <h3 class="text-left">
                              Nom et prenom
                        </h3>
                        <div class="informations-result">
                              <h3 class="informations-result-text">${Nom}${' '}${Prenom}</h3>
                              <h3 class="text-center">
                                 .......................................................................................................................................................................
                              </h3>
                        </div>
                        
                        <h3 class="text-right">
                              الاسم واللقب
                        </h3>
                     </div>
                     <div class="informations">
                        <h3 class="title-left">
                              N° Tel
                        </h3>
                        <div class="informations-result">
                              <h3 class="informations-result-text">${Telephone}</h3>
                              <h3 class="title-center">
                                 .............................................................................................................................................................................................
                              </h3>
                        </div>
                        
                        <h3 class="title-right">
                              رقم الهاتف
                        </h3>
                     </div>
                     <div class="informations">
                        <h3 class="title-left">
                              Type de panne
                        </h3>
                        <div class="informations-result">
                              <h3 class="informations-result-text">${TypePanne}</h3>
                              <h3 class="title-center">
                                 ...........................................................................................................................................................
                              </h3>
                        </div>
                        
                        <h3 class="title-right">
                           نوع عطل              
                        </h3>
                     </div>
                  </div>
                  <div class="line3">
                     <table class="first-table">
                        <tbody>
                              <tr>
                                 <th>Item</th>
                                 <th>Désignation</th>
                                 <th>Modèle</th>
                                 <th>N° série</th>
                                 <th>Observation</th>
                              </tr>
                              <tr>
                                 <td>1</td>
                                 <td>${TypePanne}</td>
                                 <td>${ReferanceProduit}</td>
                                 <td>${NbrSerie}</td>
                                 <td></td>
                              </tr>
                        </tbody>
                     </table>
                  </div>
                  <table class="second-table">
                     <tbody>
                        <tr>
                              <th>SAV</th>
                              <th>Client</th>
                        </tr>
                        <tr>
                              <td></td>
                              <td>Reçu et lu</td>
                        </tr>
                     </tbody>
                  </table>
            </div>
         </body>
      </html>
    `;
};
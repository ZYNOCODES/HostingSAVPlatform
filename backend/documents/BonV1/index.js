module.exports = ({ Nom, Prenom, Email, Telephone, 
   ReferanceProduit, TypePanne, Wilaya, 
   CentreDepot, DateDepot, BonID, NbrSerie }) => {
    const today = new Date();
return `
<!doctype html>
<html>
<head>
     <meta http-equiv="cache-control" content="no-cache">
     <meta http-equiv="Pragma" content="no-cache">
     <meta http-equiv="Expires" content="-1">
     <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
     <style>
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
        padding-top: 10px;
    }
    .top-bar{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
    }
    .top-bar-left{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    .top-bar-left-title{
        position: absolute;
        align-items: center;
        align-self: center;
        padding-inline-start: 200px;
        margin-top: 50px;
    }
    .title{
        font-size: 18px;
        color: black;
        text-align: center;
    }
    .top-bar-img{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .top-bar-right{
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-top: 20px;
    }
    .top-bar-right h4{
        font-size: 8px;
        font-weight: 600;
    }
    .top-bar-right h5{
        font-size: 10px;
        font-weight: 700;
    }
    .top-bar-right-line{
        width: 60%;
        height: 1px;
        background-color: #0d68af;
    }
    
    .Line1{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 10px;
        font-size: 8px;
        color: black;
    }
    .line2{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center; 
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 10px;
        padding-bottom: 15px;
        font-size: 8px;
        color: black;
        gap: 5px;
    }
    .subline2{
        display: flex;
        flex-direction: column;
        align-items: center; 
    }
    .informations {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
    .subinformations{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    .line3{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center; 
        justify-content: space-between;
        padding-left: 40px;
        padding-right: 40px;
        font-size: 8px;
        color: black;
    }
    .line3-line1-title{
        font-size: 8px;
        margin-inline-end: 10px;
    }
    .line3-line1-subtitle{
        display: flex;
        flex-direction: row;
        align-items: center; 
    }
    .line3-line1-subtitle table{
        border-collapse: collapse;
        color: black;
        margin-inline-start: 10px;
    }
    .line3-line1-subtitle th{
        border: 1px solid black; 
        padding: 5px;
    }
    .line4{
        display: flex;
        flex-direction: row;
        align-items: center; 
        padding-left: 40px;
        padding-right: 40px;
    }
    .line4-line1{
        display: flex;
        flex-direction: column;
        align-items: center; 
        padding-left: 40px;
        padding-right: 40px;
    }
    .line4-line2{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center; 
        font-size: 8px;
        color: black;
        margin-bottom: 10px;
    }
    .line4-line2 table{
        border-collapse: collapse;
        color: black;
        margin-inline-start: 10px;
    }
    .line4-line2 th{
        border: 1px solid black; 
        padding: 5px;
    }
    .line5{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        align-self: flex-end;
        text-align: end;
        padding-inline-end: 40px;
        padding-inline-start: 40px;
        font-size: 8px;
        font-weight: 600;
    }
    .line5 h4{
        font-size: 12px;
    }
    .line6{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: flex-start;
        text-align: start;
        padding-inline-end: 30px;
        padding-inline-start: 40px;
        padding-bottom: 10px;
        font-size: 8px;
        font-weight: 600;
    }
    .line6 h4{
        font-size: 10px;
    }
    .line6 p{
        padding-inline-start: 20px;
    }
    .line7{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: flex-start;
        text-align: start;
        padding-inline-end: 30px;
        padding-inline-start: 40px;
        padding-bottom: 10px;
        font-size: 8px;
        font-weight: 500;
    }
    .line7 h4{
        font-size: 12px;
        align-items: flex-end;
        align-self: flex-end;
        text-align: end;
    }
    .line7 p{
        padding-inline-start: 20px;
        font-weight: 500;
    }
    .line8{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: flex-start;
        text-align: start;
        padding-bottom: 10px;
        font-size: 10px;
        font-weight: 700;
        padding-inline-start: 20px;
    }
    .line9{
        width: 100%;
        padding-inline-start: 40px;
        padding-inline-end: 90px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: start;
    }
    .line9 table{
        border-collapse: collapse;
        color: black;
    }
    .line9 th:nth-child(2){
        width: 200px;
    }
    .line9 th{
        border: 1px solid black; 
        padding: 5px;
        font-size: 8px;
    }
    .QRcode{
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        align-content: center;
        margin-bottom: 5px;
    }
    .line10{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-inline-start: 50px;
        padding-inline-end: 50px;
        margin-bottom: 70px;
        font-size: 10px;
        font-weight: 600;
        color: black;
    }
    .line11{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-inline-end: 40px;
      padding-inline-start: 40px;
    }
    .line11-line1{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .line11-line1 h4{
      font-size: 12px;
    }
    .line11-line2{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding-inline-start: 20px;
    }
    .line11-line2 h4{
      font-size: 10px;
      font-weight: 600;
    }
    .bottom-bar-img{
        width: 90%;
        align-items: center;
        justify-content: center;
    }
     </style>     
</head>
<body>
     <div class="container">
         <div class="top-bar">
             <div class="top-bar-left">
                 <div class="top-bar-left-title">
                     <h4 class="title">
                         TICKET DE DÉPÔT
                     </h4>
                     <h4 class="title">
                         وصل الإيداع
                     </h4>
                 </div>
             </div>
             <div class="top-bar-right">
                 <h4>Réf : FOR-SAV-24-03</h4>
                 <div class="top-bar-right-line"></div>
                 <h4>Date d’application</h4>
                 <h4>${new Date().toISOString().slice(0, 10)}</h4>
                 <div class="top-bar-right-line"></div>
                 <h5>Page 1 sur 1</h5>
             </div>
         </div>
        <div class="Line1">
             <h3>
                 SAV ${CentreDepot}
             </h3>
              <h3>
                 Ref: ${BonID}
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
                 : ........................................................................................................................................................................... :
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
                 : ................................................................................................................................................................................... :
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
                 : ....................................................................................................................................................................................... :
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
                 : ....................................................................................................................................................................... :
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
                 : ............................................................................................................................................................................................. :
                 </h3>
              </div>
              <h3 class="title-right">
                 رقم الهاتف
              </h3>
           </div>
           <div class="informations">
             <h3 class="title-left">
                 Produit
             </h3>
             <div class="informations-result">
                <h3 class="informations-result-text">${ReferanceProduit}</h3>
                <h3 class="title-center">
                : ............................................................................................................................................................................................. :
                </h3>
             </div>
             <h3 class="title-right">
                 المنتوج
             </h3>
          </div>
          <div class="informations">
             <h3 class="title-left">
                 N° série
             </h3>
             <div class="informations-result">
                <h3 class="informations-result-text">${NbrSerie}</h3>
                <h3 class="title-center">
                : ............................................................................................................................................................................................. :
                </h3>
             </div>
             <h3 class="title-right">
                 الرقم التسلسلي
             </h3>
          </div>
           <div class="informations">
              <h3 class="title-left">
                 Type de panne
              </h3>
              <div class="informations-result">
                 <h3 class="informations-result-text">${TypePanne}</h3>
                 <h3 class="title-center">
                 : ........................................................................................................................................................... :
                 </h3>
              </div>
              <h3 class="title-right">
               نوع عطل              
              </h3>
           </div>
        </div>
  </body>
    `;
};
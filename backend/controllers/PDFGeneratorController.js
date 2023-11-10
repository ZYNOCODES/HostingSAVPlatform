const puppeteer = require('puppeteer');
const Panne = require('../models/PannesModel');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const validator = require('validator');

const PDFGenerator = async (req, res) => {
    const { BonDepot } = req.params;
    const { Nom,
        Prenom,
        Email,
        Telephone,
        ReferanceProduit,
        TypePanne,
        Wilaya,
        CentreDepot,
        DateDepot, 
        type, 
        postalCode,
        NbrSerie,
        ActinoCorrective,
        UserID } = req.body;
    const pdfTemplate = require(`../documents/${BonDepot}`);
    try {
        if(NbrSerie !== undefined) 
        if ((type === 'BL' && ActinoCorrective === false) || validator.isEmpty(NbrSerie)) {
            if (type === 'BL') {
                return res.status(400).send({ message: "Veuillez remplir les champs obligatoires (Actino Corrective, NbrSerie)" });
            } else if (type === 'BD') {
                return res.status(400).send({ message: "N° de serie est obligatoire" });
            }
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the page size to A4
        await page.setViewport({ width: 595, height: 842 }); // A4 dimensions in pixels
        // generate unique ID for pdf document
        const BonID = generateUniqueID(type, Wilaya, postalCode)
        const NbrSeries= NbrSerie ? NbrSerie : '  ';
        const content = pdfTemplate({Nom,
            Prenom,
            Email,
            Telephone,
            ReferanceProduit,
            TypePanne,
            Wilaya,
            CentreDepot,
            DateDepot,
            BonID,
            NbrSerie: NbrSeries,});

        // Set the HTML content of the page
        await page.setContent(content);

        // Generate the PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        const uniqueFilename = `${generateUniqueID(type, Wilaya, postalCode)}.pdf`;
        const filePath = path.join(__dirname, '..', 'files', uniqueFilename);

        // Write the PDF to a file
        require('fs').writeFileSync(filePath, pdfBuffer);

        await browser.close();

        res.status(200).json({uniqueFilename});
    } catch (err) {
        console.log(err);
        res.status(500).send("Error generating PDF");
    }
};

const PDFSender = async (req, res) => {
    try {
        const filename = req.query.filename;
        if (!filename) {
            return res.status(400).send("Filename parameter missing");
        }

        const filePath = path.join(__dirname, '..', 'files', filename);

        res.status(200).sendFile(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error sending PDF");
    }
};

const PDFDownloader = async (req, res) => {
    try {
        const {filename} = req.params;

        if (!filename) {
            return res.status(400).send("Filename parameter missing");
        }

        const filePath = path.join(__dirname, '..', 'files', filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // If the file exists, send it to the browser for download
            res.download(filePath, filename, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error downloading the file");
                }
            });
        } else {
            res.status(404).send("File not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error processing the request");
    }
};

// generate PDF unique ID
function generateUniqueID(type, willaya, postalCode) {
    // Generate a random 4-digit number
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  
    // Get the current date and time in a specific format
    const currentDate = new Date();
    const datePart = currentDate.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  
    // Combine all the parts to create the unique ID
    const uniqueID = `${type}${randomNum}${datePart}${postalCode*1000}`;
  
    return uniqueID;
}
module.exports = {
    PDFGenerator,
    PDFSender,
    PDFDownloader,
};

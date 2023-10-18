const express = require('express');
const {
    PDFGenerator,
    PDFSender,
    PDFDownloader
} = require('../controllers/PDFGeneratorController');

const router = express.Router();

router.get('/fetchPDF', PDFSender);
router.post('/createPDF/:BonDepot', PDFGenerator);
router.get('/downloaderPDF/:filename', PDFDownloader);

module.exports = router;
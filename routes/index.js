// routes/index.js

const express = require('express');
const router = express.Router();
const Article = require('../models/articleModel'); // Importez votre modèle d'article
const articlesController = require('../controllers/articlesController');

router.get('/', articlesController.gethome);

module.exports = router;

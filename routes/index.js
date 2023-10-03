// routes/index.js

const express = require('express');
const router = express.Router();
const Article = require('../models/articleModel'); // Importez votre modèle d'article

router.get('/', (req, res) => {
    // Récupérez les articles de votre base de données
    Article.find({}, (err, articles) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur Serveur');
        } else {
            // Passez les articles à votre vue
            res.render('index', { articles: articles });
        }
    });
});

module.exports = router;

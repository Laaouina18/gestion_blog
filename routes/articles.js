const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
router.get('/', articlesController.getArticles);
router.get('/add', articlesController.getAddArticleForm);
router.post('/add', articlesController.createArticle);
// Autres routes et configurations nécessaires

module.exports = router;

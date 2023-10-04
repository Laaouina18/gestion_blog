const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

// Route to render the form for adding a new article
router.get('/add', articlesController.getAddArticleForm);

// Route to handle the creation of a new article
router.post('/add', articlesController.createArticle);

// Other routes and configurations as needed
router.get('/', articlesController.getArticles);
router.get('/:id', articlesController.getArticleById);
router.delete('/:id', articlesController.deleteArticle);
router.get('/search', articlesController.searchArticles);

module.exports = router;

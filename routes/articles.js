const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
const multer = require('multer');
const path = require('path');

// Définir le stockage des fichiers téléchargés avec Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads')); // Utilisation de '..' pour remonter d'un niveau et accéder au dossier 'public'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const multerUpload = multer({ storage: storage });

// Route to render the form for adding a new article
router.get('/add', articlesController.getAddArticleForm);

// Route to handle the form submission and file upload
router.post('/add', multerUpload.single('image'), articlesController.createArticle);

// Other routes
router.get('/', articlesController.getArticles);
router.get('/:id', articlesController.getArticleById);
router.delete('/:id', articlesController.deleteArticle);
router.get('/search', articlesController.searchArticles);

module.exports = router;

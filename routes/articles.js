const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads')); // Utilisation de '..' pour remonter d'un niveau et accéder au dossier 'public'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const multerUpload = multer({ storage: storage });


router.get('/add', articlesController.getAddArticleForm);

router.post('/add', multerUpload.single('image'), articlesController.createArticle);

router.get('/edit/:id', articlesController.getEditArticleForm);

router.post('/edit/:id', multerUpload.single('image'), articlesController.updateArticle);


router.get('/', articlesController.getArticles);
router.get('/:id', articlesController.getArticleById);
router.get('/delete/:id', articlesController.deleteArticle);
router.get('/search', articlesController.searchArticles);

module.exports = router;

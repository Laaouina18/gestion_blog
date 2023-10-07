const db = require('../db');
const Category = require('../models/CategoryModel');

const multer = require('multer');

// Set up storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads'); // Set the destination folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
  },
});

// Set up multer upload
const multerUpload = multer({ storage: storage });

// Now you can use multerUpload in your routes or controller functions

exports.getAddArticleForm = (req, res) => {
    Category.getAllCategories(categories => {
        res.render('add-article', { categories });
    });
};


exports.getArticles = (req, res) => {
 
        // Ensuite, récupérer tous les articles
        db.query('SELECT * FROM articles', (err, articles) => {
            if (err) throw err;

            // Les résultats des deux requêtes sont disponibles ici
            res.render('articles', {articles });
        });
   
};

exports.gethome = (req, res) => {
    // Récupérer toutes les catégories
    db.query('SELECT * FROM categories', (err, categories) => {
        if (err) throw err;

        // Ensuite, récupérer tous les articles
        db.query('SELECT * FROM articles', (err, articles) => {
            if (err) throw err;

            // Les résultats des deux requêtes sont disponibles ici
            res.render('index', { categories, articles });
        });
    });
};

exports.getArticleById = (req, res) => {
    const articleId = req.params.id;
    db.query('SELECT * FROM articles WHERE IdArticle = ?', [articleId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'article :", err);
            return res.status(500).send("Erreur serveur lors de la récupération de l'article.");
        }

        // Vérifiez si l'article existe dans la base de données
        const article = result[0];
        if (!article) {
            return res.status(404).send("Article non trouvé.");
        }

        res.render('article', { article });
    });
};

// ... (autres imports)
exports.createArticle = (req, res) => {
    const { Titre, Description, date, autheur, idcat } = req.body;
    
    // À ce stade, req.file contient les informations sur l'image téléchargée
    const imageFilePath = req.file ? req.file.filename : null; // Vérifiez si une image a été téléchargée

    // Vérifiez si toutes les valeurs requises sont présentes dans la requête
    if (!Titre || !Description || !date || !autheur || !idcat || !imageFilePath) {
        return res.status(400).send("Toutes les données de l'article sont requises.");
    }

    // Insérez les données (y compris le chemin de l'image) dans la base de données
    db.query('INSERT INTO articles (Titre, Description, date, image, autheur, idcat) VALUES (?, ?, ?, ?, ?, ?)', [Titre, Description, date, imageFilePath, autheur, idcat], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'article :", err);
            return res.status(500).send("Erreur serveur lors de l'insertion de l'article.");
        }
        res.redirect('/articles');
    });
};
// ... (autres méthodes du contrôleur)


exports.updateArticle = (req, res) => {
    const articleId = req.params.id;
    const { Titre, Description, date, image, autheur, idcat } = req.body;
    db.query('UPDATE articles SET Titre = ?, Description = ?, date = ?, image = ?, autheur = ?, idcat = ? WHERE IdArticle = ?', [Titre, Description, date, image, autheur, idcat, articleId], (err, result) => {
        if (err) throw err;
        res.redirect('/articles');
    });
};

exports.deleteArticle = (req, res) => {
    const articleId = req.params.id;

    db.query('DELETE FROM articles WHERE IdArticle = ?', [articleId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'article :", err);
            return res.status(500).send("Erreur serveur lors de la suppression de l'article.");
        }
        // Vérifiez si l'article a été supprimé avec succès
        if (result.affectedRows === 0) {
            return res.status(404).send("Article non trouvé.");
        }
        res.redirect('/articles');
    });
};


exports.searchArticles = (req, res) => {
    const keyword = req.query.keyword;
    db.query('SELECT * FROM articles WHERE Titre LIKE ? OR Description LIKE ?', [`%${keyword}%`, `%${keyword}%`], (err, articles) => {
        if (err) throw err;
        res.render('searchResults', { articles, keyword });
    });
};


const db = require('../db');
const Category = require('../models/CategoryModel'); // Assurez-vous que le chemin vers votre modèle est correct
exports.getAddCategoryForm = (req, res) => {
   
        res.render('add-category');
  
};

exports.getAllCategories = (req, res) => {
    Category.getAllCategories(categories => {
        res.render('categories', { categories });
    });
};
exports.getCategoryById = (req, res) => {
    const CategoryId = req.params.id;
    db.query('SELECT * FROM categories WHERE IdCategorie = ?', [CategoryId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'article :", err);
            return res.status(500).send("Erreur serveur lors de la récupération de l'article.");
        }

        // Vérifiez si l'article existe dans la base de données
        const categorie = result[0];
        if (!categorie) {
            return res.status(404).send("Article non trouvé.");
        }

        res.render('categorie', { categorie });
    });
};
exports.createCategory = (req, res) => {
    const { Titre, Description, image} = req.body;

    // Vérifiez si toutes les valeurs requises sont présentes dans la requête
    if (!Titre || !Description || !image ) {
        return res.status(400).send("Toutes les données de la catégorie sont requises.");
    }

    // Insérez les données dans la base de données
    db.query('INSERT INTO categories (Titre, Description, image) VALUES (?, ?, ?)', [Titre, Description, image], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de la catégorie :", err);
            return res.status(500).send("Erreur serveur lors de l'insertion de la catégorie.");
        }
        res.redirect('/categories');
    });
}

exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const { Titre, Description, image } = req.body;
    db.query('UPDATE categories SET Titre = ?, Description = ?, WHERE IdCategorie = ?', [Titre, Description,categoryId], (err, result) => {
        if (err) throw err;
        res.redirect('/categories');
    });
};

    
exports.deleteCategory = (req, res) => {
    const CategoryId = req.params.id;

    db.query('DELETE FROM categories WHERE IdCategorie = ?', [CategoryId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la categorie :", err);
            return res.status(500).send("Erreur serveur lors de la suppression de la categorie.");
        }
        // Vérifiez si l'article a été supprimé avec succès
        if (result.affectedRows === 0) {
            return res.status(404).send("categorie non trouvé.");
        }
        res.redirect('/categories');
    });
};


exports.searchCategory = (req, res) => {
    const keyword = req.query.keyword;
    db.query('SELECT * FROM categories WHERE Titre LIKE ? OR Description LIKE ?', [`%${keyword}%`, `%${keyword}%`], (err, categories) => {
        if (err) throw err;
        res.render('searchResults', { categories, keyword });
    });
};


const db = require('../db');
const Category = require('../models/CategoryModel'); 


exports.getAllCategories = (req, res) => {
    Category.getAllCategories(categories => {
        res.render('categories', { categories });
    });
};

exports.getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    Category.getCategoryById(categoryId, (categorie) => {
        if (!categorie) {
            return res.status(404).send("Catégorie non trouvée.");
        }
        res.render('categorie', { categorie });
    });
};

exports.createCategory = (req, res) => {
    const { Titre, Description } = req.body;
    const imageFilePath = req.file ? req.file.filename : null;

    if (!Titre || !Description || !imageFilePath) {
        return res.status(400).send("Toutes les données de la catégorie sont requises.");
    }

    const categoryData = { Titre, Description, image: imageFilePath };

    Category.CreateCategory(categoryData, (result) => {
        res.redirect('/categories');
    });
};

exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const { Titre, Description } = req.body;
    const imageFilePath = req.file ? req.file.filename : null;

    const categoryData = { Titre, Description, image: imageFilePath };

    Category.updateCategory(categoryId, categoryData, (result) => {
        res.redirect('/categories');
    });
};

exports.deleteCategory = (req, res) => {
    const categoryId = req.params.id;

    Category.deleteCategory(categoryId, (result) => {
        if (result.affectedRows === 0) {
            return res.status(404).send("Catégorie non trouvée.");
        }
        res.redirect('/categories');
    });
};

exports.searchCategory = (req, res) => {
    const keyword = req.query.keyword;
    Category.searchCategories(keyword, (categories) => {
        res.render('searchResults', { categories, keyword });
    });
};
exports.getAddCategoryForm = (req, res) => {
    res.render('add-category');
};
exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const { Titre, Description } = req.body;

    Category.getCategoryById(categoryId, (currentCategory) => {
        if (!currentCategory) {
            return res.status(404).send("Catégorie non trouvée.");
        }

        const categoryData = { Titre, Description, image: currentCategory.image };

        Category.updateCategory(categoryId, categoryData, (result) => {
            res.redirect('/categories');
        });
    });
};
exports.searchCategory = (req, res) => {
    const keyword = req.query.keyword;
    Category.searchCategories(keyword, (categories) => {
        res.render('searchResults', { categories, keyword });
    });
};
exports.getEditCategoryForm = (req, res) => {
    const CategorieId = req.params.id;
Category.getCategorybyID(CategorieId, (foundCategory) => {
        if (!foundCategory) {
            return res.status(404).send("categorie non trouvé.");
        }
      
            res.render('edit-Catégorie', { categorie: foundCategory });
       
    });  
    const categoryId = req.params.id;
    Category.getCategorybyID(categoryId, (foundCategory) => {
        if (!foundCategory) {
            return res.status(404).send("Catégorie non trouvée.");
        }
        res.render('edit-Catégorie', { category: foundCategory });
    });
};

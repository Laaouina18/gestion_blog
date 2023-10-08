const CategoryModel = require('../models/CategoryModel');
const articleModel = require('../models/articleModel');

exports.getAddArticleForm = (req, res) => {
    CategoryModel.getAllCategories(categories => {
        res.render('add-article', { categories });
    });
};

exports.getEditArticleForm = (req, res) => {
    const articleId = req.params.id;
    articleModel.getArticleById(articleId, (foundArticle) => {
        if (!foundArticle) {
            return res.status(404).send("Article non trouvé.");
        }
        CategoryModel.getAllCategories(categories => {
            res.render('edit-article', { article: foundArticle, categories });
        });
    });
};

exports.createArticle = (req, res) => {
    const { Titre, Description, date, autheur, idcat } = req.body;
    const imageFilePath = req.file ? req.file.filename : null;

    if (!Titre || !Description || !date || !autheur || !idcat || !imageFilePath) {
        return res.status(400).send("Toutes les données de l'article sont requises.");
    }

    const articleData = { Titre, Description, date, image: imageFilePath, autheur, idcat };

    articleModel.createArticle(articleData, (result) => {
        res.redirect('/articles');
    });
};

exports.updateArticle = (req, res) => {
    const articleId = req.params.id;
    const { Titre, Description, date, autheur, idcat } = req.body;
    const newImageFilePath = req.file ? req.file.filename : null;

    articleModel.getArticleById(articleId, (currentArticle) => {
        if (!currentArticle) {
            return res.status(404).send("Article non trouvé.");
        }

        const imageFilePath = newImageFilePath ? newImageFilePath : currentArticle.image;
        const articleData = { Titre, Description, date, image: imageFilePath, autheur, idcat };

        articleModel.updateArticle(articleId, articleData, (result) => {
            res.redirect('/articles');
        });
    });
};

exports.deleteArticle = (req, res) => {
    const articleId = req.params.id;
    articleModel.deleteArticle(articleId, (result) => {
        if (result.affectedRows === 0) {
            return res.status(404).send("Article non trouvé.");
        }
        res.redirect('/articles');
    });
};
exports.getArticles = (req, res) => {
    articleModel.getAllArticles((articles) => {
        res.render('articles', { articles });
    });
};
exports.getArticleById = (req, res) => {
    const keyword = req.query.keyword;
    articleModel.getArticleById(keyword,(articles) => {
        res.render('article', { articles });
    });
};
exports.gethome = (req, res) => {
    CategoryModel.getAllCategories(categories => {
        articleModel.getAllArticles(articles => {
            res.render('index', { categories, articles });
        });
    });
};
exports.searchArticles = (req, res) => {
    const keyword = req.query.keyword;
    articleModel.searchArticles(keyword, (articles) => {
        res.render('searchResults', { articles, keyword });
    });
};

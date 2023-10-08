const db = require('../db');

class Article {
    constructor(articleData) {
        if (articleData) {
            this.IdArticle = articleData.IdArticle;
            this.Titre = articleData.Titre;
            this.Description = articleData.Description;
            this.date = articleData.date;
            this.image = articleData.image;
            this.autheur = articleData.autheur;
            this.idcat = articleData.idcat;
        }
    }

    static getAllArticles(callback) {
        db.query('SELECT * FROM articles INNER JOIN categories', (err, articles) => {
            if (err) throw err;
            const formattedArticles = articles.map(article => new Article(article));
            callback(formattedArticles);
        });
    }

    static getArticleById(articleId, callback) {
        db.query('SELECT * FROM articles WHERE IdArticle = ?', [articleId], (err, articles) => {
            if (err) throw err;
            const formattedArticle = articles.length > 0 ? new Article(articles[0]) : null;
            callback(formattedArticle);
        });
    }

    static createArticle(newArticleData, callback) {
        db.query('INSERT INTO articles SET ?', newArticleData, (err, result) => {
            if (err) throw err;
            const createdArticle = result.affectedRows > 0 ? newArticleData : null;
            callback(createdArticle);
        });
    }
    static updateArticle(articleId, updatedArticleData, callback) {
        db.query('UPDATE articles SET ? WHERE IdArticle = ?', [updatedArticleData, articleId], (err, result) => {
            if (err) throw err;
            const updatedArticle = result.affectedRows > 0 ? updatedArticleData : null;
            callback(updatedArticle);
        });
    }
    static deleteArticle(articleId, callback) {
        db.query('DELETE FROM articles WHERE IdArticle = ?', [articleId], (err, result) => {
            if (err) throw err;
            const isDeleted = result.affectedRows > 0;
            callback(isDeleted);
        });
    }
        
}

module.exports = Article;

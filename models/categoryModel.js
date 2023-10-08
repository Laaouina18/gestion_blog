const db = require('../db');
class Category {
    constructor(categoryData) {
        if (categoryData) {
            this.IdCategorie = categoryData.IdCategorie;
            this.Titre = categoryData.Titre;
            this.Description=categoryData.Description;
            this.image=categoryData.image;
            // Ajoutez les autres propriétés de la table categories ici si nécessaire
        }
    }
   
    
    
    static getAllCategories(callback) {
        db.query('SELECT * FROM categories', (err, categories) => {
            if (err) throw err;
            const formattedCategories = categories.map(category => new Category(category));
            callback(formattedCategories);
        });
    }

    static getCategorybyID(ID,callback){
        db.query('SELECT *FROM categories WHERE IdCategorie=?',[ID],(err,categories)=>{
            if(err) throw err;
            const formattedCategories=categories.map(categories=>new Category(err,categories));

            callback(formattedCategories);
        })
    }

      static CreateCategory(newCategoryData,callback){
        db.query('INSERT INTO categories SET ?', newCategoryData, (err, result) => {
            if (err) throw err;
            const createdCategory = result.affectedRows > 0 ? newCategoryData : null;
            callback(createdCategory);
      })
}
static updateCategory(categoryId, updatedCategoryData, callback) {
    db.query('UPDATE categories SET ? WHERE IdCategorie = ?', [updatedCategoryData, categoryId], (err, result) => {
        if (err) throw err;
        const updatedCategory = result.affectedRows > 0 ? updatedCategoryData : null;
        callback(updatedCategory);
    });
}
static deleteCategory(CategoryId, callback) {
    db.query('DELETE FROM categories WHERE IdCategorie = ?', [CategoryId], (err, result) => {
        if (err) throw err;
        const isDeleted = result.affectedRows > 0;
        callback(isDeleted);
    });
}
}
module.exports = Category;

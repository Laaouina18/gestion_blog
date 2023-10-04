const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
router.get('/', categoriesController.getAllCategories);
router.get('/add',categoriesController.getAddCategoryForm);
router.post('/add', categoriesController.createCategory);
router.get('/:id', categoriesController.getCategoryById);
// Autres routes et configurations nécessaires

module.exports = router;

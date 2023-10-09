const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const path=require('path');
const multer=require('multer');


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','public','uploads'));
    },
    filename:function(req,file,cb){
    cb(null ,Date.now() + '-' + file.originalname);
    }
});


const multerUpload=multer({storage:storage});
router.get('/', categoriesController.getAllCategories);
router.get('/add',categoriesController.getAddCategoryForm);
router.get('/edit/:id', categoriesController.getEditCategoryForm);

router.post('/edit/:id', multerUpload.single('image'), categoriesController.updateCategory);
router.post('/add',multerUpload.single('image'), categoriesController.createCategory);
router.get('/:id', categoriesController.getCategoryById);

router.get('/delete/:id', categoriesController.deleteCategory);
module.exports = router;

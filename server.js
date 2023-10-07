const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const indexRouter = require('./routes/index');
const multer = require('multer');

const app = express();

// Middleware pour gérer le téléchargement de fichiers


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

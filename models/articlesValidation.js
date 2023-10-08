const Joi = require('joi');

const articleSchema = Joi.object({
    Titre: Joi.string().required(),
    Description: Joi.string().required(),
    date: Joi.date().required(),
    autheur: Joi.string().required(),
    idcat: Joi.number().integer().required(),
    image: Joi.string()  // Vous pouvez ajouter des validations spécifiques pour l'image si nécessaire
});

module.exports = articleSchema;

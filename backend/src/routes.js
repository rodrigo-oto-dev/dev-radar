//Quando está dentro de {Router} é porque estamos importando somente o router do express
//Se tivesse colocado const express = require('express') também funciona mas ele importa o express inteiro
const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();



//Métodos HTTP:  GET, POST, PUT, DELETE
//TIPOS DE PARAMETROS:
// Query Params: request.query(Filtros, ordenação, paginação,...)
// Route Params: request.params(passar id na exclusão/edição)
// Body: request.body (Dados para criação ou alteração de um registro)


routes.post('/devs', DevController.store);
routes.get('/devs',DevController.index);
routes.get('/search',SearchController.index);

module.exports = routes;
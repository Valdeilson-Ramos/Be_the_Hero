const express = require("express");
const crypto = require("crypto");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

//rota para criar uma sessão (logar)
routes.post("/sessions", SessionController.create);

//rota para listar as ongs cadastradas
routes.get("/ongs", OngController.index);

//rota para criar uma nova ONG
routes.post("/ongs", OngController.create);

//listar casos de uma ong logada
routes.get("/profile", ProfileController.index);

//listando todos os casos
routes.get("/incidents", IncidentController.index);

//rota para criar casos
routes.post("/incidents", IncidentController.create);

//deletando um caso
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;

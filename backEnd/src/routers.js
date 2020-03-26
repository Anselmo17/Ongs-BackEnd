const express = require('express');
const ongController = require('../../backEnd/src/controllers/ongControllers');
const incidentController = require('../src/controllers/incidentControllers');
const profileController = require('../src/controllers/profileControllers');
const sessionController = require('./controllers/sessionControllers');
 

// desacoplando a rota do express
const router = express.Router();

// rotas session
router.post('/session', sessionController.createSession);

//profile
router.get('/profile', profileController.listOngId);

//  rotas ongs
router.get('/ongs', ongController.listOngs);
router.post('/ongs', ongController.creteaOngs);

// rotas incidentes
router.get('/incidents', incidentController.listIncidents);
router.post('/incidents', incidentController.createIncidents);
router.delete('/incidents/:id', incidentController.removeIncidentId);


module.exports = router;

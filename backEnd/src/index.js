const express = require('express');
const routers = require('./routers');
const cors = require('cors');
const port = process.env.PORT || 3333;

//recebendo as informações do express
const app = express();

// user acess api
app.use(cors());
// user dados json
app.use(express.json());
app.use(routers);

// escutando na porta 
app.listen(port);
console.log(`Rodando app na porta http://localhost:${port}`);
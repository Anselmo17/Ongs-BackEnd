const crypto = require('crypto');
const connection = require('../database/connection');
const { status } = require('../helpers/statusEnum');

module.exports = {

  // cadastra ongs 
  async creteaOngs(req, res) {

    const { name, email, whatsapp, city, uf } = req.body;

    // gera id randomico
    const id = crypto.randomBytes(4).toString('HEX');


    // inseri os dados no banco
    try {
      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });


      // retorna a resposta e o status de sucesso
      return res.status(status.CREATED).json({ id });

      //caso tenha erro
    } catch (error) {

      console.log(error);
      return res.status(status.BAD_REQUEST).json({
        status: status.BAD_REQUEST,
        Error: `${error}`
      });
    }

  },

  // lista os dados 
  async listOngs(req, res) {

    // busca todos os dados 
    const ongs = await connection('ongs').select('*');

    // retorna a resposta e o status de sucesso
    return res.json(ongs);
  },



};
const connection = require('../database/connection');
const { status } = require('../helpers/statusEnum');


module.exports = {
  async listOngId(req, res) {
const ong_id = await req.headers.authorization;

    const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

    return res.status(status.OK).json(incidents);
  },
};
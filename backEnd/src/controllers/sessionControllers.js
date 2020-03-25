const connection = require('../database/connection');
const { status } = require('../helpers/statusEnum');


module.exports = {
  async createSession(req, res) {
    const { id } = await req.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    if (!ong) {
      return res.status(status.BAD_REQUEST).json({ error: "No ONG found with this ID" });
    }

    return res.json(ong);
  },
};
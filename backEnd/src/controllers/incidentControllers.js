const connection = require('../database/connection');
const { status } = require('../helpers/statusEnum');

module.exports = {

  async listIncidents(req, res) {

    // caso nao tenha pagina default e 1
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    // lista os dados paginados por 5
    const incidents = await connection('incidents').select('*')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

    // devolve qtd de dados no banco
    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async createIncidents(req, res) {
    // extrai os dados
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;


    // inseri os incidents
    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    })

    return res.status(status.CREATED).json({ id });
  },

  async removeIncidentId(req, res) {

    const { id } = req.params;
    const ong_id = req.headers.authorization;

    // filtra pelo id
    const incident = await connection('incidents').where('id', id).select('ong_id').first();

    // verifica se tem o id 
    if (incident.ong_id !== ong_id) {
      return res.status(status.BAD_REQUEST).json({ error: 'Operation not permitted.' });
    }

    // remove o dado
    await connection('incidents').where('id', id).delete();

    return res.status(status.NO_CONTENT).send();
  }

};
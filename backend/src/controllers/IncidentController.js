const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  //listando os casos
  async index(request, response) {
    const incidents = await connection("incidents").select("*");

    return response.json(incidents);
  },

  //criando um novo caso
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    //destacando o id de cada caso
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params; //id passado pela requisição
    const ong_id = request.headers.authorization; //id da ong logada

    //evitando que usuário apague casos de outro
    const incident = await connection("incidents") //procura no banco
      .where("id", id) //um id igual ao repassado na requisição
      .select("ong_id") //extraindo apenas o id da ong
      .first(); //retornando o primeiro registro encontrado

    if (incident.ong_id !== ong_id) {
      //ser o id da ong logada for diferente
      return response.status(401).json({ error: "Operação Não permitida" });
    }
    await connection("incidents")
      .where("id", id)
      .delete(); //deleta o registro
    return response.status(204).send();
  }
};

const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  //verifica se o nome da ong já existe no banco
  async create(request, response) {
    const { id } = request.body;
    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      //se não encontrar retorna o erro abaixo
      return response
        .status(400)
        .json({ error: "Nenhuma ONG encontrada para este ID" });
    }
    return response.json(ong);
  }
};

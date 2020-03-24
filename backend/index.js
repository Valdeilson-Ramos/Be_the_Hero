const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.json({
    envento: "Semana omnistack11",
    aluno: "Valdeilson Ramos"
  });
});
app.listen(3333);

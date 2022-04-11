const express = require('express')
const { faker } = require('@faker-js/faker');
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()
const port = 3001

app.use(cors())
// app.use(rateLimit({
//   windowMs: 5 * 1000, // 5 seconds
//   max: 5,
//   standardHeaders: true,
//   legacyHeaders: false
// }))

faker.locale = 'pt_BR';
const pessoas = Array
  .from(Array(10000).keys())
  .map((_, index) => ({
    id: faker.datatype.uuid(),
    nome: `${faker.name.firstName()} ${faker.name.lastName()}`
  }));

app.get('/pessoas', (req, res) => {
  const pesquisa = (req.query.nome || '').toLowerCase();
  const pessoasFiltradas = pessoas
    .filter(pessoa => pessoa.nome.toLowerCase().includes(pesquisa))
    .slice(0, 300)
  ;

  setTimeout(() => {
    res.send(pessoasFiltradas)
  }, Math.ceil(Math.random() * 1000));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
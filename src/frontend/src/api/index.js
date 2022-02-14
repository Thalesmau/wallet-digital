const API_URL = 'http://localhost:4001';
const TRANSACOES_URI = `${API_URL}/transacoes`;
const CONTA_URI = `${API_URL}/componentes`;

const conecta = (uri, options = {}) => {
  return fetch(uri, options).then(async (resposta) => {
    if (resposta.ok) {
      const dados = await resposta.json();
      return dados;
    }

    console.log(resposta)
    throw new Error(resposta);
  })
}

const listaTransacoes = () => conecta(TRANSACOES_URI);

const buscaSaldo = () => conecta(CONTA_URI).then(dados => dados.saldo);

const atualizaSaldo = (saldo) => conecta(CONTA_URI, {
  method: 'POST',
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: JSON.stringify({saldo}),
});

const atualizaTransacoes = (dados) => conecta(TRANSACOES_URI, {
  method: 'POST',
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: JSON.stringify(dados),
});

export default {
  listaTransacoes,
  buscaSaldo,
  atualizaSaldo,
  atualizaTransacoes,
};

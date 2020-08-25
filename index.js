const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/server');
const Pergunta = require('./database/Pergunta'); // Recebendo model da tabela
const Resposta = require('./database/Resposta');

// Database
connection
    .authenticate()
    .then(() => { console.log("Connection Success") })
    .catch(erro => console.log(erro))

// Definindo o ejs como view engine
app.set('view engine', 'ejs');

// Definindo acesso a arquivos estaticos
app.use(express.static('public'));

// Configuração Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
    // metodo serve para puxar informações do banco de dados, raw para só os dados informados
    Pergunta.findAll({
        raw: true, 
        order: [
            // ordenando banco de dados pelo sequelize
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas
        });
    })
});

app.get('/perguntas', (req, res) => {
    res.render('perguntas')
});

app.post('/salvarPergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo,
        descricao
    }).then(() => {
        // Após salvar no banco com sucesso, redirecionar para o pagina principal
        res.redirect('/');
    })
});

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    // criando busca condicional com sequelize
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(resposta => {
                res.render('perguntaId', {
                    pergunta, 
                    resposta
                });
                // console.log(resposta)
            });
        } else {
            res.redirect('/')
        }
    })
});

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.perguntaId;
    Resposta.create({
        corpo,
        perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`) // Redirecionando para a pagina da pergunta após resposta
    })
});

app.listen(8181, () => {
    console.log("Server online")
});
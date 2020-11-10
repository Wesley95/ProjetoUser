// Define a utilização do model usuario e a dependência http-status
const Pedidos = require('../models/pedidos');
const PedidosProdutos = require('../models/pedidosProdutos');
const status = require('http-status');
const sequelize = require('../database/database.js');
const { QueryTypes } = require('sequelize');

// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const id_client = req.body.clientId;
    const products = req.body.Products;

    // Popula cada um dos campos do model com os campos recebido na request
    Pedidos.create({
        id: id_client,
        date: "08/11/2020"
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
                addProducts(products, pedido.pedido_id)
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

function addProducts(products, request_id) {

    Promise.all(products).then(function () {
        for (var l = 0; l < products.length; l++) {
            PedidosProdutos.create({
                product_id: products[l].id,
                request_id: request_id,
                total: products[l].total
            })
        }
    }).catch();
}

exports.SelectAll = (req, res, next) => {

    const query = "SELECT usuarios.id AS 'UsuarioID', usuarios.nome AS 'UsuarioNome', Pedidos.pedido_id AS 'PedidoID', " +
        "PedidoProdutos.id AS 'ProdutoPedidoID', PedidoProdutos.total AS 'TotalProduto', produtos.nome AS 'NomeProduto', " +
        "produtos.preco AS 'PrecoProduto', Pedidos.createdAt AS 'DataCriacao' " +
        "FROM usuarios INNER JOIN Pedidos ON usuarios.id = Pedidos.id INNER JOIN PedidoProdutos " +
        "ON PedidoProdutos.request_id = Pedidos.pedido_id INNER JOIN produtos ON PedidoProdutos.product_id = produtos.id;";

    return sequelize.query(query, { type: QueryTypes.SELECT }).then(function (response) {
        if (response) {
            console.log(response);
            res.status(status.OK).send(response);
        } else {
            res.status(status.NOT_FOUND).send();
        }
    });
}
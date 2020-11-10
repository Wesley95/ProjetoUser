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

    const query = "SELECT usuarios.id AS 'UsuarioID', usuarios.nome AS 'UsuarioNome', pedidos.pedido_id AS 'PedidoID', " +
        "pedidoprodutos.id AS 'ProdutoPedidoID', pedidoprodutos.total AS 'TotalProduto', produtos.nome AS 'NomeProduto', " +
        "produtos.preco AS 'PrecoProduto', pedidos.createdAt AS 'DataCriacao' " +
        "FROM usuarios INNER JOIN pedidos ON usuarios.id = pedidos.id INNER JOIN pedidoprodutos " +
        "ON pedidoprodutos.request_id = pedidos.pedido_id INNER JOIN produtos ON pedidoprodutos.product_id = produtos.id;";

    return sequelize.query(query, { type: QueryTypes.SELECT }).then(function (response) {
        if (response) {
            console.log(response);
            res.status(status.OK).send(response);
        } else {
            res.status(status.NOT_FOUND).send();
        }
    });
}
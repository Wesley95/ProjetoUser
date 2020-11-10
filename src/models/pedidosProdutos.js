// Define que estamos utilizando o sequelize 
const Sequelize = require('sequelize');  

// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js'); 
const Pedidos = require('./pedidos.js');
const Produtos = require('./produtos.js');


const PedidoProduto = sequelize.define("PedidoProduto", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    product_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
            model:Produtos,
            key: 'id'
        }
    },
    request_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
            model:Pedidos,
            key:'pedido_id'
        }
    },
    total:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

PedidoProduto.associate = models => {
    PedidoProduto.belongsTo(models.Pedidos, {
        foreignKey: {
            allowNull: false,
            onDelete:'CASCADE'
        }
    });

    PedidoProduto.belongsTo(models.Produtos, {
        foreignKey: {
            allowNull: false
        }
    });

    PedidoProduto.hasMany(models.Produtos, {
        foreignKey: {
            allowNull: false
        }
    })
};

module.exports = PedidoProduto;
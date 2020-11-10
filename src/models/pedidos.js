// Define que estamos utilizando o sequelize 
const Sequelize = require('sequelize');

// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js');
const Usuario = require('./usuario.js');

const Pedidos = sequelize.define("Pedidos", {
    pedido_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    date: {
        allowNull: false,
        type: Sequelize.DATE()
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
            model:Usuario,
            key:'id'
        }
    }
});

Pedidos.associate = models => {
    Pedidos.belongsTo(models.Usuario, {
        foreignKey: 'id',
        allowNull: false,
        onDelete:'CASCADE'
    });
};

module.exports = Pedidos;
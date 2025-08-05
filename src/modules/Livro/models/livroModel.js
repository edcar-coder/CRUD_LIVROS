const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDb');

const LivroModel = sequelize.define('Livro',{

    id:{
        type: DataTypes.INTEGER,
        allowNUll: false,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anoPublicacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    preco:{
        type: DataTypes.FLOAT,
        allowNull: false,
       
    }
}, {
    tabbleName: 'livro',
    creatdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = {LivroModel};


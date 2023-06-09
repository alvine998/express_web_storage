const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    payment_type: {
      type: DataTypes.ENUM('qris','debit','kredit','cash'),
      allowNull: false
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id'
      }
    },
    stock_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prices',
        key: 'id'
      }
    },
    price_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_unit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    modified_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    app_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "id.storage.app.general"
    }
  }, {
    sequelize,
    tableName: 'transactions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "stock_id",
        using: "BTREE",
        fields: [
          { name: "stock_id" },
        ]
      },
      {
        name: "price_id",
        using: "BTREE",
        fields: [
          { name: "price_id" },
        ]
      },
    ]
  });
};

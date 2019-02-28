const Sequelize = require('sequelize')
const db = require('../db')

const Product_Order = db.define(
  'product_order',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    hooks: {
      beforeCreate: quantity => quantity > 0
    }
  }
)

Product_Order.beforeCreate(function(quantity) {
  if (quantity < 1) {
    throw new Error('You cannot have 0 quantity')
  }
})
module.exports = Product_Order

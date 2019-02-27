const Sequelize = require('sequelize')
const db = require('../db')

const Product_Order = db.define('product_order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = Product_Order

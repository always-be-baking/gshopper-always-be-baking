const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderNumber: {
    type: Sequelize.INTEGER
  }
})

Order.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = Order

const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Cart.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = Cart

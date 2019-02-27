const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

CartItem.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = CartItem

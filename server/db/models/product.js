const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM('cookie', 'cake', 'pastry'),
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.tstt.co.tt/files/default_images/default-thumb.gif'
  },
  description: {
    type: Sequelize.TEXT
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product

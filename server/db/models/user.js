const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName : {
    type : Sequelize.STRING,
    allowNul: false,
    validate : {
      notEmpty : true
    }
  },
  lastName : {
    type : Sequelize.STRING,
    allowNul: false,
    validate : {
      notEmpty : true
    }
  },
  email : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
      isEmail : true
    }
  },
  password : {
    type : Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty : true,
      min : 8
    }
  },
  shippingAddress : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  billingAddress : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
 
})

module.exports = User


const User = require('./user')
const Product = require('./product')
const Transaction = require('./transactions')
const CartItem = require('./cartItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

CartItem.belongsTo(User)
CartItem.belongsTo(Transaction)
CartItem.belongsTo(Product)
Transaction.belongsTo(User)

Transaction.hasMany(CartItem)
User.hasMany(CartItem)
Product.hasMany(CartItem)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Transaction,
  CartItem
}

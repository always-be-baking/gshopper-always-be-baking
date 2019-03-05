// const {User, Order, ProductOrder} = require('../db/models')

// admin authentication middleware - if the person is an admin, let them view all users, if not, redirect to our homepage - if someone is not an admin, they should only be able to see their own user information
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin === true) return next()
  res.redirect('/')
}

function isAdminOrUser(req, res, next) {
  //   console.log('req.user.id', req.user.id == req.body.id)
  if (req.user && (req.user.id == req.body.id || req.user.isAdmin))
    return next()
  res.sendStatus(401)
}

//middleware to check if a person is logged in before loading orders/cart
const isLoggedInUser = (req, res, next) => {
  if (req.user.id === req.body.id) next()
  res.redirect('/')
}

// const isAdminOrUser = async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {id: req.body.userId}})
//     if (user.isAdmin === true) next()
//     else {
//       const id = req.body.id
//       const {orderId} = await ProductOrder.findOne({
//         where: {id}
//       })
//       const {userId} = await Order.findOne({
//         where: {id: orderId}
//       })
//       userId === req.body.userId ? next() : res.redirect('/')
//     }
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = {
  isAdminOrUser,
  isAdmin,
  isLoggedInUser
}

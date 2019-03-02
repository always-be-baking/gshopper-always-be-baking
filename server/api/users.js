const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'shippingAddress', 'billingAddress']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = req.body
    const updatedUser = await User.update(
      {...user},
      {
        where: {
          id: user.id,
          email: user.email
        }
      }
    )
    res.status(204)
  } catch (error) {
    next(error)
  }
})

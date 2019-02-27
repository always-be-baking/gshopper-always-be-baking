const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  CartItem.findAll()
    .then(items => res.json(items))
    .catch(next)
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const cartItems = await CartItem.findAll({
      where: {
        userId,
        bought: false
      }
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

router.get('/transactions/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const boughtItems = await CartItem.findAll({
      where: {
        userId,
        bought: true
      }
    })
    res.json(boughtItems)
  } catch (error) {
    next(error)
  }
})

router.put('/purchase/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const cartItems = await CartItem.findAll({
      where: {
        userId,
        bought: false
      }
    })
    cartItems.forEach(item => {
      item.boughtTrue()
      item.update()
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

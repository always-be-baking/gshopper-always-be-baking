const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/open', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const order = await Order.findOne({
      where: {
        userId,
        bought: false
      }
    })
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/history', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const cart = await ProductOrder.findAll({
      where: {
        userId,
        bought: true
      }
    })
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const newOrder = await Order.create({
      userId,
      bought: false
    })
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})

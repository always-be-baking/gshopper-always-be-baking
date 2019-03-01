const router = require('express').Router()
const {ProductOrder} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const cart = await ProductOrder.findAll({
      where: {
        orderId
      }
    })
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const quantity = req.body.quanity
    const orderId = req.body.orderId
    const cartItem = await ProductOrder.create({
      quantity,
      productId,
      orderId
    })
    res.status(201).json(cartItem)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const quantity = req.body.quantity
    const id = req.body.id
    const item = await ProductOrder.findOne({
      where: {
        id
      }
    })
    const updatedCartItem = await item.update({
      quantity
    })
    res.status(204).json(updatedCartItem)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const id = req.body.id
    await ProductOrder.destroy({
      where: {
        id
      }
    })
    res.status(202)
  } catch (error) {
    next(error)
  }
})

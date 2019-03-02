const router = require('express').Router()
const {ProductOrder, Product} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const cart = await ProductOrder.findAll({
      where: {
        orderId
      },
      include: [{model: Product}]
    })
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const quantity = req.body.quantity
    const orderId = req.body.orderId
    const cartCheck = await ProductOrder.findOne({
      where: {
        orderId,
        productId
      },
      include: [{model: Product}]
    })
    if (cartCheck) {
      const updatedCart = await cartCheck.update({
        quantity: cartCheck.dataValues.quantity + quantity
      })
      // console.log('ADDING CART ITEM', updatedCart.dataValues)
      res.status(200).json(updatedCart)
    } else {
      const newCartItem = await ProductOrder.create({
        quantity,
        productId,
        orderId
      })
      // console.log('CREATING CART ITEM', newCartItem.dataValues)
      res.status(201).json(newCartItem)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const quantity = req.body.quantity
    // console.log(quantity, 'quantity')
    const id = req.body.id
    const updatedCartItem = await ProductOrder.update(
      {
        quantity
      },
      {
        where: {
          id
        },
        returning: true,
        plain: true
      }
    )
    res.status(200).json(updatedCartItem[1])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    console.log('delete route reached', id)
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

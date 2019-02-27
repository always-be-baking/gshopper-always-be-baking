/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const CartItem = require('./cartItem')
// const Cart = db.model('cart')

describe('CartItem model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('toggle bought', () => {
      let cart

      beforeEach(async () => {
        cart = await CartItem.create({
          quantity: 2,
          bought: false
        })
      })

      it('returns true if toggled', () => {
        cart.boughtTrue()
        expect(cart.bought).to.be.equal(true)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

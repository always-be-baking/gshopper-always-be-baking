/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      // User.create({
      //   firstName: 'cody',
      //   lastName: 'smith',
      //   email: 'cody@puppybook.com',
      //   shippingAddress: '5 Hannover sq New York City, NY 10000',
      //   billingAddress: '5 Hannover sq New York City, NY 10000'
      // })
      CartItem.create({
        quantity: 3,
        bought: false
      })
    })

    it('GET /api/cartitems/', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect([
          {
            userId: 1,
            quantity: 3,
            bought: false
          }
        ])

      // expect(res.body).to.be.an('array')
      // expect(res.body[0].userId).to.be.equal(5)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

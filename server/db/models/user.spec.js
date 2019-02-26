/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName : 'cody',
          lastName : 'smith',
          email: 'cody@puppybook.com',
          password: 'bones123',
          shippingAdress : '23 Wall Street New York, NY 10000',
          billingAdress : '23 Wall Street New York, NY 10000'

        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

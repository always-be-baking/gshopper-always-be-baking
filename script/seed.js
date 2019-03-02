'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'smith',
      email: 'cody@email.com',
      password: '123',
      shippingAddress: '5 hannover sq New York City, NY 10000',
      billingAddress: '5 hannover sq New York City, NY 10000'
    }),
    User.create({
      firstName: 'emmy',
      lastName: 'panken',
      email: 'murphy@email.com',
      password: '123',
      shippingAddress: '5 hannover sq New York City, NY 10000',
      billingAddress: '5 hannover sq New York City, NY 10000'
    })
  ])

  const product = await Promise.all([
    Product.create({
      name: 'choc chip cookie',
      category: 'cookies',
      price: 12,
      description: 'yum',
      inventory: 12
    }),
    Product.create({
      name: 'fancy cake',
      category: 'cakes',
      price: 6,
      description: 'yum',
      inventory: 12
    }),
    Product.create({
      name: 'croissant',
      category: 'pastries',
      price: 1,
      description: 'yum',
      inventory: 30
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      bought: false
    }),
    Order.create({
      userId: 2,
      bought: false
    })
  ])

  const productOrders = await Promise.all([
    ProductOrder.create({
      userId: 1,
      quantity: 13,
      productId: 1,
      orderId: 1
    }),
    ProductOrder.create({
      userId: 2,
      quantity: 20,
      productId: 2,
      orderId: 2
    }),
    ProductOrder.create({
      userId: 2,
      quantity: 22,
      productId: 3,
      orderId: 2
    }),
    ProductOrder.create({
      userId: 1,
      quantity: 33,
      productId: 2,
      orderId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

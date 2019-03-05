/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './userReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {
        id: 1,
        firstName: 'cody',
        lastName: 'smith',
        email: 'cody@email.com',
        password: '123',
        shippingAddress: '5 hannover sq New York City, NY 10000',
        billingAddress: '5 hannover sq New York City, NY 10000',
        isAdmin: true
      }
      const fakeCart = {
        id: 1,
        bought: false,
        userId: 1
      }
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      mockAxios.onGet('/api/orders/1').replyOnce(200, fakeCart)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal({
        ...fakeUser,
        orderId: fakeCart.id
      })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})

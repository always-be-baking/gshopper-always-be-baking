import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  user: {},
  cart: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getCart = cartItems => ({type: GET_CART, cartItems})
const addProduct = cartItem => ({type: ADD_PRODUCT, cartItem})
const updateQuantity = updatedProduct => ({
  type: UPDATE_QUANTITY,
  updatedProduct
})
const deleteProduct = id => ({type: DELETE_PRODUCT, id})

/**
 * THUNK CREATORS
 */

export const deleteProductThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/productorder/${id}`)
    dispatch(deleteProduct(id))
  } catch (error) {
    console.error(error)
  }
}

export const updateQuantityThunk = ({id, quantity}) => async dispatch => {
  try {
    const res = await axios.put('/api/productorder/', {id, quantity})
    const updatedProduct = res.data
    const action = updateQuantity(updatedProduct)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

export const fetchCart = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/productorder/${orderId}`)
    const cartItems = res.data
    const action = getCart(cartItems)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

export const addProductToCart = ({
  quantity,
  productId,
  orderId
}) => async dispatch => {
  try {
    const res = await axios.post('/api/productorder', {
      quantity,
      productId,
      orderId
    })
    // console.log('ADD TO CART THUNK RESPONSE', res)
    const addedProduct = res.data
    const action = addProduct(addedProduct)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const order = await axios.get(`/api/orders/${res.data.id}`)
    const localUser = {...res.data, orderId: order.data.id}
    // console.log('resdata api orders', localUser)
    dispatch(getUser(localUser || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  let order
  let localUser
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    order = await axios.get(`/api/orders/${res.data.id}`)
    localUser = {...res.data, orderId: order.data.id}
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(localUser))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      console.log('DELETE REDUCER REACHED')
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.id)
      }
    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.updatedProduct.id) {
            return action.updatedProduct
          } else return item
        })
      }
    case ADD_PRODUCT:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.cartItem.id) {
            return action.cartItem
          } else {
            return item
          }
        })
      }
    case GET_CART:
      return {...state, cart: action.cartItems}
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, ...initialState}
    default:
      return state
  }
}

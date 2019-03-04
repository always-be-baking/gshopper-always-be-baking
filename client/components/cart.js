import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  updateQuantityThunk,
  fetchCart,
  deleteProductThunk,
  combineCarts
} from '../store/userReducer'
import CartItems from './cartItems'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  async handleQuantity(id, prodId, event) {
    console.log(event.target.value)
    const sendData = {quantity: event.target.value, id}

    // user logged in
    if (this.props.user.id) {
      await this.props.updateQuantityThunk(sendData)
      await this.props.fetchCart(this.props.user.orderId)
    } else {
      // user not logged in
      let localCart = JSON.parse(localStorage.getItem('cart'))
      let updatedLocalCart = localCart.map(item => {
        if (item.productId === prodId) {
          item.quantity = event.target.value
          return item
        } else return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedLocalCart))
      await this.setState({
        cart: updatedLocalCart
      })
    }
  }

  async handleDelete(id) {
    console.log(
      'Cart component: delete item clicked! item.id || productId: ',
      id
    )

    // user logged in
    if (this.props.user.id) {
      console.log('Cart component: delete item clicked! user found.')
      await this.props.deleteProductThunk(id)
      await this.setState({cart: this.props.cart})
    } else {
      // user not logged in
      console.log('Cart component: delete item clicked! user not found.')
      let localCart = JSON.parse(localStorage.getItem('cart'))
      let updatedLocalCart = localCart.filter(item => item.productId !== id)
      localStorage.setItem('cart', JSON.stringify(updatedLocalCart))
      await this.setState({
        cart: updatedLocalCart
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.log('Cart component: componentDidUpdate: prevProps', prevProps)
    if (this.props.user.id) {
      if (prevProps !== this.props) {
        await this.setState({
          cart: this.props.cart
        })
      }
    }
  }

  async componentDidMount() {
    try {
      // user logged in
      if (this.props.user.id) {
        console.log('Cart component: componentDidMount: user detected.')
        if (JSON.parse(localStorage.getItem('cart'))[0]) {
          await this.props.combineCarts(this.props.user.orderId)
        }
        await this.props.fetchCart(this.props.user.orderId)
      } else {
        // user not logged in
        console.log('Cart component: componentDidMount: no user detected.')
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart[0]) {
          await this.setState({
            cart
          })
        }
        console.log('Cart component: this.state', this.state)
      }
    } catch (error) {
      console.error('fetch did not work:::', error)
    }
  }

  render() {
    return (
      <CartItems
        {...this.state}
        handleDelete={id => this.handleDelete(id)}
        handleQuantity={(id, pid, evt) => this.handleQuantity(id, pid, evt)}
      />
    )
  }
}

const mapStateToProps = state => ({
  cart: state.userReducer.cart,
  user: state.userReducer.user
})

const mapDispatchToProps = dispatch => ({
  updateQuantityThunk: idQuantity => dispatch(updateQuantityThunk(idQuantity)),
  fetchCart: userId => dispatch(fetchCart(userId)),
  deleteProductThunk: id => dispatch(deleteProductThunk(id)),
  combineCarts: orderId => dispatch(combineCarts(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

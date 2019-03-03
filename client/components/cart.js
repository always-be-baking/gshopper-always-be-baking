import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  updateQuantityThunk,
  fetchCart,
  deleteProductThunk
} from '../store/userReducer'

const keygen = (function() {
  let i = 0
  return () => {
    i++
    return i
  }
})()

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
    if (this.props.user.id) {
      await this.props.updateQuantityThunk(sendData)
      await this.props.fetchCart(this.props.user.orderId)
    } else {
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
    console.log('DELETE CLICKED', id)
    await this.props.deleteProductThunk(id)
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user.id && prevProps.cart !== this.state.cart) {
      await this.setState({
        cart: this.props.cart
      })
    }
  }

  async componentDidMount() {
    try {
      // checking if user is logged in.
      if (this.props.user.id) {
        console.log('Cart component: user detected.')

        await this.props.fetchCart(this.props.user.orderId)
        let cart = this.props.cart
        console.log('Cart component: user detected, user cart: ', cart)
        await this.setState({
          cart
        })
      } else {
        console.log('Cart component: no user detected.')
        let cart = JSON.parse(localStorage.getItem('cart'))
        await this.setState({
          cart
        })
        console.log('Cart component: this.state', this.state)
      }
    } catch (error) {
      console.error('fetch did not work:::', error)
    }
  }

  // login:
  // check if localCart has items
  // if yes, find all user's productOrders
  // thunk update productOrder instances, but productId
  // rethunk load all productOrder instances
  // clear localStorage
  // else use old code.

  render() {
    return (
      <div>
        {this.state.cart.length ? (
          this.state.cart.map(item => {
            return (
              <div key={keygen()}>
                <img src={item.product.image} style={{width: '50px'}} />
                <br /> {item.product.name}
                <br /> Quantity: {item.quantity}
                <form>
                  <label>
                    CHANGE QUANTITY
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={evt =>
                        this.handleQuantity(item.id, item.productId, evt)
                      }
                    />
                  </label>
                </form>
                <button
                  type="button"
                  onClick={() => this.handleDelete(item.id)}
                >
                  DELETE ITEM
                </button>
                <hr />
              </div>
            )
          })
        ) : (
          <h1>No items in cart!</h1>
        )}
      </div>
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
  deleteProductThunk: id => dispatch(deleteProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

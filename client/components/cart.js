import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  updateQuantityThunk,
  fetchCart,
  deleteProductThunk
} from '../store/userReducer'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  handleQuantity(id, event) {
    const sendData = {quantity: event.target.value, id}
    this.props.updateQuantityThunk(sendData)
  }

  async handleDelete(id) {
    console.log('DELETE CLICKED')
    await this.props.deleteProductThunk(id)
    await this.setState({cart: this.props.cart})
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
        console.log(cart[0])
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
              <div key={item.id}>
                <img src={item.product.image} style={{width: '50px'}} />
                <br /> {item.product.name}
                <br /> Quantity: {item.quantity}
                <form>
                  <label>
                    CHANGE QUANTITY
                    <input
                      type="number"
                      onChange={evt => this.handleQuantity(item.id, evt)}
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

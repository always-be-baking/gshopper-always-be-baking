import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/userReducer'
import {fetchOneProduct} from '../store/productsReducer'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      //   product: [],
      user: []
    }
    this.handlChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    ////////////////////////////////////////need a thunk here
  }

  async componentDidMount() {
    console.log('cart mounted')
    // console.log('cat product id', this.props.cart.product.id)
    try {
      console.log('THIS.PROPS', this.props)
      await this.props.fetchCart(this.props.user.orderId)
      console.log('did this work', this.props)
      //   await this.props.fetchOneProduct(this.props.cart[0].product.id)
    } catch (error) {
      console.error('fetch did not work', error)
    }
  }

  render() {
    console.log('PROPS', this.props.cart[0])
    return (
      <div>
        {/* {<div>{this.props.product}</div>} */}
        {this.props.cart.map(item => (
          <div key={item.id}>
            <p>Name of Product: {item.product.name}</p>
            <p>Quantity Selected: {item.quantity}</p>
            <p>Price per Product: ${item.product.price}</p>
            <p>Total Amount Due: $ {item.quantity * item.product.price}</p>
          </div>
        ))}
        <h2>Payment and Billing Information</h2>
        <form onSubmit={this.handleSubmit}>
          First Name :
          <input
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <br />
          Last Name :
          <input
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <br />
          Shipping Address :
          <input
            type="text"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          />
          <br />
          Billing Address :
          <input
            type="text"
            value={this.state.billingAddress}
            onChange={this.handleChange}
          />
          <br />
          <button
            type="button"
            className="checkout"
            onClick={() => {
              this.handleChange(this.props.user)
            }}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  cart: state.userReducer.cart
  //   products: state.productsReducer.products
})

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId))
  //   fetchOneProduct: productId => dispatch(fetchOneProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

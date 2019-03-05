import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkoutThunk, updateUserThunk} from '../store/userReducer'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingAddress: '',
      billingAddress: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.checkoutThunk(this.props.user.id)
    this.props.updateUserThunk(this.state)
    this.props.history.push('/thanks')
  }

  // componentWillMount() {
  //   if (!this.props.user.id) {
  //     console.log('Checkout componentWillMount: user not logged in.')
  //     localStorage.setItem('redirect', this.props.match.path)
  //     this.props.history.push('/login')
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    let localCart = JSON.parse(localStorage.getItem('cart'))
    if (localCart[0] && !this.props.user.id) {
      console.log('Checkout componentDidMount: user not logged in.')
      localStorage.setItem('redirect', this.props.match.path)
      this.props.history.push('/login')
    } else if (this.props.user.id) {
      if (prevProps !== this.props) {
        if (!prevProps.cart[0] && !prevProps.user.id) {
          await this.props.fetchCart(this.props.user.orderId)
        }
      }
    }
  }

  async componentDidMount() {
    try {
      await this.props.fetchCart(this.props.user.orderId)
      await this.setState({...this.props.user})
    } catch (error) {
      console.error('fetch did not work', error)
    }
  }

  render() {
    return (
      <div>
        {/* {<div>{this.props.product}</div>} */}
        {this.props.cart.map(item => (
          <div key={item.id}>
            <p>Name of Product: {item.product.name}</p>
            <p>Quantity Selected: {item.quantity}</p>
            <p>Price per Product: ${item.product.price}</p>
            <br />
            {/* <p>{subtotal +=item.quantity * item.product.price}</p> */}
          </div>
        ))}
        <div>
          <h2>
            Total Amount Due : $
            {this.props.cart.reduce((total, item) => {
              total += item.quantity * parseFloat(item.product.price)
              //   console.log('total', total)
              return total
            }, 0)}
          </h2>
        </div>

        <h2>Payment and Billing Information</h2>
        <form onSubmit={this.handleSubmit}>
          <br />
          Shipping Address :
          <input
            name="shippingAddress"
            type="text"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
            required={true}
          />
          <br />
          Billing Address :
          <input
            name="billingAddress"
            type="text"
            value={this.state.billingAddress}
            onChange={this.handleChange}
            required={true}
          />
          <br />
          <button type="submit" className="checkout">
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
})

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  checkoutThunk: userId => dispatch(checkoutThunk(userId)),
  updateUserThunk: user => dispatch(updateUserThunk(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

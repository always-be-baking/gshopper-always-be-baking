import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/userReducer'

let num = 0
class MyAccount extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidUpdate(prevProps, prevState) {
    while (num < 1) {
      num++
      await this.props.fetchOrderHistory(this.props.user.id)
    }
  }

  async componentDidMount() {
    try {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      if (localCart && !this.props.user.id) {
        console.log('myAccount componentDidUpdate: no user found.')
        localStorage.setItem('redirect', this.props.match.path)
        this.props.history.push('/login')
      }
      await this.props.fetchOrderHistory(this.props.user.id)
    } catch (error) {
      console.log('fetch did not work', error)
    }
  }

  render() {
    // if (!this.props.user.length) {
    //   return <div>loading...</div>
    // }
    console.log(
      'this.props.user',
      this.props.user,
      'this.props.orders',
      this.props.orders
    )
    return (
      <div>
        My Information
        <br />
        Name:
        {this.props.user.firstName} {this.props.user.lastName}
        <br />
        Email:
        {this.props.user.email}
        <br />
        Billing Address:
        {this.props.user.billingAddress}
        <br />
        Shipping Address:
        {this.props.user.shippingAddress}
        <div>
          My Order History
          {this.props.orders.map(order => (
            <div key={order.id}>
              <p>Order ID: {order.id} </p>
              {order.products.map(product => (
                <div key={product.id}>
                  <p> Name: {product.name} </p>
                  <p> Quantity: {product.product_order.quantity} </p>
                  <img src={product.image} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user,
  orders: state.userReducer.orders
})
const mapDispatchToProps = dispatch => ({
  fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)

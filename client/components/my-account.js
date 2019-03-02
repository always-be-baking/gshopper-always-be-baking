import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/userReducer'

class MyAccount extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    try {
      console.log('PROPS USER ID', this.props.user.id)
      await this.props.fetchOrderHistory(this.props.user.id)
    } catch (error) {
      console.log('fetch did not work', error)
    }
  }

  render() {
    console.log('this.props.orders', this.props.orders)
    return (
      <div>
        My Order History
        {this.props.orders.map(order => (
          <div>
            <p>Order ID: {order.id} </p>
            <p> Name: {order.products[0].name} </p>
            <p> Quantity: {order.products[0].product_order.quantity} </p>
            <img src={order.products[0].image} />
          </div>
        ))}
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

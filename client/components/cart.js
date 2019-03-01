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
    console.log(id, event.target.value)
    const sendData = {quantity: event.target.value, id}
    this.props.updateQuantityThunk(sendData)
  }

  handleDelete(id) {
    this.props.deleteProductThunk(id)
  }

  async componentDidMount() {
    console.log('cart mounted')
    try {
      await this.props.fetchCart(this.props.user.orderId)
      console.log(this.props.user)
    } catch (error) {
      console.error('fetch did not work:::', error)
    }
  }
  render() {
    console.log('rendering!!!!!!!!!!!!!')
    return (
      <div>
        {this.props.cart[0] &&
          this.props.cart.map(item => {
            return (
              <div key={item.id}>
                {item.name}
                Quantity: {item.quantity}
                <form>
                  <label>
                    CHANGE QUANTITY
                    <input
                      type="number"
                      itemID={item.id}
                      onChange={evt => this.handleQuantity(item.id, evt)}
                    />
                  </label>
                </form>
                <button type="button" onClick={() => this.handleDelete(id)}>
                  DELETE ITEM
                </button>
              </div>
            )
          })}
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

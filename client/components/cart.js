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
  }

  async componentDidMount() {
    try {
      await this.props.fetchCart(this.props.user.orderId)
    } catch (error) {
      console.error('fetch did not work:::', error)
    }
  }

  render() {
    return (
      <div>
        {this.props.cart.length ? (
          this.props.cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.product.imageUrl} />
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

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/productsReducer'
import {addProductToCart} from '../store/userReducer'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      addedtoCart: [0, false]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    // console.log('component did mount', this.props.match)
    try {
      await this.props.fetchOneProduct(this.props.match.params.id)
    } catch (err) {
      console.log('fetch didnt work')
    }
  }

  handleChange(evt) {
    console.log(evt)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let productId = this.props.selectedProduct.id
    let quantity = Number(this.state.quantity)
    let orderId = this.props.user.orderId
    let image = this.props.selectedProduct.image
    let obj = {productId, quantity, orderId}

    // check if user logged in; if not, save item to localStorage
    if (this.props.user.id) {
      console.log('ADD TO CART: req.body sent to thunk: ', obj)
      this.props.addProductToCart(obj)
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      let alreadyAdded = localCart.find(item => item.productId === productId)
      if (alreadyAdded) {
        localCart = localCart.map(item => {
          if (item.productId === productId) {
            item.quantity += quantity
            return item
          } else return item
        })
      } else {
        localCart.push({product: {productId, quantity, image}})
      }
      console.log('LocalCart: ', localCart)
      localStorage.setItem('cart', JSON.stringify(localCart))
    }

    this.setState({
      addedtoCart: [this.state.quantity, true]
    })
  }

  render() {
    if (!this.props.selectedProduct) {
      return <div>loading...</div>
    }
    return (
      <div>
        <div key={this.props.selectedProduct.id}>
          <h2>
            <i>{this.props.selectedProduct.category}</i> >>{' '}
            {this.props.selectedProduct.name}
          </h2>

          <img
            src={this.props.selectedProduct.image}
            style={{width: '200px'}}
          />
          <p>${this.props.selectedProduct.price}</p>
          <p>{this.props.selectedProduct.description}</p>

          <form onSubmit={this.handleSubmit}>
            <label>
              Quantity
              <input
                style={{width: '50px'}}
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                min="1"
              />
            </label>
            <button type="submit" className="cart">
              Add to Cart
            </button>
            {this.state.addedtoCart[1] && (
              <h3>{this.state.addedtoCart[0]} added to cart!</h3>
            )}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.productsReducer.selectedProduct,
  user: state.userReducer.user
})

const mapDispathToProps = dispatch => {
  return {
    fetchOneProduct: id => dispatch(fetchOneProduct(id)),
    addProductToCart: obj => dispatch(addProductToCart(obj))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SingleProduct)

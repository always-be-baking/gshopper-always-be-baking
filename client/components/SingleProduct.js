import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/productsReducer'
import {addProductToCart} from '../store/userReducer'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
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
    console.log(evt.target)
    let productId = this.props.selectedProduct.id
    let quantity = Number(this.state.quantity)
    let orderId = this.props.user.orderId
    let obj = {productId, quantity, orderId}
    console.log('ADD TO CART CLICKED!!! req.body: ', obj)
    this.props.addProductToCart(obj)
  }

  render() {
    if (!this.props.selectedProduct) {
      return <div>loading...</div>
    }

    return (
      <div>
        <h2>{this.props.products}</h2>
        <ul>
          <div key={this.props.selectedProduct.id}>
            <p>{this.props.selectedProduct.name}</p>
            <Link to={`/${this.props.selectedProduct.category}`}>
              {this.props.selectedProduct.category}
            </Link>
            <img src={this.props.selectedProduct.image} />
            <p>{this.props.selectedProduct.price}</p>
            <p>{this.props.selectedProduct.description}</p>

            <form onSubmit={this.handleSubmit}>
              <label>
                Quantity
                <input
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
            </form>
          </div>
        </ul>
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

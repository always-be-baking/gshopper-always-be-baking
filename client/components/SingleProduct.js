import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/productsReducer'
import {addProductToCart} from '../store/userReducer'
import ProductPreview from './productPreview'

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
    let product = this.props.selectedProduct
    let productId = this.props.selectedProduct.id
    let quantity = Number(this.state.quantity)
    let orderId = this.props.user.orderId
    let obj = {productId, quantity, orderId}

    // user logged in
    if (this.props.user.id) {
      console.log('ADD TO CART: req.body sent to thunk: ', obj)
      this.props.addProductToCart(obj)
    } else {
      // user not logged in
      if (!JSON.parse(localStorage.getItem('cart'))) {
        console.log('Routes component: creating localStorage cart.')
        localStorage.setItem('cart', JSON.stringify([]))
      }
      let localCart = JSON.parse(localStorage.getItem('cart'))
      let alreadyAdded = localCart.find(item => item.productId === productId)
      if (alreadyAdded) {
        localCart = localCart.map(item => {
          if (item.productId === productId) {
            item.quantity = Number(item.quantity) + quantity
            return item
          } else return item
        })
      } else {
        localCart.push({
          productId: product.id,
          quantity,
          product: {
            name: product.name,
            image: product.image
          }
        })
      }
      console.log('LocalCart: ', localCart)
      localStorage.setItem('cart', JSON.stringify(localCart))
    }

    this.setState({
      addedtoCart: [this.state.quantity, true]
    })
  }

  render() {
    return (
      <ProductPreview
        state={this.state}
        selectedProduct={this.props.selectedProduct}
        handleSubmit={evt => this.handleSubmit(evt)}
        handleChange={evt => this.handleChange(evt)}
      />
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

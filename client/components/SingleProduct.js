import React, {Component} from 'react'
import {connect} from 'http2'
import {fetchOneProducts} from '../store/productsReducer'

export class SingleProduct extends Component {
  render() {
    if (!this.props.category) {
      return (
        <div>
          Loading
          <img src="https://d2jq2hx2dbkw6t.cloudfront.net/184/loading-645268_640.jpg" />
        </div>
      )
    }

    return (
      <div>
        <h2>{this.props.selectedProduct.name}</h2>
        <ul>
          <div key={this.props.product.id}>
            <p>{this.props.product.name}</p>
            <p>{this.props.product.category}</p>
            <img src={this.props.product.image} />
            <p>{this.props.product.price}</p>
            <p>{this.props.product.description}</p>
          </div>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispathToProps = dispatch => {
  return {
    fetcOneProduct: category => dispatch(fetchOneProducts(category))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SingleProduct)

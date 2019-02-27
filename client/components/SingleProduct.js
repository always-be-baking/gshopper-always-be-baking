import React, {Component} from 'react'
import {connect} from 'http2'
import {fetchOneProduct} from '../store/productsReducer'

export class SingleProduct extends Component {
  render() {
    if (!this.props.selectedProduct) {
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
          <div key={this.props.selectedProduct.id}>
            <p>{this.props.selectedProduct.name}</p>
            <p>{this.props.selectedProduct.category}</p>
            <img src={this.props.selectedProduct.image} />
            <p>{this.props.selectedProduct.price}</p>
            <p>{this.props.selectedProduct.description}</p>
          </div>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct
})

const mapDispathToProps = dispatch => {
  return {
    fetcOneProduct: product => dispatch(fetchOneProduct(product))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SingleProduct)

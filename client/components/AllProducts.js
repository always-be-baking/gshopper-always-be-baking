import React, {Component} from 'react'
import {connect} from 'http2'
import {fetchProducts} from '../store/productsReducer'

export class AllProducts extends Component {
  render() {
    return (
      <div>
        <h2>List all Products</h2>
        <ul>
          {this.props.products.map(product => (
            <div key={product.id}>
              <p>{product.name}</p>
              <img src={product.image} />
              <p>{product.price}</p>
            </div>
          ))}
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
    fetchProducts: () => dispatch(fetchProducts)
  }
}

export default connect(mapStateToProps, mapDispathToProps)(AllProducts)

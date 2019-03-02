import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/productsReducer'

export class ListView extends Component {
  componentDidMount() {
    this.props.fetchProducts(this.props.category)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.fetchProducts(this.props.category)
    }
  }

  render() {
    if (!this.props.products) {
      return (
        <div>
          Loading
          <img src="https://d2jq2hx2dbkw6t.cloudfront.net/184/loading-645268_640.jpg" />
        </div>
      )
    }

    return (
      <div>
        <h2>Showing all {this.props.category}!</h2>
        {this.props.products.map(product => (
          <div key={product.id}>
            <Link to={`/${this.props.category}/${product.id}`}>
              <p>{product.name}</p>
              <img src={product.image} style={{width: '150px'}} />
            </Link>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.productsReducer.products
})

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: category => dispatch(fetchProducts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)

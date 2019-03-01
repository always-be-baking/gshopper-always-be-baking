import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/productsReducer'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {name: '', quantity: 0}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    console.log('component did mount', this.props.match)
    try {
      await this.props.fetchOneProduct(this.props.match.params.id)
    } catch (err) {
      console.log('fetch didnt work')
    }
  }

  handleChange(evt) {
    console.log(evt)
    this.setState({
      [evt.name]: evt.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.thunkhere()
  }

  render() {
    // console.log('rendering')
    if (!this.props.selectedProduct) {
      return <div>loading...</div>
    }
    // if (!this.props.category) {
    //   return (
    //     <div>
    //       Loading
    //       <img src="https://d2jq2hx2dbkw6t.cloudfront.net/184/loading-645268_640.jpg" />
    //     </div>
    //   )
    // }
    console.log(this.props.selectedProduct, 'PRODUCT?')
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
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  min="0"
                />
              </label>
              <button
                type="button"
                className="cart"
                onClick={() => {
                  this.handleChange(this.props.selectedProduct)
                }}
              >
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
  // products: state.products,
  selectedProduct: state.productsReducer.selectedProduct
})

const mapDispathToProps = dispatch => {
  return {
    fetchOneProduct: id => dispatch(fetchOneProduct(id))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SingleProduct)

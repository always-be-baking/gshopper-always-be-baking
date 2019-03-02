import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  console.log('navBar component rendering.')
  return (
    <div>
      <h1>Welcome to our bakery!</h1>
      <nav>
        <div>
          <Link to="/cookies">Cookies</Link>
          <Link to="/cakes">Cakes</Link>
          <Link to="/pastries">Pastries</Link>
          {user.id ? (
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      </nav>
      <hr />
    </div>
  )
}

const mapState = state => {
  console.log(
    'navBar component mapState returning props',
    !!state.userReducer.id
  )
  return {
    isLoggedIn: !!state.userReducer.id,
    user: state.userReducer.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

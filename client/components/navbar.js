import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  return (
    <div>
      <nav>
        <div className="categories">
          <Link to="/cookies">COOKIES</Link>
          <Link to="/cakes">CAKES</Link>
          <Link to="/pastries">PASTRIES</Link>
        </div>
        <Link to="/">
          <img id="logo" src="/images/logo.png" />
        </Link>
        <div className="user">
          <Link to="/cart">CART</Link>
          {user.id ? (
            <a href="#" onClick={handleClick}>
              LOGOUT
            </a>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
          {!user.id && <Link to="/signup">SIGN UP </Link>}
          {user.id && <Link to="/myaccount">MY ACCOUNT</Link>}
        </div>
      </nav>
    </div>
  )
}

const mapState = state => {
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

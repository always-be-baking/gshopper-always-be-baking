import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <div>
        <h2>Please sign in!</h2>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <br />

          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.userReducer.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.userReducer.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('LoginComponent: auth thunk called.')
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
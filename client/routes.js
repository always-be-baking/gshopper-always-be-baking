import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  ListView,
  HomePage,
  SingleProduct
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route
          exact
          path="/cakes"
          render={() => <ListView category="cakes" />}
        />
        <Route path="/cakes/:id" component={SingleProduct} />
        <Route
          exact
          path="/cookies"
          render={() => <ListView category="cookies" />}
        />
        <Route path="/cookies/:id" component={SingleProduct} />

        <Route
          exact
          path="/pastries"
          render={() => <ListView category="pastries" />}
        />
        <Route path="/pastries/:id" component={SingleProduct} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Homepage component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.userReducer.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

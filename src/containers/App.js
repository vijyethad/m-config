import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as redditActions from '../actions';
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {

  componentDidMount() {
    const { selectedReddit } = this.props
    this.props.actions.fetchPostsIfNeeded(selectedReddit)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { selectedReddit } = nextProps
      this.props.actions.fetchPostsIfNeeded(selectedReddit)
    }
  }

  handleChange = nextReddit => {
    this.props.actions.selectReddit(nextReddit)
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { selectedReddit } = this.props
    this.props.actions.invalidateReddit(selectedReddit)
    this.props.actions.fetchPostsIfNeeded(selectedReddit)
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(redditActions, dispatch)
	}
}

App.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

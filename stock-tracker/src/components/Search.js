import React, { Component } from 'react'
import Suggestions from './Suggestions'
import getResults from './getResults'

class Search extends Component {
  state = {
    error: false,
    query: '',
    results: []
  }


  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length >= 1) {
        this.setState({results: getResults(this.state.query)})
        }
    })
  }

  render() {
    return (
      <form style={{textAlign:"center"}}>
        <input
          placeholder="Enter Stock Name or Symbol..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          style={{width:"500px"}}
        />
        {this.state.query.length > 0 ? <Suggestions results={this.state.results} add_function={this.props.add_function} /> : ""}
        
      </form>
    )
  }
}

export default Search
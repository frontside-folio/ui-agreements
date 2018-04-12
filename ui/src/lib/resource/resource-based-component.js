import restful, { fetchBackend } from 'restful.js'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable, action, computed, runInAction } from 'mobx'
import 'whatwg-fetch'

class ResourceBasedComponent extends Component {
  static PropTypes = {
    resourceType: PropTypes.string.isRequired,
    params: PropTypes.function
  }
  
  constructor (props) {
    super(props)
    this.resourceType = props.resourceType
    this.url = props.url ? props.url : 'https://jsonplaceholder.typicode.com'
  }
  
  @observable resourceType
  @observable url
  @observable working = false
  
  @computed get api() {
    return restful(this.url, fetchBackend(fetch))
  }
  
  @computed get dataContext() {
    return this.api.all(this.resourceType)
  }
  
  @observable data
    
  @action.bound
  async fetchData(params) {
    this.working = true
    
    const remoteData = await this.dataContext.getAll(params)
    
    // The run in action ensures that the code within is executed after the await has finished, and within this context.
    runInAction(() => {
      this.data = remoteData
      this.working = false
    })
  }
  
//  componentWillMount() {
//    this.fetchData()
//  }
}

export default ResourceBasedComponent

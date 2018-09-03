import React, { Component } from 'react'
import { observable, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'

import ViewAgreement from './view-agreement'

/**
 * This component is meant as an example of how everything works together. In real life all the fetching
 * should be in an importable library or "store". This component would then depend on 1 or more values from the "store"
 * and would update when, and only when used values are changed.
 * 
 * This will allow us to really separate the logic from the drawing components, and the majority of our react components will become
 * single functions instead of stateful classes.
 * 
 * 
 * Observer type component. i.e. Redraw when a referenced observable changes.
 */

@observer
class ViewAgreementComponent extends Component {
  
  constructor(props) {
    super(props)
  }

  @observable
  entitlements = []
  
  /**
   * (action) - Signals to MobX that this method will update an observable. In MobX terms, actions have associated reactions. The bound
   * part means that the "this" var would always equate to the instance of this class within the action.
   * 
   * autorun causes the method to refire if any vars used within it are observable. In our case the only observable we use is "this.props.current",
   * and we only look at the 'id' in this method.
   * This means this method will rerun if the id property of "this.property.current" changes. And won't necessarily re-render if a different property changes.
   * 
   * This action updated the entitlements var declared within this class. This class is declared as an observer, and will therefore
   * update itself when an observable it uses updates. This is not limited to observables within this object, they could be passed in as properties.
   * The word "used" in this case means any observable it deserailises when calling it's render method.
   * 
   * Simply declaring the entitlements array as observable would not cause a redraw on update. It has to be referenced in the render method or by,
   * a computed method called within the render method.
   * 
   */
  @action.bound
  doFetch = autorun(() => {
    
    console.log("Attempt to fetch entitlements")
//    this.props.app.fetchJSON (this.props.app.apiConfig.root+'/erm/entitlements').then((jsonData) => {
//      console.log("Got entitlement data %o",jsonData);
//      this.setState({entitlements:jsonData});
//    })
    
    // Fetches the type uri for passing to our api.
    this.props.app.getResourceType('entitlement').then((theType) => {
      
      // Receives the type from the app and constructs an api based on it.
      let resourceAPI = this.props.app.api.all(theType)
      
      // Based on restful.js. Ask for the JSON results and pass the parameters using a get.
      resourceAPI.getAll({

        filters: [
          `owner.id==${this.props.current.id}`       
        ]
        
      }).then((response) => {
        // Grab the response body, which in this case is plain JSON array. Grab the results from that parsed data.
        // The response from restful.js has 3 methods. headers, body and statusCode. All should be self explanitory.
        
        // Entitlements is now set to the response from the server. The server responded with an array of json objects.
        // When restfulJS parses that though, it returns an array of it's own entity types. See: https://github.com/marmelab/restful.js/tree/master#entity-data
        
        // We have 2 choices. We keep the array of internal entities. Useful if we need to call entity.save() so save any updates etc...
        // Or, and in our case most useful as we are not updating, we can call the data method on each entity received and add that plain
        // json object to the array instead.
        
        let body = response.body() || []
        this.entitlements = body.map((entity) => (entity.data()))
      })
    })
  })

  render() {
    
    // Simply mentioning the entitlements here should be enough for MobX to redraw this when the
    // value or contents of entitlements changes.
    
    // MobX observable array is an object. Using slice maintains compatibility with objects that use plain arrays.
    let ent = this.entitlements.slice()
    
    return (
      <ViewAgreement current={this.props.current} {...this.props} entitlements={ent} />
    )
  }
}
export default hot(module)(ViewAgreementComponent)

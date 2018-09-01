import React from 'react'
import {observable} from 'mobx'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Container, Row, Col } from 'reactstrap'
import Search from '../../components/search'

import {tableFormatters, textHighlighter} from '../../lib/helpers'

import ViewAgreement from './view-agreement'

class ViewAgreementComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entitlements:[]
    }
  }

  componentDidMount() {
    console.log("Attempt to fetch entitlements");
    this.props.app.fetchJSON (this.props.app.apiConfig.root+'/erm/entitlements').then((jsonData) => {
      console.log("Got entitlement data %o",jsonData);
      this.setState({entitlements:jsonData});
    })
  }

  render() {
   return (
      <ViewAgreement {...this.props} entitlements={this.state.entitlements} />
    )
  }
}
export default hot(module)(ViewAgreementComponent)

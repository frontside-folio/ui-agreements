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
    console.log("Fetch data from server...");
    this.setState({entitlements:{"one":"two","three":"four"}});
  }

  render() {
   return (
      <ViewAgreement {...this.props} entitlements={this.state.entitlements} />
    )
  }
}
export default hot(module)(ViewAgreementComponent)

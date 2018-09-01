import React from 'react'
import {observable} from 'mobx'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Container, Row, Col } from 'reactstrap'
import Resources from './resources'

import {tableFormatters, textHighlighter} from '../../lib/helpers'

class ResourcesComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Resources {...this.props} />
      </div>
    )
  }
}
export default hot(module)(ResourcesComponent)

import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Form, FormGroup, Label, Col, Input } from 'reactstrap'

const ViewAgreement = observer(( { current } ) => {
  
  return (
    <Form>
      <FormGroup row>
        <Label sm={2} >Agreement Name</Label>
        <Col sm={10} >
          <Input  plaintext >{ current.name }</Input>
        </Col>
      </FormGroup>
      
    </Form>
  )
})
  
export default hot(module) (ViewAgreement)

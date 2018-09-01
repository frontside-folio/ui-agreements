import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Form, FormGroup, Label, Col, Input } from 'reactstrap'


const AgreementLines = observer(({entitlements}) => {
  
  const data = entitlements.map((row) => 
      <tr key={row.id} ><td>{row.id}</td></tr>
  );

  return (
      <table>
        <thead>
	  <tr>
	    <th>Entitlement ID</th>
	  </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
  )
})
  
export default hot(module) (AgreementLines)

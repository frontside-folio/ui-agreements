import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Form, FormGroup, Label, Col, Input } from 'reactstrap'
import AgreementLines from './agreement-lines'

// Folio Accordion:: https://ux.folio.org/docs/guidelines/components/accordion/
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';

const ViewAgreement = observer(( { current, accordions, entitlements } ) => {
  
  return (
    <div>

     <h1>{ current.name } </h1>

      <AccordionSet>

        <Accordion label="Agreement Information" id="ex-1">
          <div className="form-group">
	    <label>Agreement Name</label>
	    <p className="form-control-static">{ current.name }</p>
	  </div>
          <div className="form-group">
	    <label>Description</label>
	    <p className="form-control-static">{ current.description }</p>
	  </div>
          <div className="form-group">
	    <label>Cancellation Deadline</label>
	    <p className="form-control-static"></p>
	  </div>
          <div className="form-group">
	    <label>Content Review Date (Internal)</label>
	    <p className="form-control-static"></p>
	  </div>
          <div className="form-group">
	    <label>Renewal Priority </label>
	    <p className="form-control-static"></p>
	  </div>
          <div className="form-group">
	    <label>Is Perpetual?</label>
	    <p className="form-control-static"></p>
	  </div>
          <div className="form-group">
	    <label>License Type</label>
	    <p className="form-control-static"></p>
	  </div>
        </Accordion>

        <Accordion label="Agreement Lines" id="ex-2">
	  <AgreementLines entitlements={entitlements} />
        </Accordion>

        <Accordion label="License" id="ex-3">
          <p></p>
        </Accordion>
        <Accordion label="License and Business Terms" id="ex-4">
          <p></p>
        </Accordion>
        <Accordion label="Organisations" id="ex-5">
          <p></p>
        </Accordion>
        <Accordion label="E-resources" id="ex-6">
          <p></p>
        </Accordion>
        <Accordion label="Associated Agreements" id="ex-7">
          <p></p>
        </Accordion>
      </AccordionSet>

    </div>
  )
})
  
export default hot(module) (ViewAgreement)

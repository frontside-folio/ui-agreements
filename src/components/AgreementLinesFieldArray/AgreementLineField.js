import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import { Col, Datepicker, KeyValue, Row, TextArea } from '@folio/stripes/components';
import { EditCard } from '@folio/stripes-erm-components';

import BasketSelector from '../BasketSelector';
import { SerialCoverage } from '../Coverage';
import EResourceLink from '../EResourceLink';
import EResourceCount from '../EResourceCount';
import EResourceProvider from '../EResourceProvider';
import EResourceType from '../EResourceType';
import { isExternal, isPackage, parseDateOnlyString } from '../utilities';

import CoverageFieldArray from '../CoverageFieldArray';
import POLinesFieldArray from '../POLinesFieldArray';

export default class AgreementLineField extends React.Component {
  static propTypes = {
    basket: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    }).isRequired,
    onDelete: PropTypes.func,
    onResourceSelected: PropTypes.func,
    poLines: PropTypes.arrayOf(PropTypes.object),
    resource: PropTypes.object,
  }

  static defaultProps = {
    resource: {},
  }

  validateDateOrder = (value, allValues, meta) => {
    if (value && meta) {
      let activeFrom;
      let activeTo;

      if (meta.name.indexOf('activeFrom') >= 0) {
        activeFrom = value;
        activeTo = get(allValues, meta.name.replace('activeFrom', 'activeTo'));
      } else if (meta.name.indexOf('activeTo') >= 0) {
        activeFrom = get(allValues, meta.name.replace('activeTo', 'activeFrom'));
        activeTo = value;
      } else {
        return undefined;
      }

      if (activeFrom && activeTo && new Date(activeFrom) >= new Date(activeTo)) {
        return (
          <div data-test-error-end-date-too-early>
            <FormattedMessage id="ui-agreements.errors.endDateGreaterThanStartDate" />
          </div>
        );
      }
    }

    return undefined;
  }

  renderLineName = (resource) => {
    const dereferencedResource = get(resource, '_object.pti.titleInstance', resource);
    return <EResourceLink eresource={dereferencedResource} />;
  }

  renderLineType = (resource) => {
    return <EResourceType resource={resource} />;
  }

  renderLineTitles = (resource) => {
    return <EResourceCount resource={resource} />;
  }

  renderLineProvider = (resource) => {
    return <EResourceProvider resource={resource} />;
  }

  renderCoverage = (resource) => {
    // This is intentional, after talking to Gill a decision was made that behaviour of coverage in the edit screen was to remain blank for monographs.
    return <SerialCoverage statements={resource.coverage} />;
  }

  renderPOLinesFieldArray = () => {
    const {
      index,
      input: { name },
      poLines,
    } = this.props;

    return (
      <FieldArray
        agreementLineIndex={index}
        component={POLinesFieldArray}
        name={`${name}.poLines`}
        poLines={poLines}
      />
    );
  }

  renderCustomCoverageFieldArray = () => {
    const { input: { name }, resource } = this.props;

    if (isPackage(resource)) return null;
    if (isExternal(resource)) return null;

    return (
      <FieldArray
        addButtonId="add-agreement-custom-coverage-button"
        addLabelId="ui-agreements.agreementLines.addCustomCoverage"
        component={CoverageFieldArray}
        deleteButtonTooltipId="ui-agreements.agreementLines.removeCustomCoverage"
        headerId="ui-agreements.agreementLines.customCoverageTitle"
        id="agreement-form-custom-coverages"
        name={`${name}.coverage`}
      />
    );
  }

  renderLineResource = () => {
    const { resource = {}, index, input: { name } } = this.props;

    return (
      <div>
        <Row>
          <Col md={5} xs={12}>
            <KeyValue label={<FormattedMessage id="ui-agreements.eresources.name" />}>
              <div data-test-ag-line-name>{this.renderLineName(resource)}</div>
            </KeyValue>
          </Col>
          <Col md={2} xs={12}>
            <KeyValue label={<FormattedMessage id="ui-agreements.eresources.type" />}>
              <div data-test-ag-line-type>{this.renderLineType(resource)}</div>
            </KeyValue>
          </Col>
          <Col md={2} xs={12}>
            <KeyValue label={<FormattedMessage id="ui-agreements.eresources.titles" />}>
              <div data-test-ag-line-titles>{this.renderLineTitles(resource)}</div>
            </KeyValue>
          </Col>
          <Col md={3} xs={12}>
            <KeyValue label={<FormattedMessage id="ui-agreements.eresources.provider" />}>
              <div data-test-ag-line-provider>{this.renderLineProvider(resource)}</div>
            </KeyValue>
          </Col>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-agreements.eresources.defaultCoverage" />}>
              <div data-test-ag-line-coverage>{this.renderCoverage(resource)}</div>
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col md={4} xs={12}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              id={`agreement-line-${index}-active-from`}
              label={<FormattedMessage id="ui-agreements.eresources.activeFrom" />}
              name={`${name}.activeFrom`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              parser={parseDateOnlyString}
              validate={this.validateDateOrder}
            />
          </Col>
          <Col md={4} xs={12}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              id={`agreement-line-${index}-active-to`}
              label={<FormattedMessage id="ui-agreements.eresources.activeTo" />}
              name={`${name}.activeTo`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              parser={parseDateOnlyString}
              validate={this.validateDateOrder}
            />
          </Col>
        </Row>
        <Field
          component={TextArea}
          id={`agreement-line-${index}-note`}
          label={<FormattedMessage id="ui-agreements.note" />}
          name={`${name}.note`}
          parse={v => v} // Lets us send an empty string instead of `undefined`
        />
        {this.renderPOLinesFieldArray()}
        {this.renderCustomCoverageFieldArray()}
      </div>
    );
  }

  renderLineSelector = () => {
    const { input: { name }, meta: { error } } = this.props;

    return (
      <BasketSelector
        addButtonLabel={<FormattedMessage id="ui-agreements.agreementLines.createLine" />}
        autoFocus
        basket={this.props.basket}
        error={React.isValidElement(error) ? error : undefined}
        name={`${name}.basketSelector`}
        onAdd={resource => this.props.onResourceSelected(this.props.index, resource)}
      />
    );
  }

  render() {
    const { index, resource = {} } = this.props;

    return (
      <EditCard
        data-test-ag-line-number={index}
        deleteButtonTooltipText={<FormattedMessage id="ui-agreements.agreementLines.removeLine" values={{ index: index + 1 }} />}
        header={<FormattedMessage id="ui-agreements.agreementLines.lineTitle" values={{ number: index + 1 }} />}
        onDelete={this.props.onDelete}
      >
        <>
          {
            (resource.id || resource.reference) ?
              this.renderLineResource() :
              this.renderLineSelector()
          }
        </>
      </EditCard>
    );
  }
}

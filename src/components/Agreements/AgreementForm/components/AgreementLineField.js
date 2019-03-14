import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Icon,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import EResourceLink from '../../../EResourceLink';
import ResourceType from '../../../ResourceType';
import css from './AgreementLineField.css';

export default class AgreementLineField extends React.Component {
  renderLineName = (resource) => {
    const title = get(resource, ['_object', 'pti', 'titleInstance'], resource);
    return <EResourceLink eresource={title} />;
  }

  renderLineType = (resource) => {
    return <ResourceType resource={resource} />;
  }

  renderLineTitles = (resource) => {
    // If contentItems doesn't exist there's only one item.
    return get(resource, ['_object', 'contentItems'], [0]).length;
  }

  renderLinePlatform = (resource) => {
    return (
      get(resource, ['_object', 'pti', 'platform', 'name']) ||
      get(resource, ['_object', 'nominalPlatform', 'name'])
    );
  }

  render() {
    const { fieldKey, resource } = this.props;

    return (
      <li
        className={css.agLineField}
        data-test-ag-line-number={fieldKey}
      >
        <div>
          <div className={css.agLineHeader} start="xs">
            <div>
              <strong>{`Agreement line ${fieldKey}`}</strong>
            </div>
            <div className={css.agLineHeaderActions}>
              <Button
                buttonStyle="link slim"
                style={{ margin: 0, padding: 0 }}
                onClick={() => this.props.onDelete(fieldKey)}
              >
                <Icon icon="trash" />
              </Button>
            </div>
          </div>
          <div className={css.agLineBody}>
            <Row>
              <Col xs={12} md={5}>
                <KeyValue label={<FormattedMessage id="ui-agreements.eresources.name" />}>
                  <div data-test-ag-line-name>{this.renderLineName(resource)}</div>
                </KeyValue>
              </Col>
              <Col xs={12} md={2}>
                <KeyValue label={<FormattedMessage id="ui-agreements.eresources.type" />}>
                  <div data-test-ag-line-type>{this.renderLineType(resource)}</div>
                </KeyValue>
              </Col>
              <Col xs={12} md={2}>
                <KeyValue label={<FormattedMessage id="ui-agreements.eresources.titles" />}>
                  <div data-test-ag-line-titles>{this.renderLineTitles(resource)}</div>
                </KeyValue>
              </Col>
              <Col xs={12} md={3}>
                <KeyValue label={<FormattedMessage id="ui-agreements.eresources.platform" />}>
                  <div data-test-ag-line-platform>{this.renderLinePlatform(resource)}</div>
                </KeyValue>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                PO Line Selector
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                [Add Custom Coverage Button]
              </Col>
            </Row>
          </div>
        </div>
      </li>
    );
  }
}

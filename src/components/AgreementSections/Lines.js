import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import { Accordion, Badge, Spinner } from '@folio/stripes/components';

import CoveredEResourcesList from './CoveredEResourcesList';
import LinesList from './LinesList';

export default class Lines extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      eresources: PropTypes.arrayOf(PropTypes.object),
      lines: PropTypes.arrayOf(PropTypes.object),
      orderLines: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    eresourcesFilterPath: PropTypes.string,
    handlers: PropTypes.shape({
      onExportEResourcesAsJSON: PropTypes.func.isRequired,
      onExportEResourcesAsKBART: PropTypes.func.isRequired,
      onFilterEResources: PropTypes.func.isRequired,
      onNeedMoreEResources: PropTypes.func.isRequired,
      onNeedMoreLines: PropTypes.func.isRequired,
      onViewAgreementLine: PropTypes.func.isRequired,
    }).isRequired,
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  }

  renderBadge = () => {
    const count = get(this.props, 'agreement.lines.length');
    if (count === undefined) return <Spinner />;

    return <Badge data-test-agreement-lines-count={count}>{count}</Badge>;
  }

  render() {
    const {
      agreement,
      eresourcesFilterPath,
      handlers,
      id,
      onToggle,
      open,
    } = this.props;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-agreements.agreements.agreementLines" />}
        onToggle={onToggle}
        open={open}
      >
        <LinesList
          agreement={agreement}
          onNeedMoreLines={handlers.onNeedMoreLines}
          onViewAgreementLine={handlers.onViewAgreementLine}
          visible={open}
        />
        <CoveredEResourcesList
          agreement={agreement}
          eresourcesFilterPath={eresourcesFilterPath}
          onExportEResourcesAsJSON={handlers.onExportEResourcesAsJSON}
          onExportEResourcesAsKBART={handlers.onExportEResourcesAsKBART}
          onFilterEResources={handlers.onFilterEResources}
          onNeedMoreEResources={handlers.onNeedMoreEResources}
          visible={open}
        />
      </Accordion>
    );
  }
}

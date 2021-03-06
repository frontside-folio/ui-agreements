import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  FormattedUTCDate,
  Headline,
  Layout,
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';

import { Coverage } from '../Coverage';
import CustomCoverageIcon from '../CustomCoverageIcon';
import EResourceLink from '../EResourceLink';
import EResourceType from '../EResourceType';
import { getResourceFromEntitlement, urls } from '../utilities';

const EntitlementAgreementsList = (
  { headline,
    id,
    isEmptyMessage,
    entitlements,
    visibleColumns }
) => {
  const columnMapping = {
    name: <FormattedMessage id="ui-agreements.agreements.name" />,
    type: <FormattedMessage id="ui-agreements.agreements.agreementStatus" />,
    package: <FormattedMessage id="ui-agreements.eresources.package" />,
    startDate: <FormattedMessage id="ui-agreements.agreementPeriods.periodStart" />,
    endDate: <FormattedMessage id="ui-agreements.agreementPeriods.periodEnd" />,
    parentPackage: <FormattedMessage id="ui-agreements.eresources.parentPackage" />,
    acqMethod: <FormattedMessage id="ui-agreements.eresources.acqMethod" />,
    coverage: <FormattedMessage id="ui-agreements.eresources.coverage" />,
    isCustomCoverage: ' ',
  };

  const columnWidths = {
    startDate: 120,
    endDate: 120,
  };

  const formatter = {
    name: e => <div data-test-agreement-name><Link to={urls.agreementView(e?.owner?.id)}>{e?.owner.name}</Link></div>,
    type: e => <div data-test-agreement-status>{e?.owner?.agreementStatus?.label ?? <NoValue />}</div>,
    package: e => <div data-test-agreement-package>{e?.resource?._object?.pkg?.name ?? <NoValue />}</div>,
    startDate: e => <div data-test-agreement-start-date>{e?.owner?.startDate && <FormattedUTCDate value={e?.owner?.startDate} />}</div>,
    endDate: e => <div data-test-agreement-start-date>{e?.owner?.endDate && <FormattedUTCDate value={e?.owner?.endDate} />}</div>,
    parentPackage: e => <EResourceLink eresource={getResourceFromEntitlement(e)} />,
    acqMethod: e => <EResourceType resource={e?.resource} />,
    coverage: e => <Coverage line={e} />,
    isCustomCoverage: e => e.customCoverage && <CustomCoverageIcon />,
  };

  const renderHeadline = () => {
    return headline ? (
      <Layout className="padding-top-gutter" data-test-eresource-name>
        <Headline margin="small" tag="h4">
          {headline}
        </Headline>
      </Layout>
    ) : null;
  };

  return (
    <div>
      {renderHeadline()}
      <MultiColumnList
        columnMapping={columnMapping}
        columnWidths={columnWidths}
        contentData={entitlements}
        formatter={formatter}
        id={id}
        interactive={false}
        isEmptyMessage={isEmptyMessage}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};

EntitlementAgreementsList.defaultProps = {
  isEmptyMessage: <FormattedMessage id="ui-agreements.emptyAccordion.noAgreementsEresource" />,
  visibleColumns: ['name', 'type', 'startDate', 'endDate']
};

EntitlementAgreementsList.propTypes = {
  entitlements: PropTypes.arrayOf(PropTypes.object),
  headline: PropTypes.node,
  id: PropTypes.string,
  isEmptyMessage: PropTypes.node,
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
};

export default EntitlementAgreementsList;

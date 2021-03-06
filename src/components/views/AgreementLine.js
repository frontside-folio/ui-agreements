import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  Icon,
  IconButton,
  LoadingPane,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { AppIcon, IfPermission } from '@folio/stripes/core';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import { Info, POLines, Coverage } from '../AgreementLineSections';
import { isExternal, urls } from '../utilities';

const propTypes = {
  data: PropTypes.shape({
    line: PropTypes.shape({
      coverage: PropTypes.array,
      customCoverage: PropTypes.bool,
      endDate: PropTypes.string,
      id: PropTypes.string,
      note: PropTypes.string,
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      poLines: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        titleOrPackage: PropTypes.string,
        poLineNumber: PropTypes.string,
      })),
      resource: PropTypes.shape({
        _object: PropTypes.object,
      }),
      startDate: PropTypes.string,
    }).isRequired,
  }),
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onToggleTags: PropTypes.func,
  }).isRequired,
  helperApp: PropTypes.node,
  isLoading: PropTypes.bool,
};

const AgreementLine = ({
  data: { line },
  handlers,
  helperApp,
  isLoading,
}) => {
  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    id: 'pane-view-agreement-line',
    onClose: handlers.onClose,
  };

  const intl = useIntl();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  if (isLoading) return <LoadingPane data-loading {...paneProps} />;

  const resource = isExternal(line) ? line : (line.resource?._object ?? {});
  const resourceName = resource.pti?.titleInstance.name ?? resource.reference_object?.label ?? '';

  return (
    <>
      <Pane
        actionMenu={() => (
          <IfPermission perm="ui-agreements.agreements.edit">
            <Button
              buttonStyle="dropdownItem"
              id="clickable-dropdown-edit-agreement-line"
              onClick={handlers.onEdit}
            >
              <Icon icon="edit">
                <FormattedMessage id="ui-agreements.agreements.edit" />
              </Icon>
            </Button>
            <Button
              buttonStyle="dropdownItem"
              id="clickable-dropdown-delete-agreement-line"
              onClick={() => setShowDeleteConfirmationModal(true)}
            >
              <Icon icon="trash">
                <FormattedMessage id="ui-agreements.delete" />
              </Icon>
            </Button>
          </IfPermission>
        )}
        appIcon={<AppIcon app="agreements" />}
        lastMenu={
          <IfPermission perm="ui-agreements.agreements.edit">
            <PaneMenu>
              {handlers.onToggleTags &&
                <IconButton
                  ariaLabel={intl.formatMessage({ id: 'ui-agreements.agreements.showTags' })}
                  badgeCount={line?.tags?.length ?? 0}
                  icon="tag"
                  id="clickable-show-tags"
                  onClick={handlers.onToggleTags}
                />
              }
            </PaneMenu>
          </IfPermission>
        }
        paneTitle={<FormattedMessage id="ui-agreements.agreementLine" />}
        {...paneProps}
      >
        <Info line={line} resource={resource} />
        <AccordionStatus>
          <Row end="xs">
            <Col xs>
              <ExpandAllButton id="clickable-expand-all" />
            </Col>
          </Row>
          <AccordionSet>
            <POLines line={line} resource={resource} />
            <Coverage line={line} resource={resource} />
            <FormattedMessage id="ui-agreements.line.lineForAgreement" values={{ agreementName: line.owner?.name }}>
              {title => (
                <NotesSmartAccordion
                  domainName="agreements"
                  entityId={line.id ?? '-'}
                  entityName={title ?? '-'}
                  entityType="agreementLine"
                  id="agreement-line-notes"
                  pathToNoteCreate={urls.noteCreate()}
                  pathToNoteDetails={urls.notes()}
                />
              )}
            </FormattedMessage>
          </AccordionSet>
        </AccordionStatus>
      </Pane>
      {helperApp}
      <ConfirmationModal
        buttonStyle="danger"
        confirmLabel={<FormattedMessage id="ui-agreements.delete" />}
        data-test-delete-confirmation-modal
        heading={<FormattedMessage id="ui-agreements.agreementLines.deleteAgreementLine" />}
        id="delete-agreement-line-confirmation"
        message={<SafeHTMLMessage id="ui-agreements.agreementLines.deleteConfirmMessage" values={{ name: resourceName }} />}
        onCancel={() => setShowDeleteConfirmationModal(false)}
        onConfirm={() => {
          handlers.onDelete();
          setShowDeleteConfirmationModal(false);
        }}
        open={showDeleteConfirmationModal}
      />
    </>
  );
};

AgreementLine.propTypes = propTypes;
export default AgreementLine;

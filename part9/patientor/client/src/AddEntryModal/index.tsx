import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface AddEntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal: React.FC<AddEntryProps> = ({ modalOpen, onClose, onSubmit, error }) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new health check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
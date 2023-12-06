import { Meta, Story } from '@storybook/react';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const BasicModal = Template.bind({});
BasicModal.args = {
  children: <div style={{height:'500px', width:'400px'}}>Modal Content</div>,
  onClose: () => console.log('Modal Closed'),
  showModal: true,
};

export const ModalWithCloseButton = Template.bind({});
ModalWithCloseButton.args = {
  ...BasicModal.args,
  showCloseModal: true,
};

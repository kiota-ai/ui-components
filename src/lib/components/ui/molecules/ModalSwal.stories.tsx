import { Meta, Story } from '@storybook/react';
import { ModalSwal, ModalSwalProps } from './Modal';

export default {
  title: 'ModalSwal',
  component: ModalSwal,
} as Meta;

const Template: Story<ModalSwalProps> = (args) => <ModalSwal {...args} />;

export const BasicModalSwal = Template.bind({});
BasicModalSwal.args = {
  title: 'Success',
  text: 'Operation completed successfully.',
  onClick: () => console.log('Modal Closed'),
};


// BasicToast.stories.tsx
import { Meta, Story } from '@storybook/react';
import { BasicToast, AlertProps } from './BasicToast';

export default {
  title: 'BasicToast',
  component: BasicToast,
} as Meta;

const Template: Story<AlertProps> = (args) => <BasicToast {...args} />;

export const Error = Template.bind({});
Error.args = {
  children: 'This is an error message',
  appearance: 'error',
  onDismiss: () => console.log('Dismissed error'),
};

export const Success = Template.bind({});
Success.args = {
  children: 'This is a success message',
  appearance: 'success',
  onDismiss: () => console.log('Dismissed success'),
};

export const Alert = Template.bind({});
Alert.args = {
  children: 'This is an alert message',
  appearance: 'alert',
  onDismiss: () => console.log('Dismissed alert'),
};

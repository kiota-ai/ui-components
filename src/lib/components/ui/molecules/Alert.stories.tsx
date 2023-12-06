// Alert.stories.tsx

import { Meta, Story } from '@storybook/react';
import { Alert, AlertsProps } from './Alert';

export default {
  title: 'Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertsProps> = (args) => <Alert {...args} />;

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  text: 'This is an information alert',
  style: 'info',
  bgColor: 'bg-gray-100',
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  text: 'This is a warning alert',
  style: 'warning',
  bgColor: 'bg-gray-100',
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  text: 'This is an error alert',
  style: 'error',
  bgColor: 'bg-gray-100',
};

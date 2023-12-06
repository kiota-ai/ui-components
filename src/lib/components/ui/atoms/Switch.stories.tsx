// Switch.stories.tsx

import { Meta, Story } from '@storybook/react';
import { Switch, CheckboxProps } from './Switch';

export default {
  title: 'Switch',
  component: Switch,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: (checked) => console.log('Switch is now:', checked),
  checked: false,
  text: 'Toggle Switch',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: { message: 'This is an error message' },
};

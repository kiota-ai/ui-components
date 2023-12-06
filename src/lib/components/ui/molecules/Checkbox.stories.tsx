// Checkbox.stories.tsx

import { Meta, Story } from '@storybook/react';
import { Checkbox, CheckboxsProps } from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxsProps> = (args) => <Checkbox {...args} />;

export const BasicCheckbox = Template.bind({});
BasicCheckbox.args = {
  label: 'Check me',
  checked: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log('Checked:', e.target.checked),
};

export const CheckedCheckbox = Template.bind({});
CheckedCheckbox.args = {
  label: 'Checked',
  checked: true,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log('Checked:', e.target.checked),
};

export const DisabledCheckbox = Template.bind({});
DisabledCheckbox.args = {
  label: 'Disabled',
  checked: false,
  disabled: true,
};

export const CheckboxWithError = Template.bind({});
CheckboxWithError.args = {
  label: 'Checkbox with error',
  checked: false,
  error: { message: 'This checkbox has an error.' },
};


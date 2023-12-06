// TextArea.stories.tsx

import { Meta, Story } from '@storybook/react';
import { TextArea, InputProps } from './TextArea';

export default {
  title: 'TextArea',
  component: TextArea,
} as Meta;

const Template: Story<InputProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  error: null,
  label: 'Description',
  placeholder: 'Enter your description here...',
  rows: 4,
  required: false,
  className: 'your-custom-class',
  labelClassName: 'font-medium',
};

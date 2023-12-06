// Select.stories.tsx

import { Meta, Story } from '@storybook/react';
import { Select, SelectProps } from './Select';

export default {
  title: 'Select',
  component: Select,
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select',
  placeholder: 'Choose an option',
  items: [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3', disabled: true },
  ],
  multiSelect: false,
  error: null,
  initialValues: [],
  onSelect: (selectedOptions:object) => console.log('Selected:', selectedOptions),
  sort: 'asc',
  required: false,
  className: 'custom-styles',
  disabled: false,
  isClearable: true,
  showQuantity: true,
  noOptionsText: 'No options available',
};

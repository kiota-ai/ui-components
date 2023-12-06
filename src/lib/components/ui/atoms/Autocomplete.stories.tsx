/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, Story } from '@storybook/react';
import { Autocomplete,AutocompleteProps } from './Autocomplete';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
} as Meta;

const Template: Story<AutocompleteProps> = (args) => <Autocomplete {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Type here...',
  options: [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
  ],
  reference: {}, // Pass an appropriate ref object
  onSelect: (selectedOption:any) => console.log('Selected Option:', selectedOption),
};

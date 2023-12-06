// Input.stories.tsx
import { Meta, Story } from '@storybook/react';
import { Input, InputFieldProps } from './Input';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story<InputFieldProps> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  label: 'Username',
  type: 'text',
  placeholder: 'Enter your username',
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
};

export const Email = Template.bind({});
Email.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email',
};

export const Number = Template.bind({});
Number.args = {
  label: 'Number',
  type: 'number',
  placeholder: 'Enter a number',
};

export const Search = Template.bind({});
Search.args = {
  label: 'Search',
  type: 'search',
  placeholder: 'Search...',
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  label: 'Custom Style',
  type: 'text',
  placeholder: 'Enter with custom style',
  className: 'bg-main', 
};

export const Required = Template.bind({});
Required.args = {
  label: 'Required Field',
  type: 'text',
  placeholder: 'This field is required',
  required: true,
};


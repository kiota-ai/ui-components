// InputColor.stories.tsx
import { Meta, Story } from '@storybook/react';
import { InputColor, InputColorProps } from './InputColor';

export default {
  title: 'InputColor',
  component: InputColor,
} as Meta;

const Template: Story<InputColorProps> = (args) => <InputColor {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Pick a color',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Pick a color',
  error: { message: 'Invalid color format' },
};

export const CustomOnChange = Template.bind({});
CustomOnChange.args = {
  label: 'Pick a color',
  onChange: (color: string) => console.log(`Selected color: ${color}`),
};


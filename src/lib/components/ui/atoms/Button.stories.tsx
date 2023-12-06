// Button.stories.tsx
import { Meta, Story } from '@storybook/react';
import { Button, ButtonsProps } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonsProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Click me',
  onClick: () => console.log('Button clicked'),
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  text: 'Custom Styled Button',
  bgColor: 'red',
  textColor: 'white',
  bgHoverColor: 'darkred',
  borderColor: 'darkred',
  textColorHover: 'white',
};

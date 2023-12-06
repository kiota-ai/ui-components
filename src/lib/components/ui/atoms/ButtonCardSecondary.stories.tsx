// ButtonCardSecondary.stories.tsx
import { Meta, Story } from '@storybook/react';
import { ButtonCardSecondary, ButtonCardSecondaryProps } from './ButtonCardSecondary';

export default {
  title: 'ButtonCardSecondary',
  component: ButtonCardSecondary,
} as Meta;

const Template: Story<ButtonCardSecondaryProps> = (args) => <ButtonCardSecondary {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Click me',
  onClick: () => console.log('Button clicked'),
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  text: 'Custom Styled Button',
  marginRight: '2',
  marginLeft: '2',
};

// ButtonSecondary.stories.tsx
import { Meta, Story } from '@storybook/react';
import { ButtonSecondary, ButtonSecondaryProps } from './ButtonSecondary';

export default {
  title: 'ButtonSecondary',
  component: ButtonSecondary,
} as Meta;

const Template: Story<ButtonSecondaryProps> = (args) => <ButtonSecondary {...args} />;

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
  marginTop: '2',
  width: '100%',
  paddingVertical: '4',
};

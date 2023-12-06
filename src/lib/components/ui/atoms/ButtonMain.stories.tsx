// ButtonMain.stories.tsx
import { Meta, Story } from '@storybook/react';
import { ButtonMain, ButtonProps } from './ButtonMain';

export default {
  title: 'ButtonMain',
  component: ButtonMain,
} as Meta;

const Template: Story<ButtonProps> = (args) => <ButtonMain {...args} />;

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
  width: '100%',
  paddingVertical: '4',
};

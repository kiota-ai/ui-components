// ButtonCardMain.stories.tsx
import { Meta, Story } from '@storybook/react';
import { ButtonCardMain, ButtonCardMainProps } from './ButtonCardMain';

export default {
  title: 'ButtonCardMain',
  component: ButtonCardMain,
} as Meta;

const Template: Story<ButtonCardMainProps> = (args) => <ButtonCardMain {...args} />;

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
  className: 'font-bold',
};

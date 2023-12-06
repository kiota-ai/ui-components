// ButtonDanger.stories.tsx
import { Meta, Story } from '@storybook/react';
import { ButtonDanger, ButtonDangerProps } from './ButtonDanger';

export default {
  title: 'ButtonDanger',
  component: ButtonDanger,
} as Meta;

const Template: Story<ButtonDangerProps> = (args) => <ButtonDanger {...args} />;

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
};

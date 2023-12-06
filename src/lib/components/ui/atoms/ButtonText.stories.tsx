// BottomText.stories.tsx
import { Meta, Story } from '@storybook/react';
import { BottomText, ButtonTextProps } from './ButtonText';

export default {
  title: 'BottomText',
  component: BottomText,
} as Meta;

const Template: Story<ButtonTextProps> = (args) => <BottomText {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'This is a sample bottom text.',
};

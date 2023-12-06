// ButtonsGroup.stories.tsx
import { Meta, Story } from '@storybook/react';
import { ButtonsGroup, ButtonsGroupProps } from './ButtonsGroup';

export default {
  title: 'ButtonsGroup',
  component: ButtonsGroup,
} as Meta;

const Template: Story<ButtonsGroupProps> = (args) => <ButtonsGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: 'Option 1', onClick: () => console.log('Option 1 clicked'), icon: '🌟',className:'bg-green' },
    { label: 'Option 2', onClick: () => console.log('Option 2 clicked'), icon: '🚀',className:'bg-red' },
    { label: 'Option 3', onClick: () => console.log('Option 3 clicked'), icon: '🎉',className:'bg-main' },
  ],
  className: 'my-custom-class',
};

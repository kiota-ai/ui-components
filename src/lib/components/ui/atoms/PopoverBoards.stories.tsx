// PopoverBoards.stories.tsx

import { Meta, Story } from '@storybook/react';
import { PopoverBoards, PopoverBoardsProps } from './PopoverBoards';

export default {
  title: 'PopoverBoards',
  component: PopoverBoards,
} as Meta;

const Template: Story<PopoverBoardsProps> = (args) => <PopoverBoards {...args} />;

export const Default = Template.bind({});
Default.args = {
  methods: {
    method1: () => console.log('Method 1 clicked'),
    method2: () => console.log('Method 2 clicked'),
  },
  items: ['method1', 'method2'],
};

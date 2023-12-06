// PopoverMenu.stories.tsx

import { Meta, Story } from '@storybook/react';
import { PopoverMenu, PopoverMenuProps } from './PopoverMenu';
import { FaTrash, FaUser } from 'react-icons/fa';

export default {
  title: 'PopoverMenu',
  component: PopoverMenu,
} as Meta;

const Template: Story<PopoverMenuProps> = (args) => <PopoverMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: (url: string) => console.log(`Redirecting to: ${url}`),
  items: [
    { title: 'Item 1', icon: <FaUser />, url:'/users' },
    { title: 'Item 2', icon: <FaTrash />, url:'/trash' },
  ],
};

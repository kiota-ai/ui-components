/* eslint-disable @typescript-eslint/no-explicit-any */
// Menu.stories.tsx

import { Meta, Story } from '@storybook/react';
import { Menu, MenuProps } from './Menu';
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

const Template: Story<MenuProps> = (args) => <Menu {...args} />;

export const DefaultMenu = Template.bind({});
DefaultMenu.args = {
  sections: [
    { title: 'Home', url: '/home', icon: <FiHome /> },
    { title: 'Settings', url: '/settings', icon: <FiSettings /> },
    { title: 'Profile', url: '/profile', icon: <FiUser /> },
  ],
  onClick: (url:any) => console.log('Clicked:', url),
  onClickOpenMenu: () => console.log('Open Menu Clicked'),
  activePath: '/home',
  logoUrl: 'https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg',
  logoAltUrl: 'https://prod-platforms-resources.s3.eu-west-1.amazonaws.com/65135f4568465b647b01a9e2/f5cb8211-934c-44c2-aed8-e507e6ceec56.png',
  activeMenu: true,
};

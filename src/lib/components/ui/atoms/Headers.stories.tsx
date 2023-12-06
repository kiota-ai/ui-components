// Header.stories.tsx
import { Meta, Story } from '@storybook/react';
import { Header, HeaderProps } from './Headers';
import { FaUser } from 'react-icons/fa';

export default {
  title: 'Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => {
    // Implement your onClick logic here
    console.log('Header clicked');
  },
  onClickOpenMenu: () => {
    // Implement your onClickOpenMenu logic here
    console.log('Menu clicked');
  },
  items: [
    {
      title: 'my_account',
      icon: <FaUser />,
      investor: true,
      founder: true,
      admin: false,
      url: '/account'
    }
  ],
  reminders: [],
  totalReminders: 0,
  logoUrl: 'https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg',
};

// HelpMenu.stories.tsx
import { Meta, Story } from '@storybook/react';
import { HelpMenu, MenuHelpProps } from './HelpMenu';

export default {
  title: 'HelpMenu',
  component: HelpMenu,
} as Meta;

const Template: Story<MenuHelpProps> = (args) => <HelpMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: (url: string) => {
    // Implement your onClick logic here
    console.log(`Redirect to ${url}`);
  },
};

// PageTitle.stories.tsx

import { Meta, Story } from '@storybook/react';
import { PageTitle, PageHeaderProps } from './PageTitle';

export default {
  title: 'PageTitle',
  component: PageTitle,
} as Meta;

const Template: Story<PageHeaderProps> = (args) => <PageTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Page Title',
};

export const WithBackButton = Template.bind({});
WithBackButton.args = {
  title: 'Page Title',
  showBack: true,
  onBackClick: () => alert('Back button clicked!'),
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  title: 'Page Title',
  className: 'text-red',
};

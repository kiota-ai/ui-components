// RemindersMenu.stories.tsx

import { Meta, Story } from '@storybook/react';
import { RemindersMenu, RemindersMenuProps } from './RemindersMenu';

export default {
  title: 'RemindersMenu',
  component: RemindersMenu,
} as Meta;

const Template: Story<RemindersMenuProps> = (args) => <RemindersMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  reminders: [
    {
      title: 'Reminder 1',
      reminder_type: 'call',
      date: '2023-01-01T10:00:00',
      deal: {
        logo: null,
        name: 'Deal 1',
      },
    },
  ],
  totalReminders: 2,
  onClick: (url:string) => console.log(`Clicked on ${url}`),
};

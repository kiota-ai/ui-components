// TeammateCard.stories.tsx

import { Meta, Story } from '@storybook/react';
import { TeammateCard, TeammateCardProps } from './TeammateCard';

export default {
  title: 'TeammateCard',
  component: TeammateCard,
} as Meta;

const Template: Story<TeammateCardProps> = (args) => <TeammateCard {...args} />;

export const BasicTeammateCard = Template.bind({});
BasicTeammateCard.args = {
  teammate: {
    user: {
      name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    },
    name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    invited: '2023-01-01T12:00:00Z',
    activation_date: '2023-01-02T14:30:00Z',
  },
  editTeammate: (teammate) => console.log('Edit teammate:', teammate),
};

export const TeammateCardWithoutImage = Template.bind({});
TeammateCardWithoutImage.args = {
  teammate: {
    user: {
      name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
    },
    name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com',
    invited: '2023-02-01T10:00:00Z',
    activation_date: '2023-02-02T16:45:00Z',
  },
  editTeammate: (teammate) => console.log('Edit teammate:', teammate),
};


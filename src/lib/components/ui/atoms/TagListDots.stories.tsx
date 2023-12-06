// TagListDots.stories.tsx

import { Meta, Story } from '@storybook/react';
import { TagListDots, TagListDotsProps } from './TagListDots';

export default {
  title: 'TagListDots',
  component: TagListDots,
} as Meta;

const Template: Story<TagListDotsProps> = (args) => <TagListDots {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: [
    { _id: '1', name: 'Tag1', color: '#FF5733' },
    { _id: '2', name: 'Tag2', color: '#33FF57' },
    { _id: '3', name: 'Tag3', color: '#5733FF' },
  ],
  className: 'your-custom-class',
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  tags: [],
  className: 'your-custom-class',
};

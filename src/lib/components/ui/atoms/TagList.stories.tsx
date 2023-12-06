// TagList.stories.tsx

import { Meta, Story } from '@storybook/react';
import { TagList, TagListProps } from './TagList';

export default {
  title: 'TagList',
  component: TagList,
} as Meta;

const Template: Story<TagListProps> = (args) => <TagList {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: [
    { _id: '1', name: 'Tag1', color: '#FF5733' },
    { _id: '2', name: 'Tag2', color: '#33FF57' },
    { _id: '3', name: 'Tag3', color: '#5733FF' },
  ],
  showEmptyState: false,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  tags: [],
  showEmptyState: true,
};

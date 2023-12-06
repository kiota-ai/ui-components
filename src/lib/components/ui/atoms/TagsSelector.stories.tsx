/* eslint-disable @typescript-eslint/no-explicit-any */
// TagsSelector.stories.tsx

import { Meta, Story } from '@storybook/react';
import { TagsSelector, Props } from './TagsSelector';
import { useState } from 'react';

export default {
  title: 'TagsSelector',
  component: TagsSelector,
} as Meta;

const Template: Story<Props> = (args) => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  return <TagsSelector {...args} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />;
};

export const Default = Template.bind({});
Default.args = {
  tags: [
    { _id: '1', name: 'Tag1', color: '#FF5733' },
    { _id: '2', name: 'Tag2', color: '#33FF57' },
    { _id: '3', name: 'Tag3', color: '#5733FF' },
  ],
};

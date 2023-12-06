// PopoverTrelloList.stories.tsx

import { Meta, Story } from '@storybook/react';
import { PopoverTrelloList, PopoverTrelloListProps } from './PopoverTrelloList';

export default {
  title: 'PopoverTrelloList',
  component: PopoverTrelloList,
} as Meta;

const Template: Story<PopoverTrelloListProps> = (args) => <PopoverTrelloList {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: ['Item 1', 'Item 2', 'Item 3'],
  methods: {
    'Item 1': () => console.log('Clicked on Item 1'),
    'Item 2': () => console.log('Clicked on Item 2'),
    'Item 3': () => console.log('Clicked on Item 3'),
  },
};

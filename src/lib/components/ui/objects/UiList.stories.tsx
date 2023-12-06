import { Meta, Story } from '@storybook/react';
import { UiList, ListProps } from './UiList';

export default {
  title: 'UiList',
  component: UiList,
} as Meta;

const Template: Story<ListProps> = (args) => (
  <UiList {...args}>
    <div>Item 1</div>
    <div>Item 2</div>
  </UiList>
);

export const VerticalList = Template.bind({});
VerticalList.args = {
  horizontal: false,
  className: null,
};

export const HorizontalList = Template.bind({});
HorizontalList.args = {
  horizontal: true,
  className: null,
};



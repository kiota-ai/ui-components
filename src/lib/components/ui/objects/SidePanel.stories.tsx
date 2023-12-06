import { Meta, Story } from '@storybook/react';
import { SidePanel, SidePanelProps } from './SidePanel';

export default {
  title: 'SidePanel',
  component: SidePanel,
} as Meta;

const Template: Story<SidePanelProps> = (args) => <SidePanel {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Example SidePanel',
  width: 'w-64',
  showExpand: true,
  onClose: () => {
  },
};

export const WithoutExpand = Template.bind({});
WithoutExpand.args = {
  title: 'SidePanel Without Expand',
  width: 'w-64',
  showExpand: false,
  onClose: () => {
  },
};

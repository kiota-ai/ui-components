// Tooltip.stories.tsx

import { Meta, Story } from '@storybook/react';
import { Tooltip, TooltipProps } from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const InfoTooltip = Template.bind({});
InfoTooltip.args = {
  dataFor: 'info-tooltip',
  infoTootlip: true,
  children1: <span>ℹ️</span>,
  children: 'This is an informative tooltip.',
  setHeight: false,
  icon: true,
  dataDelay: '0',
};

export const AugmentedTooltip = Template.bind({});
AugmentedTooltip.args = {
  dataFor: 'augmented-tooltip',
  basicAumented: true,
  children1: <span>🔍</span>,
  children: 'This is an augmented tooltip.',
  setHeight: false,
  icon: true,
  dataDelay: '0',
};

export const CustomTooltip = Template.bind({});
CustomTooltip.args = {
  dataFor: 'custom-tooltip',
  infoTootlip: false,
  basicAumented: true,
  children1: <span>🔍</span>,
  children: 'This is a custom tooltip.',
  setHeight: false,
  icon: true,
  dataDelay: '0',
};

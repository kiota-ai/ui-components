// PieChart.stories.tsx

import { Meta, Story } from '@storybook/react';
import { PieChart, PieChartProps } from './PieChart';

export default {
  title: 'PieChart',
  component: PieChart,
} as Meta;

const Template: Story<PieChartProps> = (args) => 
  <div style={{ height: '500px' }}>
    <PieChart {...args} />;
  </div>

export const BasicPieChart = Template.bind({});
BasicPieChart.args = {
  data: [
    { id: 'slice1', label: 'Slice 1', value: 30 },
    { id: 'slice2', label: 'Slice 2', value: 40 },
  ],
  legend: true,
  linkLabels: true,
};

export const PieChartWithoutLegend = Template.bind({});
PieChartWithoutLegend.args = {
  data: [
    { id: 'slice1', label: 'Slice 1', value: 30 },
    { id: 'slice2', label: 'Slice 2', value: 40 },
  ],
  legend: false,
  linkLabels: true,
};

export const PieChartWithoutLinkLabels = Template.bind({});
PieChartWithoutLinkLabels.args = {
  data: [
    { id: 'slice1', label: 'Slice 1', value: 30 },
    { id: 'slice2', label: 'Slice 2', value: 40 },
  ],
  legend: true,
  linkLabels: false,
};

export const CustomStyledPieChart = Template.bind({});
CustomStyledPieChart.args = {
  data: [
    { id: 'slice1', label: 'Slice 1', value: 30 },
    { id: 'slice2', label: 'Slice 2', value: 40 },
  ],
  legend: true,
  linkLabels: true,
};


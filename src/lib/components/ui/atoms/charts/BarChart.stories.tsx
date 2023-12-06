// BarChart.stories.tsx

import { Meta, Story } from '@storybook/react';
import { BarChart, BarChartProps } from './BarChart';

export default {
  title: 'BarChart',
  component: BarChart,
} as Meta;

const Template: Story<BarChartProps> = (args) => (
  <div style={{ height: '500px' }}>
    <BarChart {...args} />
  </div>
);

export const GroupedBarChart = Template.bind({});
GroupedBarChart.args = {
  data: [
    { indexed: 'A', key1: 10, key2: 20 },
    { indexed: 'B', key1: 15, key2: 25 },
    // Add more data as needed
  ],
  keys: ['key1', 'key2'],
  axisRotation: 0,
  groupMode: 'grouped',
  legends: [
    {
      dataFrom: 'keys',
      anchor: 'top-left',
      direction: 'row',
      justify: false,
      translateX: 0,
      translateY: -30,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      symbolSize: 12,
    },
  ],
  borderRadius: 3,
  margin: { top: 40, right: 100, bottom: 60, left: 140 },
};

export const StackedBarChart = Template.bind({});
StackedBarChart.args = {
  data: [
    { indexed: 'A', key1: 10, key2: 20 },
    { indexed: 'B', key1: 15, key2: 25 },
    // Add more data as needed
  ],
  keys: ['key1', 'key2'],
  axisRotation: 0,
  groupMode: 'stacked',
  legends: [
    {
      dataFrom: 'keys',
      anchor: 'top-left',
      direction: 'row',
      justify: false,
      translateX: 0,
      translateY: -30,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      symbolSize: 12,
    },
  ],
  borderRadius: 3,
  margin: { top: 40, right: 100, bottom: 60, left: 140 },
};

export const RotatedBarChart = Template.bind({});
RotatedBarChart.args = {
  data: [
    { indexed: 'A', key1: 10, key2: 20 },
    { indexed: 'B', key1: 15, key2: 25 },
    // Add more data as needed
  ],
  keys: ['key1', 'key2'],
  axisRotation: 45,
  groupMode: 'grouped',
  legends: [
    {
      dataFrom: 'keys',
      anchor: 'top-left',
      direction: 'row',
      justify: false,
      translateX: 0,
      translateY: -30,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      symbolSize: 12,
    },
  ],
  borderRadius: 3,
  margin: { top: 40, right: 100, bottom: 60, left: 140 },
};

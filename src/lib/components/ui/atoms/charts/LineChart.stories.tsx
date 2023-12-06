// LineChart.stories.tsx

import { Meta, Story } from '@storybook/react';
import { LineChart, LineChartProps } from './LineChart';

export default {
  title: 'LineChart',
  component: LineChart,
} as Meta;

const Template: Story<LineChartProps> = (args) => 
  <div style={{ height: '500px' }}>
    <LineChart {...args} />;
  </div>

export const BasicLineChart = Template.bind({});
BasicLineChart.args = {
  marginRight: 0,
  marginLeft: 30,
  sample: false,
  data: [
    {
      id: 'series1',
      data: [
        { x: 'A', y: 10 },
        { x: 'B', y: 15 },
      ],
    },
  ],
};



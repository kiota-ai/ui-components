// RadarChart.stories.tsx

import { Meta, Story } from '@storybook/react';
import { RadarChart, RadarChartProps } from './RadarChart';

export default {
  title: 'RadarChart',
  component: RadarChart,
} as Meta;

const Template: Story<RadarChartProps> = (args) => 
  <div style={{ height: '500px' }}>
    <RadarChart {...args} />;
  </div>

export const BasicRadarChart = Template.bind({});
BasicRadarChart.args = {
  data: [
    { id: 'Category 1', metric1: 80, metric2: 50, metric3: 30, metric4: 60 },
    { id: 'Category 2', metric1: 60, metric2: 80, metric3: 40, metric4: 70 },
  ],
  legend: true,
  gridLabelOffset: 20,
  gridShape: 'circular',
  maxValue: 100,
};

export const RadarChartWithoutLegend = Template.bind({});
RadarChartWithoutLegend.args = {
  data: [
    { id: 'Category 1', metric1: 80, metric2: 50, metric3: 30, metric4: 60 },
    { id: 'Category 2', metric1: 60, metric2: 80, metric3: 40, metric4: 70 },
  ],
  legend: false,
  gridLabelOffset: 20,
  gridShape: 'circular',
  maxValue: 100,
};

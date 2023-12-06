// GeoChart.stories.tsx

import { Meta, Story } from '@storybook/react';
import { GeoChart, GeoChartProps } from './GeoChart';

export default {
  title: 'GeoChart',
  component: GeoChart,
} as Meta;

const Template: Story<GeoChartProps> = (args) => 
  <div style={{ height: '500px' }}>
    <GeoChart {...args} />;
  </div>


export const BasicGeoChart = Template.bind({});
BasicGeoChart.args = {
  data: [
    { id: 'USA', value: 500000 },
    { id: 'CAN', value: 300000 },
  ],
};

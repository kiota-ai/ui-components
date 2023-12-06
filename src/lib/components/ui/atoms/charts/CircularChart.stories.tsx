import { Meta, Story } from '@storybook/react';
import { CircularChard, CircularChardProps } from './CircularChart';

export default {
  title: 'CircularChart',
  component: CircularChard,
} as Meta;

const Template: Story<CircularChardProps> = (args) => (
  <div style={{ height: '500px',width:'500px' }}>
    <CircularChard {...args} />
  </div>
);

export const BasicCircularChart = Template.bind({});
BasicCircularChart.args = {
  width: '30',
  value: '25.30',
  valueText: 'SI',
  title: 'Basic Circular Chart',
  fontSize: '4xl',
  monoColor: false,
  maxValue: 100,
  tooltip: 'This is a tooltip for the circular chart.',
};

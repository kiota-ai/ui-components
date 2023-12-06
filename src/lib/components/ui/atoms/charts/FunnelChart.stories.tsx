// FunnelChart.stories.tsx

import { Meta, Story } from '@storybook/react';
import { FunnelChart, FunnelProps } from './FunnelChart';

export default {
  title: 'FunnelChart',
  component: FunnelChart,
} as Meta;

const Template: Story<FunnelProps> = (args) => (
  <div style={{ height: '500px' }}>
    <FunnelChart {...args} />
  </div>
);

export const BasicFunnelChart = Template.bind({});
BasicFunnelChart.args = {
  data: [
    { id: 'Step 1', value: 100 },
    { id: 'Step 2', value: 75 },
    { id: 'Step 3', value: 50 },
    { id: 'Step 4', value: 25 },
  ],
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
};


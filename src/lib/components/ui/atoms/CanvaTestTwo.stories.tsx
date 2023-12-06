// CanvaTestTwo.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CanvaTestTwo, CanvaTestTwoProps } from './CanvaTestTwo';

export default {
  title: 'CanvaTestTwo',
  component: CanvaTestTwo,
} as Meta;

const Template: Story<CanvaTestTwoProps> = (args) => <CanvaTestTwo {...args} />;

export const Default = Template.bind({});
Default.args = {
  canvasRef: React.createRef(), 
  content: '{"paths":[]}',
};


import { Meta, Story } from '@storybook/react';
import { Spinner, SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: '#4d70b3',
  loading: true,
};

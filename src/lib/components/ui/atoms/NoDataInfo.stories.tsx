// NoDataInfo.stories.tsx
import { Meta, Story } from '@storybook/react';
import { NoDataInfo, NoDataInfoProps } from './NoDataInfo';

export default {
  title: 'NoDataInfo',
  component: NoDataInfo,
} as Meta;

const Template: Story<NoDataInfoProps> = (args) => <NoDataInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'No Data Available',
  textOne: 'There is no data to display.',
  textTwo: 'Please check again later.',

};

export const WithHoverText = Template.bind({});
WithHoverText.args = {
  title: 'No Data Available',
  textOne: 'There is no data to display.',
  textTwo: 'Please check again later.',
  showExtraTextOnHover: true,
};


import { Meta, Story } from '@storybook/react';
import { CoverBackground, CoverBackgroundProps } from './CoverBackground';

export default {
  title: 'CoverBackground',
  component: CoverBackground,
} as Meta;

const Template: Story<CoverBackgroundProps> = (args) => <CoverBackground {...args} />;

export const Default = Template.bind({});
Default.args = {
  link: false,
  linkUrl: 'https://www.example.com',
  linkPreview: 'Example Link',
  backgroundClass: 'bg-main',
  image: 'https://kiota-public-resources.s3.amazonaws.com/logo_000.svg',
  backgroundClassLink: 'bg-white text-main hover:text-link-hover',
  colorClassLine: 'text-white',
};

export const WithLink = Template.bind({});
WithLink.args = {
  link: true,
  linkUrl: 'https://www.example.com',
  linkPreview: 'Example Link',
  image: 'https://kiota-public-resources.s3.amazonaws.com/logo_000.svg',
  backgroundClass: 'bg-main',
  backgroundClassLink: 'bg-white text-main hover:text-link-hover',
  colorClassLine: 'text-white',
};

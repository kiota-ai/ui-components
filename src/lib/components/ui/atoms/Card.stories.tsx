// Card.stories.tsx
import { Meta, Story } from '@storybook/react';
import { Card, CardProps } from './Card';

export default {
  title: 'Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Card Title',
  children: 'Card Content',
  padding: '6',
  movilePadding: '3',
  marginX: '4',
  movileMarginX: '2',
  marginY: '4',
  width: '96',
  rounded: 'lg',
  startupsList: false,
  clickable: false,
};

export const ClickableCard = Template.bind({});
ClickableCard.args = {
  title: 'Clickable Card',
  children: 'Click me!',
  padding: '6',
  movilePadding: '3',
  marginX: '4',
  movileMarginX: '2',
  marginY: '4',
  width: '96',
  rounded: 'lg',
  startupsList: false,
  clickable: true,
  containerClassName:'bg-main text-white',
  onClick: () => alert('Card clicked!'),
};

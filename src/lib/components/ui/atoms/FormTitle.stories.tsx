// FormTitle.stories.tsx
import { Meta, Story } from '@storybook/react';
import { FormTitle, FormProps } from './FormTitle';

export default {
  title: 'FormTitle',
  component: FormTitle,
} as Meta;

const Template: Story<FormProps> = (args) => <FormTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  formTitle: 'Your Form Title',
  formSubtitle: 'Subtitle or additional information',
  titleClass: 'text-3xl font-bold', // Add your desired title class
};

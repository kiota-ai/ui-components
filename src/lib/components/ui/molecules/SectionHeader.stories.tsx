// SectionHeader.stories.tsx

import { Meta, Story } from '@storybook/react';
import { SectionHeader, SectionHeaderProps } from './SectionHeader';

export default {
  title: 'SectionHeader',
  component: SectionHeader,
} as Meta;

const Template: Story<SectionHeaderProps> = (args) => <SectionHeader {...args} />;

export const BasicSectionHeader = Template.bind({});
BasicSectionHeader.args = {
  sectionTitles: ['Section 1', 'Section 2', 'Section 3'],
  sectionKeys: ['section1', 'section2', 'section3'],
  setShowFilters: () => {},
  setShowAdd: () => {},
  setShowUpload: () => {},
  section: 'section1',
  sort: 'date',
  setSort: () => {},
};

export const SectionHeaderWithActions = Template.bind({});
SectionHeaderWithActions.args = {
  ...BasicSectionHeader.args,
  showFilters: true,
  showAdd: true,
  showSort: true,
  showUpload: true,
};

export const SectionHeaderWithLongTitles = Template.bind({});
SectionHeaderWithLongTitles.args = {
  ...BasicSectionHeader.args,
  sectionTitles: ['Long Section Title 1', 'Long Section Title 2', 'Long Section Title 3'],
};


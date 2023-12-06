// Pagination.stories.tsx

import { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const [perPage, setPerPage] = useState(args.perPage);

  return <Pagination {...args} currentPage={currentPage} setCurrentPage={setCurrentPage} perPage={perPage} setPerPage={setPerPage} />;
};

export const Default = Template.bind({});
Default.args = {
  showRowsPerPage: false,
  currentPage: 0,
  setCurrentPage: () => {},
  perPage: 10,
  setPerPage: () => {},
  pages: 5,
  maxPaginationNumbers: 5,
};

export const WithRowsPerPage = Template.bind({});
WithRowsPerPage.args = {
  ...Default.args,
  showRowsPerPage: true,
};

export const WithCustomPagination = Template.bind({});
WithCustomPagination.args = {
  ...Default.args,
  maxPaginationNumbers: 7,
};

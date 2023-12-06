/* eslint-disable @typescript-eslint/no-explicit-any */
// DataGrid.stories.tsx

import { Meta, Story } from '@storybook/react';
import { DataGrid, DataGridProps } from './DataGrid';

export default {
  title: 'DataGrid',
  component: DataGrid,
} as Meta;

const Template: Story<DataGridProps> = (args) => <DataGrid {...args} />;

export const BasicDataGrid = Template.bind({});
BasicDataGrid.args = {
  headers: [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ],
  data: [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  ],
  actions: [
    {
      id: 'edit',
      buttonProps: {
        text: 'Edit',
      },
      onClick: (row:any) => console.log('Edit:', row),
    },
    {
      id: 'delete',
      buttonProps: {
        text: 'Delete',
      },
      onClick: (row:any) => console.log('Delete:', row),
    },
  ],
};


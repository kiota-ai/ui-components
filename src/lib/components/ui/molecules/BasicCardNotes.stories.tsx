// BasicCardNotes.stories.tsx

import { Meta, Story } from '@storybook/react';
import { BasicCardNotes, BasicCardNotesProps } from './BasicCardNotes';

export default {
  title: 'BasicCardNotes',
  component: BasicCardNotes,
} as Meta;

const Template: Story<BasicCardNotesProps> = (args) => <BasicCardNotes {...args} />;

export const TextNote = Template.bind({});
TextNote.args = {
  note: {
    _id: '1',
    type: 'text',
    title: 'Text Note',
    content: '<p>This is a sample text content.</p>',
    createdAt: '2023-01-01',
    user: { name: 'John Doe' },
  },
  deleteNote: (id: string) => console.log(`Deleting note with ID: ${id}`),
  getNote: (id: string) => console.log(`Fetching note with ID: ${id}`),
};

export const AudioNote = Template.bind({});
AudioNote.args = {
  note: {
    _id: '2',
    type: 'audio',
    title: 'Audio Note',
    createdAt: '2023-01-02',
    user: { name: 'Jane Doe' },
  },
  deleteNote: (id: string) => console.log(`Deleting note with ID: ${id}`),
  getNote: (id: string) => console.log(`Fetching note with ID: ${id}`),
};

export const DrawNote = Template.bind({});
DrawNote.args = {
  note: {
    _id: '3',
    type: 'draw',
    title: 'Draw Note',
    createdAt: '2023-01-03',
    user: { name: 'Alice' },
  },
  deleteNote: (id: string) => console.log(`Deleting note with ID: ${id}`),
  getNote: (id: string) => console.log(`Fetching note with ID: ${id}`),
};


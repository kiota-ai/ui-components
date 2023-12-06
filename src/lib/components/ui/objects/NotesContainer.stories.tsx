/* eslint-disable @typescript-eslint/no-explicit-any */
// NotesContainer.stories.tsx

import { Meta, Story } from '@storybook/react';
import { NotesContainer, NoteListProps } from './NotesContainer';

export default {
  title: 'NotesContainer',
  component: NotesContainer,
} as Meta;

const Template: Story<NoteListProps> = (args) => <NotesContainer {...args} />;

export const DefaultNotesContainer = Template.bind({});
DefaultNotesContainer.args = {
  editable: true,
  notes: [
    { id: 1, title: 'Note 1', content: 'Lorem ipsum dolor sit amet.' },
    { id: 2, title: 'Note 2', content: 'Consectetur adipiscing elit.' },
  ],
  createNote: (title:any, type:any, content:any) => console.log('Create Note:', { title, type, content }),
  deleteNote: (id: any) => console.log('Delete Note:', id),
  getNote: (id: any) => console.log('Get Note:', id),
  selectedNote: null,
  setSelectedNote: (note: any) => console.log('Set Selected Note:', note),
  updateNote: (title: any, content: any) => console.log('Update Note:', { title, content }),
  listTitle: 'My Notes',
  onClose: () => console.log('Close Notes Container'),
};

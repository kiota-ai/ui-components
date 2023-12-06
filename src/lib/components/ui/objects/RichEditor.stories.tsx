// RichEditor.stories.tsx

import { Meta, Story } from '@storybook/react';
import { RichEditor, RichEditorProps } from './RichEditor';

export default {
  title: 'RichEditor',
  component: RichEditor,
} as Meta;

const Template: Story<RichEditorProps> = (args) => <RichEditor {...args} />;

export const DefaultRichEditor = Template.bind({});
DefaultRichEditor.args = {
  label: 'Rich Text Editor',
  id: 'rich-editor',
  value: '<p>Hello, World!</p>',
  onChange: (source) => console.log('Rich Editor Content:', source),
  placeholder: 'Type something...',
  disabled: false,
  reference: null,
  error: null,
  className: 'rich-editor',
  toolbarClassName: 'rich-editor-toolbar',
};

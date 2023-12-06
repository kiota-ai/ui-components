/* eslint-disable @typescript-eslint/no-explicit-any */
// InputFile.stories.tsx

import { Meta, Story } from '@storybook/react';
import { InputFile, FileInputProps } from './InputFile';

export default {
  title: 'InputFile',
  component: InputFile,
} as Meta;

const Template: Story<FileInputProps> = (args) => <InputFile {...args} />;

export const SingleFileInput = Template.bind({});
SingleFileInput.args = {
  label: 'Select a file',
  placeholder: 'Drop files here or click to browse',
  selectedFile: null,
  setSelectedFile: (file:any) => console.log('Selected file:', file),
  id: 'singleFileInput',
  accept: '.pdf, .doc, .docx, .json, .ppt, .pptx, .xls, .xlsx, video/mp4, video/avi, video/mov',
  fileError: '',
  className: '',
  height: '',
  padding: '2rem',
  multiple: false,
};

export const MultipleFileInput = Template.bind({});
MultipleFileInput.args = {
  label: 'Select multiple files',
  placeholder: 'Drop files here or click to browse',
  selectedFile: null,
  setSelectedFile: (files:any) => console.log('Selected files:', files),
  id: 'multipleFileInput',
  accept: '.pdf, .doc, .docx, .json, .ppt, .pptx, .xls, .xlsx, video/mp4, video/avi, video/mov',
  fileError: '',
  className: '',
  height: '',
  padding: '2rem',
  multiple: true,
};

export const FileWithError = Template.bind({});
FileWithError.args = {
  label: 'Select a file',
  placeholder: 'Drop files here or click to browse',
  selectedFile: null,
  setSelectedFile: (file:any) => console.log('Selected file:', file),
  id: 'fileWithError',
  accept: '.pdf, .doc, .docx, .json, .ppt, .pptx, .xls, .xlsx, video/mp4, video/avi, video/mov',
  fileError: 'File size exceeds the limit',
  className: '',
  height: '',
  padding: '2rem',
  multiple: false,
};


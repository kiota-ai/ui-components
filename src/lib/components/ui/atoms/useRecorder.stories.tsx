/* eslint-disable @typescript-eslint/no-explicit-any */
// UseRecorder.stories.tsx

import { Meta, Story } from '@storybook/react';
import  useRecorder  from './useRecorder';

export default {
  title: 'useRecorder',
  argTypes: {
    isRecording: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: Story<any> = () => {
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>Audio URL: {audioURL}</p>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>Is Recording: {isRecording ? 'Yes' : 'No'}</p>
      <button
        style={{
          padding: '10px',
          fontSize: '1em',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
        }}
        onClick={startRecording}
      >
        Start Recording
      </button>
      <button
        style={{
          padding: '10px',
          fontSize: '1em',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={stopRecording}
      >
        Stop Recording
      </button>
    </div>
  );
};

export const BasicUseRecorder = Template.bind({});
BasicUseRecorder.args = {};

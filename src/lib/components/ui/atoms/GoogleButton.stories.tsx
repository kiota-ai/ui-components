// GoogleButton.stories.tsx
import { Meta, Story } from '@storybook/react';
import { GoogleButton, GoogleLoginProps } from './GoogleButton';

export default {
  title: 'GoogleButton',
  component: GoogleButton,
} as Meta;

const Template: Story<GoogleLoginProps> = (args) => <GoogleButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  clientId: 'your-google-client-id',
  onSuccess: () => {
    console.log('Google login success');
  },
  onFailure: (error) => {
    console.error('Google login failure', error);
  },
  text: 'Sign in with Google',
  loadingGoogleLogin: false,
  disabled: false,
};

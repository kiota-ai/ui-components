
import { TextInput } from '../lib/components/Input';

export default {
  component: TextInput,
  title: 'TextInput',
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'OnChangeValue' } },
};

export const Default = {
  args: {
    value: 'Value'
  },
};

export const Placeholder = {
  args: {
    value: '',
    placeholder: 'Placeholder'
  }
}

export const Label = {
  args: {
    ...Default.args,
    placeholder: 'Placeholder',
    label: 'Label'
  }
}



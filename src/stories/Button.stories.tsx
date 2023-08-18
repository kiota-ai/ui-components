
import { Button } from '../lib/components/ui/atoms/Button';

export default {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'onClickValue' } },
};

export const Default = {
  args: {
    text: 'Button'
  },
};
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../../../../lib';

describe('Renders main Button correctly', async () => {
    it('Should render the Button correctly', async () => {
        const clickButton = vi.fn()
        render(<Button text="Button" onClick={clickButton}/>);
        const button = screen.queryByText('Button') as HTMLElement;
        fireEvent.click(button)
        expect(button).not.toBeNull();
        expect(clickButton).toHaveBeenCalledTimes(1)
    });
});
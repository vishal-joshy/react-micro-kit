import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, it } from 'vitest';

import { Button } from './Button';

it('renders button with text', () => {
  const { container } = render(<Button text={'Hello world!'} />);
  expect(container?.textContent).toBe('Hello world!');
});

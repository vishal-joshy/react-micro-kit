import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SampleComponent from './SampleComponent';

describe('App', () => {
  test('render sample component', () => {
    render(<SampleComponent />);
    const greeting = screen.getByText(/Hello world/i);
    expect(greeting).toBeInTheDocument();
  });
});

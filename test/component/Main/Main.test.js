import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from 'jest-dom';
import Main from '../../../src/component/Main';

expect.extend({ toBeInTheDocument, });

describe('<Main />', () => {
  afterEach(() => {
    cleanup();
  });

  test('text', () => {
    const { getByTestId, } = render(<Main />);
    expect(getByTestId('main_block')).toBeInTheDocument();
  });
});

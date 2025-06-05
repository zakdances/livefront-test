import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Detail from '../views/Detail';

describe('Detail', () => {
  it('renders Detail component without crashing', () => {
    render(
      <MemoryRouter>
        <Detail />
      </MemoryRouter>
    );
  });
});
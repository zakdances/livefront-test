import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import MainList from '../views/mainList';

const mockStore = configureStore([]);

describe('MainList', () => {
  it('renders headlines from store', () => {
    const store = mockStore({
      mainList: {
        items: [{ title: 'Headline 1' }, { title: 'Headline 2' }]
      }
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainList />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Headline 1')).toBeInTheDocument();
    expect(getByText('Headline 2')).toBeInTheDocument();
  });
});
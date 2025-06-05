import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import store from '../view model/store';

vi.mock('../view model/slices/mainList', () => ({
  addItem: (item: any) => ({ type: 'ADD_ITEM', payload: item }),
}));

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: [{ title: 'Test', abstract: 'Test abstract' }] }),
    })
  ) as any;
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('App', () => {
  it('fetches data and dispatches items', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
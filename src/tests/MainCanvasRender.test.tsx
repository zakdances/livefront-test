import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../view model/store';
import MainCanvas from '../views/mainCanvas';

describe('MainCanvas', () => {
    
    it('renders MainCanvas without crashing', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MainCanvas />
                </MemoryRouter>
            </Provider>
        );
    });
});
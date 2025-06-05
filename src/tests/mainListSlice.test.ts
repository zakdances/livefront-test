import { describe, it, expect } from 'vitest';
import reducer, { addItem } from '../view model/slices/mainList';

describe('mainListSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ items: [] });
  });

  it('should handle addItem', () => {
    const prevState = { items: [] };
    const action = addItem({ title: 'Test Item' });
    const nextState = reducer(prevState, action);
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].title).toBe('Test Item');
  });
});
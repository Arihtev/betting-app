import { renderHook, act } from '@testing-library/react';
import { useApi } from '../../src/hooks/useApi';
import { describe, it, expect, vi } from 'vitest';
import { afterEach } from 'node:test';
import { SelectionEnum } from '../../src/api/interfaces/bets';

const getMock = vi.fn();
const postMock = vi.fn();

vi.mock('../../src/hooks/useFetch', () => ({
  useFetch: vi.fn(() => ({
    get: (url: string) => getMock(url),
    post: (url: string, body?: unknown) => postMock(url, body),
    isLoading: false,
  })),
}));
describe('useApi', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should authenticate user and return response', async () => {
    const mockResponse = { data: { token: 'mocked_token' } };

    postMock.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useApi());

    const data = { username: 'user', password: 'pass' };

    await act(async () => {
      const response = await result.current.authenticate(data);
      expect(response).toEqual(mockResponse);
    });

    expect(postMock).toHaveBeenCalledWith('/auth', data);
  });

  it('should call get on /events', async () => {
    const { result } = renderHook(() => useApi());
    const mockResponse = { data: { events: ['event1', 'event2'] } };
    getMock.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      const response = await result.current.getEvents();
      expect(response).toEqual(mockResponse);
    });

    expect(getMock).toHaveBeenCalledWith('/events');
  });

  it('should get events and return response', async () => {
    const mockEvents = { data: { events: [] } };

    getMock.mockResolvedValueOnce(mockEvents);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      const response = await result.current.getEvents();
      expect(response).toEqual(mockEvents);
    });

    expect(getMock).toHaveBeenCalledWith('/events');
  });

  it('should create a bet and return response', async () => {
    const mockBetResponse = { data: { id: 1, amount: 10 } };

    postMock.mockResolvedValueOnce(mockBetResponse);

    const { result } = renderHook(() => useApi());

    const betData = { eventId: 1, selection: SelectionEnum.teamA, stake: 10 };

    await act(async () => {
      const response = await result.current.createBet(betData);
      expect(response).toEqual(mockBetResponse);
    });

    expect(postMock).toHaveBeenCalledWith('/bets', betData);
  });
});

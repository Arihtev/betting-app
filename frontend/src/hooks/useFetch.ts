/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export type ApiResponse<T> = { data: T | null; error: unknown | null };

export const useFetch = (displayError?: (error: unknown) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeRequest = useCallback(
    async <T = any, R = any>(
      method: string,
      url: string,
      body?: T,
      config?: InternalAxiosRequestConfig,
    ): Promise<ApiResponse<R>> => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          ...(token && { Authorization: `Bearer ${token}` }),
          'Content-Type': body ? 'application/json' : undefined,
        };

        const requestConfig: AxiosRequestConfig = {
          method,
          url,
          headers,
          ...(body && { data: JSON.stringify(body) }),
          ...config,
        };

        const response = await axiosInstance.request<R>(requestConfig);
        setIsLoading(false);

        return { data: response.data, error: null };
      } catch (e) {
        setIsLoading(false);
        if (displayError) {
          displayError(e);
        }
        return { data: null, error: e };
      }
    },
    [displayError],
  );

  const get = useCallback(
    <R = any>(
      url: string,
      config?: InternalAxiosRequestConfig,
    ): Promise<ApiResponse<R>> =>
      executeRequest<R>('get', url, undefined, config),
    [executeRequest],
  );

  const post = useCallback(
    <T = any, R = any>(
      url: string,
      body?: T,
      config?: InternalAxiosRequestConfig,
    ): Promise<ApiResponse<R>> =>
      executeRequest<T, R>('post', url, body, config),
    [executeRequest],
  );

  return {
    isLoading,
    get,
    post,
  };
};

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';
import Navbar from '../../src/components/Navbar';
import { useThemeContext } from '../../src/hooks/useTheme';
import { useUser } from '../../src/hooks/useUser';

vi.mock('../../src/hooks/useTheme');
vi.mock('../../src/hooks/useUser');

describe('Navbar', () => {
  let useThemeContextMock: Mock;
  let useUserMock: Mock;

  beforeEach(() => {
    useThemeContextMock = useThemeContext as Mock;
    useUserMock = useUser as Mock;
  });

  afterEach(() => {
    useThemeContextMock.mockClear();
  });

  it('renders the Navbar component', () => {
    useThemeContextMock.mockReturnValue({
      toggleTheme: vi.fn(),
      isDarkMode: false,
    });
    useUserMock.mockReturnValue({
      user: null,
      logout: vi.fn(),
    });

    render(<Navbar />);

    expect(screen.getByText('Betting Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('opens login modal when login button is clicked', () => {
    useThemeContextMock.mockReturnValue({
      toggleTheme: vi.fn(),
      isDarkMode: false,
    });
    useUserMock.mockReturnValue({
      user: null,
      logout: vi.fn(),
    });

    render(<Navbar />);

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays user information and logout button when user is logged in', () => {
    const mockLogout = vi.fn();
    useThemeContextMock.mockReturnValue({
      toggleTheme: vi.fn(),
      isDarkMode: false,
    });
    useUserMock.mockReturnValue({
      user: { username: 'testuser' },
      logout: mockLogout,
    });

    render(<Navbar />);

    expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
    expect(screen.getByTestId('LogoutIcon')).toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', () => {
    const mockLogout = vi.fn();
    useThemeContextMock.mockReturnValue({
      toggleTheme: vi.fn(),
      isDarkMode: false,
    });
    useUserMock.mockReturnValue({
      user: { username: 'testuser' },
      logout: mockLogout,
    });

    render(<Navbar />);

    fireEvent.click(screen.getByTestId('LogoutIcon'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('toggles theme when theme button is clicked', () => {
    const mockToggleTheme = vi.fn();
    useThemeContextMock.mockReturnValue({
      toggleTheme: mockToggleTheme,
      isDarkMode: false,
    });
    useUserMock.mockReturnValue({
      user: null,
      logout: vi.fn(),
    });

    render(<Navbar />);

    fireEvent.click(screen.getByTestId('DarkModeIcon'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});

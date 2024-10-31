import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

import { ThemeContextProvider } from '../src/context/ThemeContext';
import { UserProvider } from '../src/context/UserContext';

describe('App Component', () => {
  const renderApp = () =>
    render(
      <UserProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </UserProvider>,
    );

  it('should render without crashing', () => {
    const { container } = renderApp();
    expect(container).toBeInTheDocument();
  });

  it('should render the Layout component', () => {
    const { getByTestId } = renderApp();
    expect(getByTestId('layout')).toBeInTheDocument();
  });
});

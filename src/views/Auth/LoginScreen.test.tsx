import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppProvider } from 'containers';
import md5 from 'md5';
import { authService } from 'services';
import { LoginScreen } from '.';

describe('LoginScreen', () => {
  it('should render with no error', async () => {
    render(<LoginScreen />, { wrapper: AppProvider });
    expect(screen.getByText('Hi, Welcome Back')).toBeInTheDocument();
  });

  it('should check form validator', async () => {
    render(<LoginScreen />, { wrapper: AppProvider });

    const response = { id: '1', username: 'username', accessToken: 'jwt' };
    jest.spyOn(authService, 'login').mockResolvedValueOnce(response);

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(authService.login).toHaveBeenCalledTimes(0);
    });
  });

  it('should call login', async () => {
    render(<LoginScreen />, { wrapper: AppProvider });

    const response = { id: '1', username: 'username', accessToken: 'jwt' };
    jest.spyOn(authService, 'login').mockResolvedValueOnce(response);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'username' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toBeCalledWith({ username: 'username', password: md5('password') });
    });
  });
});

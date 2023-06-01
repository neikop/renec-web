import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppProvider } from 'containers';
import md5 from 'md5';
import { authService } from 'services';
import { RegisterScreen } from '.';

describe('RegisterScreen', () => {
  it('should render with no error', async () => {
    render(<RegisterScreen />, { wrapper: AppProvider });
    expect(screen.getByText('Register Account')).toBeInTheDocument();
  });

  it('should check form validator', async () => {
    render(<RegisterScreen />, { wrapper: AppProvider });

    const response = { id: '1', username: 'username', accessToken: 'jwt' };
    jest.spyOn(authService, 'register').mockResolvedValueOnce(response);

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
      expect(authService.register).toHaveBeenCalledTimes(0);
    });
  });

  it('should check password matches', async () => {
    render(<RegisterScreen />, { wrapper: AppProvider });

    const response = { id: '1', username: 'username', accessToken: 'jwt' };
    jest.spyOn(authService, 'register').mockResolvedValueOnce(response);

    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: '2' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Confirm password does not match')).toBeInTheDocument();
      expect(authService.register).toHaveBeenCalledTimes(0);
    });
  });

  it('should call register', async () => {
    render(<RegisterScreen />, { wrapper: AppProvider });

    const response = { id: '1', username: 'username', accessToken: 'jwt' };
    jest.spyOn(authService, 'register').mockResolvedValueOnce(response);

    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'username' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(authService.register).toBeCalledWith({
        username: 'username',
        password: md5('password'),
        confirmPassword: '',
      });
    });
  });
});

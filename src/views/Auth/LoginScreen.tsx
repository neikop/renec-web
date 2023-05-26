import { LoadingButton } from '@mui/lab';
import { Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { TextFieldPassword } from 'components/common';
import { default as md5 } from 'md5';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from 'reducers/profileSlice';
import { authRoute } from 'routes';
import { authService } from 'services';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<LoginBody>();

  const { mutate: login, isLoading } = useMutation(authService.login, {
    onSuccess: ({ accessToken, ...info }) => {
      enqueueSnackbar('Login successfully');
      dispatch(
        signIn({
          ...info,
          accessToken,
        }),
      );
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      login({
        ...values,
        password: md5(values.password),
      });
    })();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClickSubmit();
    }
  };

  return (
    <Container maxWidth='sm'>
      <Paper className='space-y-6 p-6 md:p-10'>
        <Typography variant='h3' color='primary' className='-mb-6 text-center'>
          Sign In
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='username'
              defaultValue=''
              control={control}
              rules={{
                required: 'Username is required',
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Username' error={!!error} helperText={error?.message} />
              )}
            />{' '}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='password'
              defaultValue=''
              control={control}
              rules={{
                required: 'Password is required',
              }}
              render={({ field, fieldState: { error } }) => (
                <TextFieldPassword
                  {...field}
                  fullWidth
                  label='Password'
                  onKeyDown={handleKeyDown}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <LoadingButton fullWidth size='large' variant='contained' loading={isLoading} onClick={handleClickSubmit}>
          Login
        </LoadingButton>

        <div className='flex justify-center gap-2'>
          Don't have an account?
          <Link to={authRoute.register.url} className='font-bold text-primary-main hover:text-primary-dark'>
            Register
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default LoginScreen;

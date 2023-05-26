import { LoadingButton } from '@mui/lab';
import { Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { TextFieldPassword } from 'components/common';
import { default as md5 } from 'md5';
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
      dispatch(signIn({ ...info, accessToken }));
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
        <div className='space-y-3'>
          <div className='mb-6 flex items-center justify-center gap-3'>
            <img src={require('assets/icons/Muragi.svg').default} />
            <Typography variant='h4' color='primary'>
              MuiTube
            </Typography>
          </div>
          <Typography variant='h4' className='text-center'>
            Hi, Welcome Back
          </Typography>
          <Typography color='textSecondary' className='text-center'>
            Enter your credentials to continue
          </Typography>
        </div>

        <Grid container spacing={3}>
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
            />
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
          Sign In
        </LoadingButton>
        <Divider />

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

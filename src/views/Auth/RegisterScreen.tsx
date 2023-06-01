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

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch } = useForm<RegisterBody>();

  const { mutate: register, isLoading } = useMutation(authService.register, {
    onSuccess: ({ accessToken, ...info }) => {
      dispatch(signIn({ ...info, accessToken }));
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      register({
        ...values,
        password: md5(values.password),
        confirmPassword: '',
      });
    })();
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
            Register Account
          </Typography>
          <Typography color='textSecondary' className='text-center'>
            Sign up with Username & Password
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
                <TextField {...field} fullWidth required label='Username' error={!!error} helperText={error?.message} />
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
                  required
                  label='Password'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='confirmPassword'
              defaultValue=''
              control={control}
              rules={{
                required: 'Confirm password is required',
                validate: {
                  match: (value) => {
                    if (value === watch('password')) {
                      return true;
                    }
                    return 'Confirm password does not match';
                  },
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextFieldPassword
                  {...field}
                  fullWidth
                  required
                  label='Confirm Password'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <div className='flex justify-center'>
          <LoadingButton fullWidth variant='contained' size='large' loading={isLoading} onClick={handleClickSubmit}>
            Sign Up
          </LoadingButton>
        </div>
        <Divider />

        <div className='flex justify-center gap-2'>
          Already have an account?
          <Link to={authRoute.login.url} className='font-bold text-primary-main hover:text-primary-dark'>
            Login
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default RegisterScreen;

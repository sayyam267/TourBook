import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { gapi } from 'gapi-script';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

// const responseGoogle = (response) => {
//   console.log(response.profileObj);
// };
const ClientId = '1014899495356-umrm8imq4j77r39dg3em4vtns4ugjtvc.apps.googleusercontent.com';

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [gloading, setGloading] = useState(false);

  const [glogin, setGlogin] = useState({ isError: false, error: '' });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleFailureLogin = (response) => {
    console.log('Login Failed', response);
    if (isMountedRef.current) {
      setError('afterSubmit', response);
    }
  };

  const handleSuccessLogin = async (response) => {
    await axios
      .post('http://tourbook-backend.herokuapp.com/auth/google/createuser', {
        fname: response.profileObj.givenName,
        lname: response.profileObj.familyName,
        email: response.profileObj.email,
        profilePicture: response.profileObj.imageUrl,
      })
      .catch((e) => {
        console.log(e.message);
        console.log('hello');
        const updatedError = { isError: true, error: e.message };
        if (isMountedRef.current) {
          setGlogin((glogin) => ({
            ...glogin,
            ...updatedError,
          }));
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.data.role, res.data.data.profilePicture, res.data.data.token);
        window.localStorage.setItem('accessToken', res.data.data.token);
        localStorage.setItem('role', res.data.data.role);
        localStorage.setItem('pic', res.data.data.profilePicture);
        localStorage.setItem('balance', 0);
        localStorage.setItem('name', res.data.data.name);
        navigate(PATH_DASHBOARD.general.app, { replace: true });
      });
  };

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  useEffect(() => {
    //   const response = axios
    //     .get("http://tourbook-backend.herokuapp.com/auth/google")
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((e) => console.log(e));
    function start() {
      gapi.client.init({
        clientId: ClientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          {!!glogin.isError && <Alert severity="error">{glogin.error}</Alert>}

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RHFCheckbox name="remember" label="Remember me" />
          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Forgot password?
          </Link>
        </Stack>

        <Stack spacing={3}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Login
          </LoadingButton>
          <GoogleLogin
            // redirectUri="http://tourbook-backend.herokuapp.com/auth/google"
            onSuccess={handleSuccessLogin}
            onFailure={handleFailureLogin}
            cookiePolicy={'single_host_origin'}
            buttonText="Sign in with Google"
            style={{ textAlign: 'center' }}
            clientId={ClientId}
            // render={renderProps => (
            //   <Button onClick={renderProps.onClick} style={{textAlign: "center"}}>This is my custom Google button</Button>
            // )}
          />
        </Stack>
      </FormProvider>
      {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={GoogleLogin} loading={gloading}>
        Google Login
      </LoadingButton> */}
    </>
  );
}

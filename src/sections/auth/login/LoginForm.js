import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { gapi } from 'gapi-script';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
import FormInputField from './FormInputField';

// ----------------------------------------------------------------------

const ClientId = '1014899495356-umrm8imq4j77r39dg3em4vtns4ugjtvc.apps.googleusercontent.com';

export default function LoginForm() {
  const { login } = useAuth();
  const initialvalues = {
    email: '',
    password: '',
  };
  const validationschema = Yup.object().shape({
    email: Yup.string().email('Email must be valid').required('Email is Required'),
    password: Yup.string().min(8, 'Password must be atleast 8 characters').required('Password is required'),
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data.email, data.password);
      enqueueSnackbar('Login success!');
    } catch (e) {
      formik.setErrors(e);
      formik.setStatus(e?.message);
    }
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: validationschema,
    onSubmit,
  });

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [glogin, setGlogin] = useState({ isError: false, error: '' });

  const handleFailureLogin = (response) => {
    // console.log('Login Failed', response);
    formik.setStatus(response?.error);
    formik.setErrors(response);
  };

  const handleSuccessLogin = async (response) => {
    await axios
      .post(process.env.REACT_APP_GOOGLECREATE, {
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

        enqueueSnackbar('Login success!');
        navigate(PATH_DASHBOARD.general.app, { replace: true });
      });
  };

  useEffect(() => {
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
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <Stack spacing={3}>
            {formik?.status && <Alert severity="error">{formik.status}</Alert>}
            {!!glogin.isError && <Alert severity="error">{glogin.error}</Alert>}
            <FormInputField name="email" label="Enter Email" required />
            <FormInputField
              required
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                shrink: true,
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
            <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={formik.isSubmitting}>
            Login
          </LoadingButton>
        </FormikProvider>
      </form>
      <Stack spacing={3} pt={2}>
        <GoogleLogin
          onSuccess={handleSuccessLogin}
          onFailure={handleFailureLogin}
          cookiePolicy={'single_host_origin'}
          buttonText="Sign in with Google"
          style={{ textAlign: 'center' }}
          clientId={ClientId}
        />
      </Stack>
    </>
  );
}

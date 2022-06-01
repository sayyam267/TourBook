import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link as RouterLink } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();
  const clientId ="http://828926823463-05j51oo8povh205mrcu8eo3m0qbk2eob.apps.googleusercontent.com/";

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const [gloading,setGloading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


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

  const handleSuccess = (res) =>{
    console.log("success");
    console.log(res);

    
  }

  const handleFailure = (res) =>{
    console.log("Fail");
    console.log(res);
  }

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
  // const GoogleLogin = () => {
  //   window.open("http://tourbook-backend.herokuapp.com/auth/google", "_self")
  //   setGloading(true);
  //   axios.get("http://tourbook-backend.herokuapp.com/auth/google").then(res =>{
  //     console.log(res);
  //     setGloading(true);
  //   }).catch((err) => { console.log(err); setGloading(false); })
  // }

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>

      

      <GoogleLogin 
      clientId="828926823463-05j51oo8povh205mrcu8eo3m0qbk2eob.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      />
    </FormProvider>
    {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={GoogleLogin} loading={gloading}>
        Google Login
      </LoadingButton> */}
      </>
  );
}

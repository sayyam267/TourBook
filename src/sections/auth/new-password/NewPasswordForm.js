import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState } from 'react';
// form
import { FormikProvider, useFormik } from 'formik';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// @mui
import { useSnackbar } from 'notistack';
import { Stack, InputAdornment, IconButton, Alert, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormInputField from '../login/FormInputField';

// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
// import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

NewPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function NewPasswordForm({ onSent, onGetEmail }) {
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const NewPasswordSchema = Yup.object().shape({
  //     password: Yup.string().required('Password is required').min(8),
  //     confirmPassword: Yup.string().when('password', (password, field) =>
  //       password ? field.required().oneOf([Yup.ref('password')]) : field
  //     ),
  //   });
  const initialvalues = {
    password: '',
    confirmPassword: '',
  };
  const validationschema = Yup.object().shape({
    password: Yup.string().min(8, 'Password must be atleast 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .min(8, 'Password must be atleast 8 characters')
      .required('Password is required'),
  });
  //   const methods = useForm({
  //     resolver: yupResolver(NewPasswordSchema),
  //     defaultValues: { password: 'pass1234', confirmPassword: 'pass1234' },
  //   });

  //   const {
  //     reset,
  //     setError,
  //     handleSubmit,
  //     formState: { errors, isSubmitting },
  //   } = methods;
  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // if (isMountedRef.current && data.password === data.confirmPassword) {
      const response = await axios
        .put('http://tourbook-backend.herokuapp.com/user/update/password', {
          email: localStorage.getItem('verifyEmail'),
          password: data.password,
        })
        .then((res) => {
          enqueueSnackbar('Password Updated!');
          onSent();
          onGetEmail(data.email);
          //   enqueueSnackbar("Password Updated!")
          //   console.log(res);
          localStorage.removeItem('verifyEmail');
          localStorage.removeItem('code');
        });
    } catch (error) {
      console.error(error);
      formik.setErrors(error);
      formik.setStatus(error?.message);
      // reset();
      // if (isMountedRef.current) {
      //   setError('afterSubmit', error);
      // }
    }
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: validationschema,
    onSubmit,
  });
  //   const onSubmit = async (data) => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       if (isMountedRef.current && data.password === data.confirmPassword) {
  //         const response = await axios
  //           .put('http://tourbook-backend.herokuapp.com/user/update/password', {
  //             email: localStorage.getItem('verifyEmail'),
  //             password: data.password,
  //           })
  //           .then((res) => {
  //             onSent();
  //             onGetEmail(data.email);
  //             console.log(res);
  //             localStorage.removeItem('verifyEmail');
  //             localStorage.removeItem('code');
  //           });
  //       } else {
  //         reset();
  //         console.error('password not matched');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       reset();
  //       if (isMountedRef.current) {
  //         setError('afterSubmit', error);
  //       }
  //     }
  //   };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <FormikProvider value={formik}>
          <FormInputField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormInputField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={formik.isSubmitting}>
            Reset Password
          </LoadingButton>
        </FormikProvider>
      </Stack>
    </form>
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    //   {formik.status && (
    //     <Box sx={{ mt: 3, mb: 3 }}>
    //       <Alert severity="error">{formik.status.message}</Alert>{' '}
    //     </Box>
    //   )}
    //   <Stack spacing={3}>
    //     <RHFTextField
    //       name="password"
    //       label="Password"
    //       type={showPassword ? 'text' : 'password'}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
    //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //     <RHFTextField name="confirmPassword" label="Confirm Password" type={'password'} />
    //     <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
    //       Reset Password
    //     </LoadingButton>
    //   </Stack>
    // </FormProvider>
  );
}

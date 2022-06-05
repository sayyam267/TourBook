import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { createMuiTheme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, Alert, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect } from '../../../components/hook-form';
import axios from '../../../utils/axios';
import "yup-phone";
import { PATH_AUTH } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const role = ['tourist','vendor'];
  // const gender = ['Male', 'Female'];
  const [cities, setCities] = useState();
  const { enqueueSnackbar } = useSnackbar();
  // const countries = ['India', 'Pakistan', 'China'];
  const isMountedRef = useIsMountedRef();
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required').min(3),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8),
    role: Yup.string().required('Role is required'),
    // cnic: Yup.string().required('Cnic is required'),
    phone: Yup.string().required('phoneno is required').phone(),
    // gender: Yup.string().required('gender is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('city is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'tourist',
    // genfer: '',
    phone: '',
    // cnic: '',
    country: 'Pakistan',
    city: 'Lahore',
  };

  useEffect(() => {
    axios.get('http://tourbook-backend.herokuapp.com/city/all').then((res) => {
      console.log(res);
      console.log(res.data.data);
      setCities(res.data.data);
      setValue('city', res.data.data[0]._id);
      if (cities && cities > 1) {
        console.log(cities);
      }
      console.log(cities);
    });
  }, {});

  const getCities = async () => {
    await axios.get('http://tourbook-backend.herokuapp.com/city/all').then((res) => {});
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;


  const values = watch();


  const onSubmit = async (data) => {
    try {
      console.log(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.city,
        data.country,
        data.role,
        data.gender,
        data.cnic
      );
      await register(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.city,
        data.country,
        data.role,
        data.gender,
        data.cnic
      );
      enqueueSnackbar('Sign Up success!');
      navigate(PATH_AUTH.login, { replace: true });
      
    } catch (error) {
      console.error(error);
      // reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const handlecity = (data) => {
    console.log(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.city,
      data.country,
      data.role,
      data.gender,
      data.cnic
    );
    console.log(cities);
    console.log('hi');
  };

  return (
    <>
      {/* <LoadingButton onClick={handlecity}>h</LoadingButton> */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First name*" />
            <RHFTextField name="lastName" label="Last name*" />
          </Stack>

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password*"
            helperText={values.password.length >= '8' ?"" :"password must be atleast 8 characters"}
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <></>
            <RHFSelect name="country" label="Country*" placeholder="Country">
                <option key={'Pakistan'} value={'Pakistan'}>
                  Pakistan
                </option>
            </RHFSelect>
            
            <RHFSelect name="city" label="City*" placeholder="City">
              {cities?.map(({_id,name}) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </RHFSelect>
            {/* </RHFSelect> */}
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFSelect name="role" label="Role*" placeholder="Role">
              {role.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </RHFSelect>

            

            
          </Stack>
          <RHFTextField name="phone" label="Phone Number*" />
          

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}

import * as Yup from 'yup';
import { useState,useEffect } from 'react';
// form
import { createMuiTheme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, Navigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect } from '../../../components/hook-form';
import axios from '../../../utils/axios';




// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const role = ["tourist","tourguide", "vendor"];
  const gender = ["Male", "Female"];
  const [cities,setCities] = useState();
  const countries = ["India","Pakistan","China"];
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    cnic: Yup.string().required('Cnic is required'),
    phone: Yup.string().required('phoneno is required'),
    gender: Yup.string().required('gender is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('city is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role:'',
    genfer:'',
    phone:'',
    cnic:'',
  };

  useEffect(() => {
    axios.get("http://tourbook-backend.herokuapp.com/city/all").then(res => {
      console.log(res);
      console.log(res.data.data);
      setCities(res.data.data);
      if(cities && cities > 1){
        console.log(cities);
      }
      console.log(cities);
      
    })
    
  },{});


  const getCities = async () => {
    await axios.get("http://tourbook-backend.herokuapp.com/city/all").then(res => {
  
})}

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      console.log(data.email, data.password, data.firstName, data.lastName, data.city, data.country, data.role, data.gender, data.cnic);
      await register(data.email, data.password, data.firstName, data.lastName,data.city,data.country,data.role,data.gender,data.cnic);
      <Navigate to="/auth/login" replace />
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const handlecity = (data) => {
     console.log(data.email, data.password, data.firstName, data.lastName, data.city, data.country, data.role, data.gender, data.cnic);
    console.log(cities);
    console.log("hi");
  }

  return (
    <>
    {/* <LoadingButton onClick={handlecity}>h</LoadingButton> */}
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <></>
            <RHFSelect name="country" label="Country" placeholder="Country">
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="city" label="City" placeholder="City">
              {cities?.map(({ _id, name, }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFSelect name="role" label="Role" placeholder="Role">
              {role.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </RHFSelect>


            <RHFSelect name="gender" label="Gender" placeholder="Gender" childern={gender}>
              {gender.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </RHFSelect>

          </Stack>
          <RHFTextField name="phone" label="Phone number" />
          <RHFTextField name="cnic" label="Cnic" />
        
        
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
    </>
  );
}

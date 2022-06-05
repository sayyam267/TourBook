import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { FormikProvider, useFormik } from 'formik';
import { createMuiTheme } from '@material-ui/core';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, Alert, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';
// import useIsMountedRef from '../../../hooks/useIsMountedRef';

// components
import Iconify from '../../../components/Iconify';
// import { FormProvider, RHFTextField, RHFSelect } from '../../../components/hook-form';
import axios from '../../../utils/axios';
import 'yup-phone';
import { PATH_AUTH } from '../../../routes/paths';
import FormInputField from './FormInputField';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const initialvalues = {
    fname: '',
    lname: '',
    city: '',
    role: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
  };
  const validationschema = Yup.object().shape({
    fname: Yup.string().min(3, 'First Name should be atleast 3 characters').required('First Name is Required'),
    lname: Yup.string().min(3, 'First Name should be atleast 3 characters').required('First Name is Required'),
    city: Yup.string().required('Please Select City'),
    role: Yup.string().required('Please Select Role'),
    email: Yup.string().required('Email is Required'),
    password: Yup.string().min(8, 'Password must be atleast 8 characters').required('Password is required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone Number must be 10 digits excluding 0  and +92')
      .max(10, 'Phone Number must be 10 digits excluding 0  and +92')
      .required('Phone Number is required'),
    country: Yup.string().required('Country Name is required'),
  });
  const onSubmit = async (e) => {
    // console.log(e);
    try {
      // console.log(e.email, e.password, e.fname, e.lname, e.city, e.country, e.role);
      await register(e.email, e.password, e.fname, e.lname, e.city, e.country, e.role);
      enqueueSnackbar('Sign Up success!');
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      // console.error(error);
      formik.setErrors(error);
      formik.setStatus(error?.message);
    }
    formik.setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: validationschema,
    onSubmit,
  });
  const { register } = useAuth();

  const [cities, setCities] = useState();
  const { enqueueSnackbar } = useSnackbar();
  // const countries = ['India', 'Pakistan', 'China'];
  // const isMountedRef = useIsMountedRef();
  // const [city, setCity] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const getCities = async () => {
    await axios
      .get('http://tourbook-backend.herokuapp.com/city/all')
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        {formik?.status && <Alert severity="error">{formik.status}</Alert>}
        <FormikProvider value={formik}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormInputField name="fname" label="First Name" required />
            <FormInputField name="lname" label="Last Name" required />
          </Stack>
          <FormInputField name="email" label="Email" required />
          <FormInputField
            required
            name="password"
            label="Enter Password"
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
            <FormInputField name="country" label="Country" select required>
              <MenuItem key={'Pakistan'} value={'Pakistan'}>
                Pakistan
              </MenuItem>
            </FormInputField>

            <FormInputField name="city" label="City" select required>
              {cities?.map(({ _id, name }) => (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              ))}
            </FormInputField>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormInputField name="role" label="Role" placeholder="Role" required select>
              <MenuItem key={1} value={'tourist'}>
                {'Tourist'}
              </MenuItem>
              <MenuItem key={2} value={'vendor'}>
                {'Tour Provider / Vendor'}
              </MenuItem>
              <MenuItem key={3} value={'admin'}>
                {'Admin'}
              </MenuItem>
            </FormInputField>
          </Stack>
          <FormInputField name="phoneNumber" label="Phone Number" required type="number"  />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={formik.isSubmitting}>
            Register
          </LoadingButton>
        </FormikProvider>
      </Stack>
    </form>
  );
}

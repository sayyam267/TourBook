import { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { ProfileCover } from '../../sections/@dashboard/user/profile';

import { fData } from '../../utils/formatNumber';
import axios from '../../utils/axios';
// _mock
import { countries } from '../../_mock';
// componentsw
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const _userAbout = { cover: '' };
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState(null);

  const UpdateUserSchema = Yup.object().shape({
    fname: Yup.string().required('FirstName is required'),
    lname: Yup.string().required('lastName is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().required('Name is required'),
    country: Yup.string().required('Name is required'),
    city: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    fname: '',
    lname: '',
    photoURL: '',
    email: '',
    phoneNumber: '',
    country: 'Pakistan',
    city: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GETCITIES)
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(process.env.REACT_APP_GETUSERDETAIL, {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((response) => {
        console.log(response.data.data);
        const user = response.data.data;
        setUser(response.data.data);
        reset({
          fname: user?.fname,
          photoURL: user?.profilePicture,
          lname: user?.lname,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          country: user?.country,
          city: user?.city?._id,
        });
      });
  }, []);

  const onSubmit = async () => {
    try {
      console.log(values.fname, values.lname, values.country, values.city, values.phoneNumber, values.email);

      axios
        .put(
          process.env.REACT_APP_UPDATEPROFILE,
          {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            city: values.city,
            phoneNumber: values.phoneNumber,
          },
          { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem('name', `${values.fname}  ${values.lname}`);
          enqueueSnackbar('Update success!');
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const token = localStorage.getItem('accessToken');
      const fdata = new FormData();
      fdata.append('picture', file);
      axios
        .put(`http://localhost:4000/api/users/update/picture`, fdata, {
          headers: { 'x-auth-token': token },
        })
        .then((res) => { console.log("profile update", res); enqueueSnackbar('Update success!'); });

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={{ cover: user?.profilePicture }} />
        </Card>

        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                  <RHFUploadAvatar
                    name="photoURL"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png,
                      </Typography>
                    }
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      rowGap: 3,
                      columnGap: 2,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                  >
                    <RHFTextField name="fname" label="First Name" />
                    <RHFTextField name="lname" label="Last Name" />
                    <RHFTextField name="email" label="Email Address" disabled={user?.source === 'google'} />
                    <RHFTextField name="phoneNumber" label="Phone Number" />

                    <RHFSelect name="country" label="Country" placeholder="Country">
                      <option value="Pakistan">Pakistan</option>
                    </RHFSelect>

                    <RHFSelect name="city" label="City" placeholder="City">
                      <option value={user?.city?._id}>{user?.city?.name}</option>
                      {cities?.map((city) => {
                        return (
                          <option key={city?._id} value={city?._id}>
                            {city?.name}
                          </option>
                        );
                      })}
                    </RHFSelect>
                  </Box>

                  <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Save Changes
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Container>
    </Page>
  );
}

// // @mui
// import { Grid, Container, Stack } from '@mui/material';
// // hooks
// import useSettings from '../../hooks/useSettings';
// // components
// import Page from '../../components/Page';
// // sections
// import {
//   BankingContacts,
//   BankingWidgetSummary,
//   BankingInviteFriends,
//   BankingQuickTransfer,
//   BankingCurrentBalance,
//   BankingBalanceStatistics,
//   BankingRecentTransitions,
//   BankingExpensesCategories,
// } from '../../sections/@dashboard/general/banking';

// // ----------------------------------------------------------------------

// export default function GeneralBanking() {
//   const { themeStretch } = useSettings();

//   return (
//     <Page title="General: Banking">
//       <Container maxWidth={themeStretch ? false : 'xl'}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={7}>
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
//               <BankingWidgetSummary
//                 title="Income"
//                 icon={'eva:diagonal-arrow-left-down-fill'}
//                 percent={2.6}
//                 total={18765}
//                 chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
//               />
//               <BankingWidgetSummary
//                 title="Expenses"
//                 color="warning"
//                 icon={'eva:diagonal-arrow-right-up-fill'}
//                 percent={-0.5}
//                 total={8938}
//                 chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
//               />
//             </Stack>
//           </Grid>

//           <Grid item xs={12} md={5}>
//             <BankingCurrentBalance />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Stack spacing={3}>
//               <BankingBalanceStatistics />
//               <BankingExpensesCategories />
//               <BankingRecentTransitions />
//             </Stack>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Stack spacing={3}>
//               <BankingQuickTransfer />
//               <BankingContacts />
//               <BankingInviteFriends />
//             </Stack>
//           </Grid>
//         </Grid>
//       </Container>
//     </Page>
//   );
// }

import { useState, useCallback,useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Grid,  Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';

import { fData } from '../../utils/formatNumber';
import axios  from '../../utils/axios';
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
  // const { user } = useAuth();
  const _userAbout = {name:'sayyam',}

  const { enqueueSnackbar } = useSnackbar();

 



  const UpdateUserSchema = Yup.object().shape({
    fname: Yup.string().required('FirstName is required'),
    lname: Yup.string().required('lastName is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().required('Name is required'),
    country: Yup.string().required('Name is required'),
    city: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    fname:  '',
    lname: '',
    photoURL: '',
    email:'',
    phoneNumber:'',
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


  const values  = watch();

  useEffect(() => {
    console.log(process.env.REACT_APP_GETUSERBYEMAIL);
    const Email= localStorage.getItem('email');
    axios.get(process.env.REACT_APP_GETUSERBYEMAIL, { params: { email: Email } }).then((response) => {
      console.log(response.data.data[0])
      const user = response.data.data[0]
      // setValue('fname', 'Bob')
      reset({fname:user.fname,lname:user.lname,email:user.email,phoneNumber:user.phoneNumber,country:user.country,city:user.city});
    })
  }, []);

  const onSubmit = async () => {
    try {
      console.log(values.fname,values.lname,values.country, values.city,values.phoneNumber,values.email);
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

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
          <ProfileCover myProfile={_userAbout} />

          
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
                    <RHFTextField name="email" label="Email Address" />

                    <RHFTextField name="phoneNumber" label="Phone Number" />

                    <RHFSelect name="country" label="Country" placeholder="Country">
                      <option  value="Pakistan">Pakistan</option>
                      {/* {countries.map((option) => (
                        <option key={option.code} value={option.label}>
                          {option.label}
                        </option>
                      ))} */}
                    </RHFSelect>


                    <RHFTextField name="city" label="City" />
                  </Box>

                  <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                    {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}

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
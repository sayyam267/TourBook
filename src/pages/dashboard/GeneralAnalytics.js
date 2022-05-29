// @mui
import { Grid, Container, Typography, Card, CardHeader, Stack, Alert } from '@mui/material';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import { LoadingButton } from '@mui/lab';
import useSettings from '../../hooks/useSettings';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';

import useIsMountedRef from '../../hooks/useIsMountedRef';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';

import { BookingDetails } from '../../sections/@dashboard/general/booking';

import UserList from './UserList';

import { EcommerceCurrentBalance, EcommerceWelcome } from '../../sections/@dashboard/general/e-commerce';
// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();

  const [totaluser, setTotalUser] = useState(null);
  const [activeuser, setActiveUser] = useState(null);
  const [pendingreq, setPendingReq] = useState(null);
  const [deleteduser, setdeleted] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  const Schema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  useEffect(() => {
    axios
      .get('http://tourbook-backend.herokuapp.com/admin/dashboard', {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.data.allUsers, res.data.data.totalNoOfUsers);
        setAllUsers([...res.data.data.allUsers]);
        // console.log(typeof [...res.data.data.allUsers]);
        console.log(allUsers);
        setTotalUser(res.data.data.totalNoOfUsers);
        setPendingReq(res.data.data.pendingVendorRequests);
        // console.log(totaluser);
        setActiveUser(res.data.data.totalNoOfActiveUsers);
      });
  }, [allUsers]);
  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('email sent', data.email);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <Page title="Admin: Dashboard">
      <Container maxWidth={themeStretch ? false : 'x1'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EcommerceWelcome />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader title="Add An Admin " sx={{ mb: 1 }} />
              <Typography sx={{ color: 'text.secondary', ml: 3 }}>Enter Email to Add Admin</Typography>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ mb: 4, mt: 2, px: 5 }}>
                  {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                  <RHFTextField name="email" label="Email address" />
                </Stack>
                <Stack spacing={3} sx={{ my: 4, px: 5 }}>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Admin
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ mb: 2, mt: 5 }} md={{ mb: 2, mt: 5 }}>
          Pending Request
        </Typography>

        <Grid container spacing={3}>
          {pendingreq?.map((req) => {
            return (
              <Grid item xs={12} sp={6} md={3}>
                <EcommerceCurrentBalance
                  name={`${req.fname}  ${req.lname}`}
                  id={req._id}
                  email={req.email}
                  image={req.profilePicture}
                  phoneNumber={req.phoneNumber}
                />
              </Grid>
            );
          })}

          {allUsers ? (
            <Grid item xs={12}>
              <BookingDetails user={allUsers} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </Page>
  );
}








// // @mui
// import { Grid, Container, Typography, Card, CardHeader, Stack, Alert } from '@mui/material';
// import * as Yup from 'yup';
// import {useState,useEffect} from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // hooks
// import { LoadingButton } from '@mui/lab';
// import useSettings from '../../hooks/useSettings';
// import axios from '../../utils/axios';
// // components
// import Page from '../../components/Page';



// import useIsMountedRef from '../../hooks/useIsMountedRef';
// import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
// // sections
// import {
//   AnalyticsTasks,
//   AnalyticsNewsUpdate,
//   AnalyticsOrderTimeline,
//   AnalyticsCurrentVisits,
//   AnalyticsWebsiteVisits,
//   AnalyticsTrafficBySite,
//   AnalyticsWidgetSummary,
//   AnalyticsCurrentSubject,
//   AnalyticsConversionRates,
// } from '../../sections/@dashboard/general/analytics';

// import {
//   BookingDetails,
// } from '../../sections/@dashboard/general/booking';

// import UserList from './UserList';


// import {
//   EcommerceCurrentBalance,
//   EcommerceWelcome
// } from '../../sections/@dashboard/general/e-commerce';
// // ----------------------------------------------------------------------

// export default function GeneralAnalytics() {
//   const { themeStretch } = useSettings();
//   const isMountedRef = useIsMountedRef();

//   const[totaluser,setTotalUser] = useState(null);
//   const[activeuser,setActiveUser]=useState(null);
//   const[deleteduser,setdeleted] =useState(null);
//   const[allUsers,setUsers] =useState(null);
  


//   const Schema = Yup.object().shape({
//     email: Yup.string().email('Email must be a valid email address').required('Email is required'),
//   });

//   const methods = useForm({
//     resolver: yupResolver(Schema),
//   });


//   useEffect(() => {
   
//     axios.get("http://tourbook-backend.herokuapp.com/admin/dashboard", { headers: { "x-auth-token": localStorage.getItem('accessToken') } }).then(res => {
//       console.log(res);
//       console.log(res.data.data.allUsers,res.data.data.totalNoOfUsers);
//       setUsers(res.data.data.allUsers);
//       setTotalUser(res.data.data.totalNoOfUsers);
//       setActiveUser(res.data.data.totalNoOfActiveUsers);

//   })

// },[])

//   const {
//     reset,
//     setError,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = methods;

//   const onSubmit = async (data) => {
//     try {
//       console.log("email sent",data.email);
//     } catch (error) {
//       console.error(error);
//       reset();
//       if (isMountedRef.current) {
//         setError('afterSubmit', error);
//       }
//     }
//   };



//   return (
//     <Page title="Admin: Dashboard">
//       <Container maxWidth={themeStretch ? false : 'x1'}>
//         <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <EcommerceWelcome />
//         </Grid>
//         <Grid item xs={12} sm={8} md={6}>
//             <Card>
//               <CardHeader title="Add An Admin " sx={{ mb: 1 }} />
//               <Typography sx={{ color: 'text.secondary', ml: 3 }} >
//                 Enter Email to Add Admin
//               </Typography>
//               <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//                 <Stack spacing={3} sx={{ mb: 4,mt:2, px: 5 }}>
//                   {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

//                   <RHFTextField name="email" label="Email address" />
//                   </Stack>
//                 <Stack spacing={3} sx={{ my: 4, px: 5 }}>
//                 <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
//                   Add Admin
//                 </LoadingButton>
//                 </Stack>
//                 </FormProvider>
//               </Card>
//         </Grid>
//         </Grid>


//         <Typography variant="h4" sx={{ mb: 2, mt: 5 }} md={{ mb: 2, mt: 5 }} >
//           Pending Request
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <EcommerceCurrentBalance name="Sayyam" data="Please Approve my Account"  title={"Verification Request"}/>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <EcommerceCurrentBalance name="Komail" data="Please Approve my Account"  title={"Verification Request"}/>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <EcommerceCurrentBalance name="Sayyam" data="Please Approve my Account" title={"Verification Request"}/>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <EcommerceCurrentBalance name="Sayyam" data="Please Approve my Account" title={"Verification Request"} button1="Don't Verify" button2="Verify"/>
//           </Grid>

//           {allUsers ?<Grid item xs={12} >
//             <BookingDetails user={allUsers} />
//           </Grid>:<></>}
//         </Grid>
//       </Container>
//     </Page>
//   );
// }

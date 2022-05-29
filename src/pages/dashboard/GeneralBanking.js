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

import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';

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
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState('profile');
  const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'Lisitings',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'Pending Approvals',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <ProfileFriends friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
    },
    {
      value: 'Settings',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  return (
    <Page title="Tour Agency DashBoard">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <h1>Tour Agency Dashboard</h1>
        {/* <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' },
          ]}
        /> */}
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_userAbout} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
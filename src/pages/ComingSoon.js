// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import GeneralAPP from './dashboard/GeneralApp';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  
  return (
    <Page title="Dashboard">
      <RootStyle>
        <GeneralAPP />
      </RootStyle>
    </Page>
  );
}

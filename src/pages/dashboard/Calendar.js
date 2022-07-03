// @mui
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import {
  Box,
  Grid,
  Container,
  Typography,
} from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
// sections
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../../sections/payment';



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));


// ----------------------------------------------------------------------

export default function Payment({ user }) {
  const isDesktop = useResponsive('up', 'md');
  const [url, setUrl] = useState(null);


  const handleUrl = (url) => {
    setUrl(url);
    console.log('hello', url);
  };
  return (
    <Page title="Payment">
      <RootStyle>
        <Container>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph>
              Let's Top Up your Wallet!
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Buy TourBook Credits from here.
            </Typography>
          </Box>

          <Grid container spacing={isDesktop ? 3 : 5}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'grid',
                  p: { md: 3 },
                  borderRadius: 2,
                }}
              >
                <PaymentBillingAddress onGetSuccess={handleUrl} />
              </Box>
            </Grid>
            {url ? (
              <Grid item xs={12} md={6}>
                <PaymentSummary url={url} />
              </Grid>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                      Nothing To Show
                    </Typography>
                  </Box>
                </Grid>{' '}
              </>
            )}
          </Grid>

          
        </Container>
      </RootStyle>
    </Page>
  );
}



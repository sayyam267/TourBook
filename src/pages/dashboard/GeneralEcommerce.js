// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid,Stack,Typography } from '@mui/material';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';

// ----------------------------------------------------------------------

export default function GeneralEcommerce() {
  const theme = useTheme();
  const { themeStretch } = useSettings();


  return (
    <Page title="Admin: Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <EcommerceWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Balance"
              percent={-0.1}
              total={18765}
              chartColor={theme.palette.chart.green[0]}
              chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
            />
          </Grid>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>
          <Grid item xs={12} sm={6} md={3}>
            <EcommerceCurrentBalance />
          </Grid>


          <Grid item xs={12} md={6} lg={8}>
            <EcommerceBestSalesman />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid>
          </Grid>
      </Container>
    </Page>
  );
}

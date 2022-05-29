import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

VendorProductCard.propTypes = {
  tour: PropTypes.object,
};

// const tour = {
//   image :"https://images.unsplash.com/photo-1597637245724-beb1e10cb79a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332",
//   name : "Murree Three days tour",
//   price :"7000"
// }

export default function VendorProductCard({ tour }) {
  // const { name, cover, price, colors, status, priceSale } = product;

  console.log("his is tour id",tour._id)

  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/checkout`;
  


    // { pathname: `${PATH_DASHBOARD.eCommerce.root}/checkout`, query: { id: tour._id } }

  console.log(tour);
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}
        <Image alt={"img"} src={`http://tourbook-backend.herokuapp.com/${tour.tourpics[0]}`} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" onClick={() => localStorage.setItem('tourId',tour._id)} component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {tour.name}
          </Typography>
        </Link>
    
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
           Source: {tour.source.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.2}>
          <Typography variant="subtitle2" noWrap>
            Dstination{tour.destination.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.2}>
            <Typography variant="subtitle1">Price {tour.price}Rs</Typography>
          </Stack>
      </Stack>
    
    </Card>
  );
}

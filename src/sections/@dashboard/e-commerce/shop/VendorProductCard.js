import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';
import Iconify from '../../../../components/Iconify';
import { fDateTime } from '../../../../utils/formatTime';

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
  

  console.log(tour);
  return (
    <Card sx={{ borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
        <Image alt={"img"} src={tour.tourpics[0]} ratio="1/1" />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <div>
            <Link to={linkTo} color="inherit" onClick={() => localStorage.setItem('tourId', tour._id)} component={RouterLink}>
              <Typography variant="subtitle2">{tour.name}</Typography>
            </Link>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              Starting from {Date(tour.addedOn)}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'topcoat:location'} width={16} height={16} />
            <Typography variant="caption">Source: {tour.source.name}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'topcoat:location'} width={16} height={16} />
            <Typography variant="caption">Dstination: {tour.destination.name}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'ic:outline-airline-seat-recline-normal'} width={16} height={16} />
            <Typography variant="caption">{tour.seats}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Label
              variant="ghost"
              color={'success'}
            >
              <Iconify icon={'icomoon-free:price-tags'} width={16} height={16} />
              <Typography variant="caption"> {tour.price} RS</Typography>
            </Label>
          </Stack>
        </Stack>
      </Stack>



    </Card>
  );
}

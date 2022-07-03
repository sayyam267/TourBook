import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD,PATH_PAGE } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';
import { fDateTime } from '../../../../utils/formatTime';
import Iconify from '../../../../components/Iconify';


// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  tour: PropTypes.object,
};


export default function ShopProductCard({ tour }) {
  // const { name, cover, price, colors, status, priceSale } = product;

  console.log("his is tour id",tour._id)

  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/checkout`;
  
  
  // const date = `${Date(tour.addedOn).getDay()}  ${Date(tour.addedOn).getDate()} - ${Date(tour.addedOn).getMonth()} - ${Date(tour.addedOn).getYear()}`

  console.log(tour);
  return (
    <Card sx={{ borderRadius: 2, bgcolor: 'background.neutral'}}>
      <Box sx={{ position: 'relative', px: 1, pt: 1  }}>
        <Image alt={"img"} src={tour.tourpics[0]} ratio="1/1" />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <div>
            <Link to={localStorage.getItem('accessToken') ? linkTo : PATH_PAGE.details} color="inherit" onClick={() => localStorage.setItem('tourId', tour._id)} component={RouterLink}>
              <Typography variant="subtitle2">{tour.name}</Typography>
            </Link>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {/* Starting from {fDateTime(tour.addedOn)} */}
              {/* {`Startin from ${Date(tour.addedOn)}`} */}
              
              {`Starting From: ${Date(tour.startDate)}`}
{/* `${Date(tour.startDate).getDay()}  ${Date(tour.startDate).getDate()} - ${Date(tour.startDate).getMonth()} - ${Date(tour.startDate).getYear()}` */}

              {/* Starting from {`${ Date(tour.addedOn).getDay()}  ${ Date(tour.addedOn).getDate()} - ${ Date(tour.addedOn).getMonth()} - ${new Date(tour.addedOn).getYear()}`} */}
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

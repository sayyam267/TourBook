import { useState } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';
import Iconify from '../../../../components/Iconify';
import { fDateTime } from '../../../../utils/formatTime';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

VendorProductCard.propTypes = {
  tour: PropTypes.object,
};

export default function VendorProductCard({ tour }) {
  // const { name, cover, price, colors, status, priceSale } = product;

  console.log('his is tour id', tour._id);

  const navigate = useNavigate();
  const [isCompleted, setisCompleted] = useState(tour?.isCompleted);
  const handleComplete = () => {
    const token = localStorage.getItem('accessToken');
    console.log('inside handle', tour);
    axios
      .put(
        process.env.React_APP_TOUR_DONE,
        { tourID: tour._id },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate(PATH_DASHBOARD.user.cards);
        setisCompleted(true);
      })
      .catch((err) => console.log(err));
  };

  console.log('isCompleted', tour?.isCompleted);

  // console.log(tour);
  return (
    <Card sx={{ borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
        <Image alt={'img'} src={tour?.tourpics[0]} ratio="1/1" />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <div>
            <Typography variant="subtitle2">{tour.name}</Typography>
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
            <Label variant="ghost" color={'success'}>
              <Iconify icon={'icomoon-free:price-tags'} width={16} height={16} />
              <Typography variant="caption"> {tour.price} RS</Typography>
            </Label>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              startIcon={<Iconify icon={'icomoon-free:price-tags'} width={16} height={16} />}
              onClick={() => {
                localStorage.setItem('tourId', tour._id);
                navigate(PATH_DASHBOARD.eCommerce.newProduct, { state: { t: tour } });
              }}
            >
              Edit
            </Button>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            {isCompleted ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Iconify icon={'subway:tick'} width={16} height={16} />}
              >
                Completed
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                // startIcon={<Iconify icon={'icomoon-free:price-tags'} width={16} height={16} />}
                onClick={() => handleComplete()}
              >
                Mark as Completed
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

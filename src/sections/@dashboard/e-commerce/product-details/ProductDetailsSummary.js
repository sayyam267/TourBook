import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Link, Stack, Button, Rating, Divider, IconButton, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE, PATH_AUTH } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';

// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../../components/hook-form';
import axios from '../../../../utils/axios';
import { fDateTime } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.shape({
    available: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    id: PropTypes.string,
    inventoryType: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    totalRating: PropTypes.number,
    totalReview: PropTypes.number,
  }),
};

export default function ProductDetailsSummary({ tour, booked }) {
  const theme = useTheme();

  const navigate = useNavigate();

  console.log('tourData', tour.vendorID);

  const [quantity, setquantity] = useState(0);

  const defaultValues = {
    quantity: tour.seats < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    const balance = localStorage.getItem('balance');
    const total = quantity * tour?.price;
    try {
      if (balance > total) {
        console.log(tour?._id, quantity, total);
        axios
          .post(
            process.env.REACT_APP_CREATEORDER,
            {
              tourID: tour?._id,
              touristID: localStorage.getItem('NetworkID'),
              seats: quantity,
              amount: total,
            },
            { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
          )
          .then((res) => {
            axios
              .get(process.env.REACT_APP_GETBALANCE, {
                headers: { 'x-auth-token': localStorage.getItem('accessToken') },
              })
              .then((res) => {
                console.log(res.data.data.balance);
                localStorage.setItem('balance', res.data.data.balance);
              });
            console.log(res);
            booked();
          });
      } else {
        console.log('hello');
        setBuyBtn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [total, setTotal] = useState(0);
  const [buyBtn, setBuyBtn] = useState(false);
  useEffect(() => {
    axios.get('').then((res) => console.log(res));
  }, []);

  return (
    <RootStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" paragraph>
          {tour?.name}
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          <Box component="span" sx={{ color: 'text.disabled' }}>
            {/* {tour?.description} abc */}
          </Box>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
        {localStorage.getItem('accessToken') ? (
          <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
                Hosted By
              </Typography>

              <div>
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  startIcon={<Avatar src={tour?.vendorID?.profilePicture} />}
                  onClick={() => {
                    localStorage.setItem('VendorID', tour?.vendorID?._id);
                    navigate(PATH_DASHBOARD.details.vendor);
                  }}
                >
                  see {tour?.vendorID?.fname} Profile
                </Button>
              </div>
            </Stack>
          </>
        ) : (
          <></>
        )}

        <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Starting Location
          </Typography>

          <div>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              {tour?.source?.name}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Destination Location
          </Typography>

          <div>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              {tour?.destination?.name}
            </Typography>
          </div>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Start date
          </Typography>

          <div>
            {tour ? (
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                {`${new Date(tour.startDate).getDay()} - ${new Date(tour.startDate).getMonth() + 1} - ${new Date(
                  tour.startDate
                ).getFullYear()}`}
              </Typography>
            ) : (
              <></>
            )}
          </div>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            End Date
          </Typography>

          <div>
            {tour ? (
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                {`${new Date(tour.validTill).getDay()} - ${new Date(tour.validTill).getMonth() + 1} - ${new Date(
                  tour.validTill
                ).getFullYear()}`}
              </Typography>
            ) : (
              <></>
            )}
          </div>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Price
          </Typography>

          <div>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              {tour.price}RS
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            No Of Seats
          </Typography>

          <div>
            <Incrementer
              name="quantity"
              quantity={quantity}
              available={tour.seats}
              onIncrementQuantity={() => {
                setquantity(quantity + 1);
              }}
              onDecrementQuantity={() => {
                setquantity(quantity - 1);
              }}
            />
          </div>
        </Stack>

        <Typography variant="caption" component="div" sx={{ mt: 0, textAlign: 'right', color: 'text.secondary' }}>
          Available Seats: {tour?.seats}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Total
          </Typography>

          <div>
            <Typography variant="subtitle1" sx={{ mt: 0.5, color: 'text.secondary' }}>
              {quantity * tour?.price} RS
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          {localStorage.getItem('accessToken') ? (
            <Button
              fullWidth
              // disabled={isMaxQuantity}
              size="large"
              color="warning"
              variant="contained"
              startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
              onClick={onSubmit}
              sx={{ whiteSpace: 'nowrap' }}
              disabled={quantity <= 0}
            >
              Book tour
            </Button>
          ) : (
            <Button
              fullWidth
              // disabled={isMaxQuantity}
              size="large"
              color="primary"
              variant="contained"
              // startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
              onClick={() => navigate(PATH_AUTH.login)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Login To Continue
            </Button>
          )}
        </Stack>

        {buyBtn ? (
          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            <Typography variant="caption" component="div" sx={{ mt: 0, textAlign: 'right', color: 'text.danger' }}>
              You do not have sufficient credit for booking a tour
            </Typography>
            <Button
              fullWidth
              size="large"
              type="submit"
              onClick={() => navigate(PATH_DASHBOARD.calendar)}
              variant="contained"
            >
              Buy Credits Now
            </Button>
          </Stack>
        ) : (
          <></>
        )}

        <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
          TourId: {tour?._id}
        </Typography>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}

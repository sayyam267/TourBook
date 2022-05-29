import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { Link as RouterLink} from 'react-router-dom';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { PATH_DASHBOARD } from '../../../../routes/paths';

import VendorProductCard from '../../e-commerce/shop/VendorProductCard';

import axios from '../../../../utils/axios';
import { SkeletonProductItem } from '../../../../components/skeleton';
// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
  const [allTours,setAllTours] = useState([]);
 
  // get all tours of vendor to show in my listings
  useEffect(() => {
    axios.get("http://tourbook-backend.herokuapp.com/vendor/dashboard", {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken'),
      }}).then(res => {
      console.log(res);
      console.log(res.data.data.allTours);
      setAllTours(res.data.data.myTours);
    })
  }, [])

  return (
    <Box sx={{ mt: 5 }}>

      <Grid container spacing={3}>
      <Grid sx={12} md={6}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Listings
      </Typography>
      </Grid>
        <Grid sx={12} md={6}>
          <Button fullWidth size="large" component={RouterLink} to={PATH_DASHBOARD.eCommerce.newProduct}>Create a tour</Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
        >
        {allTours ? <>{allTours?.map(tour => { return <VendorProductCard tour={tour} /> })}</> : <SkeletonProductItem />}
     </Box> 
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.object,
};

function FollowerCard({ follower }) {
  const { name, country, avatarUrl, isFollowed } = follower;

  const [toggle, setToogle] = useState(isFollowed);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={() => setToogle(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
      >
        {toggle ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}

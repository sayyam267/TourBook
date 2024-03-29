
import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Grid,Box } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, filterProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
// sections
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
  ShopProductCard
} from '../../sections/@dashboard/e-commerce/shop';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import {
  EcommerceNewProducts,
} from '../../sections/@dashboard/general/e-commerce';
import axios from '../../utils/axios'
import { SkeletonProductItem } from '../../components/skeleton';


// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  
  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  const { products, sortBy, filters } = useSelector((state) => state.product);


  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  
  const [allTours, setAllTours] = useState(null);
  const [carousal, setCarousal] = useState(null);
  

  useEffect(() => {
    axios.get(process.env.REACT_APP_GetTOUR, { headers: { "x-auth-token": localStorage.getItem('accessToken') } }).then((res) => {
      console.log("bb",res.data.data.carousal);
      setAllTours(res.data.data.tours);
      setCarousal(res.data.data.carousal);

    })
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    reset();
    handleCloseFilter();
  };


  const handleRemoveCategory = () => {
    setValue('category', 'All');
  };


  const handleRemovePrice = () => {
    setValue('priceRange', '');
  };

  const handleRemoveRating = () => {
    setValue('rating', '');
  };

  const handleSort = (value) =>{
    if(value){
      const sortedTours = sortTour(allTours, value);
      setAllTours([...sortedTours]);
      console.log(allTours);
    }
  }

  // const handleFilter = () => {
  //   if (filters.priceRange) {
  //   products = products.filter((product) => {
  //     if (filters.priceRange === 'below') {
  //       return product.price < 25;
  //     }
  //     if (filters.priceRange === 'between') {
  //       return product.price >= 25 && product.price <= 75;
  //     }
  //     return product.price > 75;
  //   });
  // }
  // }
 


  

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'sx'}>
        
        <Stack sx={{mt:2}}/>

        <Stack sx={{mb:2}}>
        <Grid Grid item xs={12} md={12}>
            {carousal ? <EcommerceNewProducts tour={carousal} /> : <></>}
          
        </Grid>
        </Stack>

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch tour={allTours}/>

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 3 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>

            <ShopProductSort onHandleSort={handleSort}/>
          </Stack>
        </Stack>

        {allTours ? <ShopProductList tours={allTours} sortBy={sortBy} />: <></>}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function sortTour(allTours, sortBy, filters) {
  // SORT BY
  if (sortBy === 'newest') {
    console.log(sortBy);
    allTours.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log(allTours);
    return allTours;
  }
  if (sortBy === 'priceAsc') {
    console.log(sortBy);
    allTours?.sort((a, b) => (a.price > b.price ? 1 : -1))
    console.log(allTours);
    console.log("price low to high")
    return allTours;

  }
  if (sortBy === 'priceDesc') {
    console.log(sortBy);
    allTours?.sort((a, b) => (a.price > b.price ? -1 : 1))
    console.log("price high to low")
    console.log(allTours);
    return allTours;

  }
  
  return null;
}


import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isBefore } from 'date-fns';

// @mui

import { styled } from '@mui/material/styles';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Autocomplete,
  InputAdornment,
  FormControlLabel,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  Button,
  FormGroup,
  Select,
  MenuItem,
  FormLabel,
  Box
} from '@mui/material';
import axios from '../../../utils/axios';
import Map from '../../../components/map/Map';
import PlacesMap from '../../../components/map/PlacesMap';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------


const TAGS_OPTION = ['Scenic', 'Sprittual', 'Adventure', 'Cultural'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
function TaskItem({ task, checked, onChange }) {
  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(!checked && {
          color: 'text.disabled',
        }),
      }}
    >
      <Grid spacing={3}>
        <Grid item xs={12} md={8}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} />}
            label={task}
            sx={{ flexGrow: 1, m: 0 }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    seats: Yup.number().moreThan(0, 'Seats should not be 0.'),
    start: Yup.date().required('Date is Required'),
    end: Yup.date(),
    startLocation: Yup.string().required('Start Location is Required'),
    endLocation: Yup.string().required('End Location is Required'),
    hasFood: Yup.boolean(),
    hasGuide: Yup.boolean(),
    hasTransport: Yup.boolean(),
    hasHotel: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      startLocation: currentProduct?.description || '',
      endLocation: currentProduct?.description || '',
      price: currentProduct?.price || 0,
      images: currentProduct?.images || [],
      seats: currentProduct?.seats || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const [cities, setCities] = useState();
  const [fileList, setfileList] = useState([]);
  const [file, setfile] = useState();
  const [source, setSource] = useState('626e2a89c65f4c055b643653');
  const [destination, setDestination] = useState('626e2a89c65f4c055b643653');
  const [meetLocation, setMeetLocation] = useState();
  const [places, setPlaces] = useState();

  useEffect(() => {
    axios.get('http://tourbook-backend.herokuapp.com/city/all').then((res) => {
      console.log(res);
      console.log(res.data.data);
      setCities(res.data.data);
    });
  }, {});

  const handleFile = (e) => {
    const f = e.target.value;
    setfile(f);
  };

  const getMeetLocation = (meetLocation) =>{

    setMeetLocation(meetLocation);

    console.log("the meet location",meetLocation);
    
  }

  const getPlaces = (places) => {

    setPlaces(places);

    console.log("Places", places);

  }

  
  const onSubmit = async (e) => {
    try {
      const formData = new FormData();
      

      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.profile);
      console.log('Array of images', values.images);

     
      formData.append('name', values.name);

      const files = [...e.images];
      if (files.length !== 0) {
        files.forEach((file) => {
          formData.append('multiImages', file);
        });
      } else formData.append('multiImages', e.images[0]);
      formData.append('vendorId', String('6231b8ae83f24e5f778fdf88'));
      // console.log(e.expiry.value);
      formData.append('price', e.price);
      formData.append('hasHotel', hotel);
      formData.append('hasTransport', transport);
      formData.append('hasFood', food);
      formData.append('validTill', e.end);
      formData.append('seats', e.seats);
      formData.append('hasGuide', guide);
      formData.append('source', e.startLocation);
      formData.append('destination', e.endLocation);
      // console.log(values.images.files);

      const response = await axios
        .post(
          'http://tourbook-backend.herokuapp.com/tour/create',
          {
            formData,
            // name: values.name,
            // price: values.price,
            // source: values.startLocation,
            // destination: values.endLocation,
            // addedOn: values.start,
            // vendorID: '6231b8ae83f24e5f778fdf88',
            // seats: values.seats,
            // validTill: values.end,
            // hasGuide: guide,
            // hasFood: food,
            // hasTransport: transport,
            // hasHotel: hotel,
            // multiImages: data.multiImages,
            // meetLocation: {
            //   long: 'a',
            //   lat: 'v',
            // },
          },
          { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
        )
        .then((res) => {
          // localStorage.setItem("code", res.data.data);
          console.log(res);
          reset();
          enqueueSnackbar(!isEdit ? 'Create; success!' : 'Update success!');
          // navigate(PATH_DASHBOARD.eCommerce.list);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
      console.log('hello');
      enqueueSnackbar(!isEdit ? 'Create; success!' : 'Update success!');
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  const [startdate, handleStartDate] = useState(new Date());
  const [enddate, handleEndDate] = useState(new Date());
  const [food, setFood] = useState(currentProduct?.hasFood || false);
  const [guide, setGuide] = useState(currentProduct?.hasGuide || false);
  const [transport, setTransport] = useState(currentProduct?.hasTransport || false);
  const [hotel, setHotel] = useState(currentProduct?.hasHotel || false);
  const [files, setFiles] = useState(null);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(e.target);
    console.log(e.target.multiImages);
  
    data.append('description', e.target.description.value);

   
    const files1 = [...e.target.multiImages.files];
    
    if (files1.length !== 0) {
      files1.map((file) => {
        return data.append('multiImages', file);
      });
    } else data.append('multiImages', e.target.multiImages.files[0]);
    console.log(files1);
    data.append('hasGuide', guide);
    data.append('hasFood', food);
    data.append('hasTransport', transport);
    data.append('hasHotel', hotel);
    data.append('price', e.target.price.value);
    data.append('validTill', enddate);
    data.append('seats', e.target.seats.value);
    data.append('source', source);
    data.append('destination', destination);
    data.append('name', e.target.name.value);


    // axios
    //   .post('http://tourbook-backend.herokuapp.com/tour/create', data, {
    //     headers: {
    //       'x-auth-token': localStorage.getItem('accessToken'),
    //     },
    //   })
    //   .then((r) => {
    //     console.log(r);
    //      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    //   navigate(PATH_DASHBOARD.user.profile);

    //   })
    //   .catch((e) => console.log(e.data));
    
  };
  return (
    <>
    <form >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <FormGroup>
                <InputLabel htmlFor="name">Enter Tour Title</InputLabel>
                <Input id="name" aria-describedby="Enter Tour Title" />
              </FormGroup>
              <FormGroup>
                <InputLabel htmlFor="desription">Enter Tour Description</InputLabel>
                <Input id="description" aria-describedby="Enter Your Description" />
              </FormGroup>
              <FormGroup>
              <Stack direction="row" spacig={5}>
                <InputLabel sx={{mr:5,py:1}} htmlFor="multiImages">Select Images</InputLabel>
                <label htmlFor="multiImages">
                  <input
                    accept="image/*"
                    id="multiImages"
                    multiple
                    type="file"
                    hidden
                    onChange={(e) => {
                      setFiles(e.target.files);
                      console.log(files);
                    }}
                  />
                  <Button variant="contained" component="span">
                    {files?.length ? `${files.length}   Images Selected` : 'Upload'}
                  </Button>
                </label>
                </Stack>
              </FormGroup>

              <Stack direction="row" spacing={3}>
              <FormGroup>
              <Stack direction="row" spacig={3}>
                <InputLabel sx={{py:1}} htmlFor="hasFood">Are You Providing Food?</InputLabel>
                <Checkbox value={food} checked={food} onChange={() => setFood(!food)} />
                  </Stack>
              </FormGroup>

              <FormGroup>
                  <Stack direction="row" spacig={3}>
                    <InputLabel sx={{ py: 1 }} htmlFor="hasTransport">Are You Providing Transport?</InputLabel>
                <Checkbox value={transport} checked={transport} onChange={() => setTransport(!transport)} />
                </Stack>
              </FormGroup>
                </Stack>

                <Stack direction="row" spacing={3}>
              <FormGroup>
                  <Stack direction="row" spacig={3}>
                    <InputLabel sx={{ py: 1 }} htmlFor="hasGuide">Are You Providing Guide?</InputLabel>
                <Checkbox value={guide} checked={guide} onChange={() => setGuide(!guide)} />
                </Stack>
              </FormGroup>
              <FormGroup>
                  <Stack direction="row" spacig={3}>
                    <InputLabel sx={{ py: 1 }} htmlFor="hasHotel">Are You Providing Hotel?</InputLabel>
                <Checkbox value={hotel} checked={hotel} onChange={() => setHotel(!hotel)} />
                </Stack>
              </FormGroup>
              </Stack>
            </Stack>
          </Card>
            <Card container sx={{ p: 3,my:3 }}>
              <LabelStyle>Meet Location</LabelStyle>
              <Stack sx={{ ml: 2 }} spacing={3}>
                <Map getMeetLocation={getMeetLocation} />
              </Stack>
            </Card>

            <Card container sx={{ p: 3, my: 3 }}>
              <LabelStyle>Places of Attraction</LabelStyle>
              <Stack  spacing={3}>
                <PlacesMap getPlaces={getPlaces} />
              </Stack>
            </Card>
        </Grid>
            
          
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
             
              <LabelStyle>Availability</LabelStyle>

              <Stack spacing={3} mt={2}>
                <Controller
                  name="start"
                  id="startDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      id="startDate"
                      label="Start date"
                      value={startdate}
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  )}
                />

                <Controller
                  name="end"
                  id="endDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="End date"
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="endDate"
                          fullWidth
                          value={enddate}
                          error={!!isDateError}
                          helperText={isDateError && 'End date must be later than start date'}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
             
              <LabelStyle>Locations</LabelStyle>

              <Stack spacing={3} mt={2}>
                <FormGroup>
                  <Select
                    labelId="source"
                    id="source"
                    value={source}
                    label="Age"
                    onChange={(e) => setSource(e.target.value)}
                  >
                    {cities?.map((city) => {
                      return <MenuItem value={city._id}>{city.name}</MenuItem>;
                    })}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="destination">Destination City</FormLabel>
                  <Select
                    labelId="destination"
                    id="destination"
                    value={destination}
                    label="Age"
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    {cities?.map((city) => {
                      return <MenuItem value={city._id}>{city.name}</MenuItem>;
                    })}
                  </Select>
                </FormGroup>

                {/* <RHFTextField name="endLocation" label="Enter Destination" /> */}
              </Stack>
            </Card>
            
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
               
                <FormGroup>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <TextField id="price" type="number" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="seats">Seats</FormLabel>
                  <TextField id="seats" type="number" />
                </FormGroup>
              </Stack>

             
            </Card>
            
              <LoadingButton
                variant="contained"
                size="large"
                onClick={handleSubmit1}
              >
                {!isEdit ? 'Create TOur' : 'Save Changes'}
              </LoadingButton>
            
          </Stack>
        </Grid>
        
      </Grid>
      
      {/* </FormProvider> */}
    </form>
     
    </>
  );
}






















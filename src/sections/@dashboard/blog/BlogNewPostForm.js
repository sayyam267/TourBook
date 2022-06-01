import * as Yup from 'yup';
import { useCallback, useState, useEffect} from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch, RHFSelect, FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));




//  Custom Tour Form
export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [cities,setCities] = useState();


 

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    maxBudget: Yup.number().required('Budget Required').min(0),
    seats: Yup.number().required('Budget Required').min(1),
    source: Yup.string().required('StartLocation is required'),
    destination: Yup.string().required('Description is required'),
    place: Yup.array(),
    isHotel: Yup.boolean(),
    isGuide: Yup.boolean(),
  });

  const defaultValues = {
    description: '',
    maxBudget: 0,
    seats: 0,
    source: '',
    destination: '',
    isHotel: false,
    isGuide: false,
    places:'',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    axios.get('http://tourbook-backend.herokuapp.com/city/all').then((res) => {
      console.log(res);
      console.log(res.data.data);
      setCities(res.data.data);
      setValue('source', res.data.data[0]._id);
      setValue('destination', res.data.data[0]._id);
    });
  }, []);

  const onSubmit = async () => {
    
    console.log(values.description,values.maxBudget,values.isGuide,values.isHotel,values.seats,values.source,values.destination,values.places);
    try {
      axios.post("http://tourbook-backend.herokuapp.com/customtour/create",{
        requirements:{
          maxBudget: Number(values.maxBudget),
          seats: Number(values.seats),
          description: values.description,
          source: values.source,
          destination: values.destination,
          isHotel: values.isHotel,
          isGuide: values.isGuide
        }
        
      }, {headers: {'x-auth-token': localStorage.getItem('accessToken')}}).then((response) => {console.log(response)})
      reset();
      enqueueSnackbar('CustomTour Created!');
      // navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                <LabelStyle>Description</LabelStyle>
                <RHFTextField name="description" label="Enter Detail Description" multiline rows={4} />
            </Stack>


                <div>
                <Stack spacing={1}>
                  <LabelStyle>Location</LabelStyle>
                  <Stack direction="row" spacing={3}>
                      <RHFSelect name="source" label="Enter Starting Location" placeholder="City">
                        {cities?.map(({ _id, name }) => (
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect name="destination" label="Enter Destination Location" placeholder="City">
                        {cities?.map(({ _id, name }) => (
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        ))}
                      </RHFSelect>
                    </Stack>
                  </Stack>
                </div>
                <div>
                  <Stack spacing={1}>
                    <LabelStyle>Extras</LabelStyle>
                    <Stack direction="row" spacing={3}>
                      <RHFCheckbox name="isHotel" label="Need Hotel" />
                      <RHFCheckbox name="isGuide" label="Need TourGuide" />
                    </Stack>
                  </Stack>
                </div>
                
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <Stack spacing={1}>
                    <LabelStyle>Budget</LabelStyle>
                  <RHFTextField name="maxBudget" label="Max Budget in RS"/>
                  </Stack>
                </div>

                <div>
                  <Stack spacing={1}>
                    <LabelStyle>Seats</LabelStyle>
                    <RHFTextField name="seats" label="No of person" />
                  </Stack>
                </div>


                <Controller
                  name="places"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Places" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton sx={{mx:2}} fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}

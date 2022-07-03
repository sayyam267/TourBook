import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

import { useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { OutlinedInput, Stack , Alert,Box} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const navigate = useNavigate();

  const [error,setError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      setError(false);
      const verifyCode = Object.values(data).join('');
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('code:', Object.values(data).join(''));
      await axios.put(process.env.REACT_APP_VERIFYOTP,{email:localStorage.getItem("verifyEmail"), code:verifyCode }).then(res =>{
        if (res.data.data) {
          enqueueSnackbar('Verify success!');
          navigate('/auth/new-password', { replace: true });
        }
          else {
          setError(true);
          resetInput();
        }
      })
      
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Verify error!');
      setError(true);
    }
  };

  const handlePasteClipboard = (event) => {
    let data = event?.clipboardData?.getData('Text') || '';

    data = data.split('');

    [].forEach.call(document.querySelectorAll('#field-code'), (node, index) => {
      node.value = data[index];
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex, data[index]);
    });
  };

  const resetInput = () =>{
    [].forEach.call(document.querySelectorAll('#field-code'), (node, index) => {
      node.value = '';
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex, '');
    });
  }
  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }

    handleChange(event);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error ? (<Box sx={{ mt: 3, mb: 3 }}>
        <Alert severity="error">{"Wrong Verification Code"}</Alert> </Box>) : (<></>)}
      
      <Stack direction="row" spacing={2} justifyContent="center">
        {Object.keys(values).map((name, index) => (
          <Controller
            key={name}
            name={`code${index + 1}`}
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="field-code"
                autoFocus={index === 0}
                placeholder="-"
                onChange={(event) => handleChangeWithNextField(event, field.onChange)}
                inputProps={{
                  maxLength: 1,
                  sx: {
                    p: 0,
                    textAlign: 'center',
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 },
                  },
                }}
              />
            )}
          />
        ))}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={!isValid}
        sx={{ mt: 3 }}
      >
        Verify
      </LoadingButton>
    </form>
  );
}

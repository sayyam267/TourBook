import PropTypes from 'prop-types';
// form
import { TextField } from '@mui/material';
import { useField } from 'formik';

// ----------------------------------------------------------------------

FormInputField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function FormInputField({ name, ...rest }) {
  const [field, meta, helpers] = useField(name);

  return (
    <TextField
      {...field}
      fullWidth
      error={meta?.touched && meta?.error ? meta?.error : false}
      helperText={meta?.error}
      {...helpers}
      {...rest}
    />
  );
}

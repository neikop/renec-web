import { UnfoldMore } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { InputNumber } from 'components/common';
import { forwardRef } from 'react';
import { NumericFormatProps } from 'react-number-format';

type Props = TextFieldProps & {
  inputProps?: NumericFormatProps;
};

const TextFieldNumber = forwardRef((props: Props, ref) => {
  const { InputProps, inputProps } = props;

  return (
    <TextField
      {...props}
      InputProps={{
        inputRef: ref,
        inputComponent: InputNumber,
        inputProps,
        endAdornment: (
          <InputAdornment position='end'>
            <UnfoldMore />
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );
});

export default TextFieldNumber;

import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

const TextFieldSelect = forwardRef((props: TextFieldProps, ref) => {
  const { value, onChange, InputProps } = props;

  return (
    <TextField
      {...props}
      select
      sx={{
        '&:hover': {
          '.MuiInputAdornment-positionEnd': {
            display: value ? 'flex' : 'none',
          },
        },
        '.MuiInputAdornment-positionEnd': {
          display: 'none',
          marginRight: '19px',
        },
      }}
      InputProps={{
        inputRef: ref,
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              sx={{
                padding: '4px',
                '.MuiSvgIcon-root': {
                  fontSize: 20,
                },
              }}
              onClick={() => {
                onChange?.({ target: { value: '' } } as any);
              }}
            >
              <Close />
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );
});

export default TextFieldSelect;

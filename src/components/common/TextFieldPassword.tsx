import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { forwardRef, useState } from 'react';

const TextFieldPassword = forwardRef((props: TextFieldProps, ref) => {
  const { InputProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        inputRef: ref,
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );
});

export default TextFieldPassword;

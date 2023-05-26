import React from 'react';
import { NumericFormat } from 'react-number-format';

const InputNumber = React.forwardRef(({ onChange, ...props }: any, ref) => (
  <NumericFormat
    getInputRef={ref}
    allowNegative={false}
    decimalScale={0}
    allowLeadingZeros={false}
    onValueChange={({ floatValue }) => {
      onChange({ target: { value: floatValue } });
    }}
    {...props}
  />
));

export default InputNumber;

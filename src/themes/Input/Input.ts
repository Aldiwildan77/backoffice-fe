import { defineStyleConfig } from '@chakra-ui/react';

const Input = defineStyleConfig({
  variants: {
    primary: {
      field: {
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'bodyBackgroundSecondaryColor',
        _focus: {
          border: '1.5px solid',
          borderColor: 'primaryColor',
        },
      },
    },
  },
});

export default Input;

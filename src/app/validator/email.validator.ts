import * as Yup from 'yup';

export const emailValidationSchema = Yup.string().email('invalid QR code data');

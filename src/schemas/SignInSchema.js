import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email é obrigatório')
    .max(50, 'Email deve conter menos de 50 caracteres'),

  senha: yup
    .string()
    .required('Senha é obrigatória')
    .max(50, 'Senha deve conter menos de 50 caracteres'),
});

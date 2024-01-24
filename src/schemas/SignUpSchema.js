import * as yup from 'yup';

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signUpSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    .max(50, 'Nome deve conter menos de 50 caracteres'),

  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Email em formato inválido')
    .max(50, 'Email deve conter menos de 50 caracteres'),

  usuario: yup
    .string()
    .required('Usuário é obrigatório')
    .max(50, 'Usuário deve conter menos de 50 caracteres'),

  senha: yup
    .string()
    .required('Senha é obrigatória')
    .matches(passwordRules, 'Senha deve ser mais forte')
    .max(50, 'Senha deve conter menos de 50 caracteres'),
});

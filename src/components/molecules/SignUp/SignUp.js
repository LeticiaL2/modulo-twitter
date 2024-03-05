import { useFormik } from 'formik';
import { signUpSchema } from '../../../schemas/SignUpSchema';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { signUpUser } from '../../../services/authService';
import { useAuth } from '../../../contexts/auth-context';

const SignUp = () => {
  const { login } = useAuth();

  const onSubmit = async (values, { setStatus }) => {
    const response = await signUpUser(values);
    if (response.status === false) {
      if (response.mensagem.includes('Email')) {
        setStatus({ emailError: response.mensagem });
      } else if (response.mensagem.includes('Usuário')) {
        setStatus({ usernameError: response.mensagem });
      } else {
        alert('Erro: ', response);
      }
    } else {
      await login(values);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    status,
  } = useFormik({
    initialValues: {
      nome: '',
      usuario: '',
      email: '',
      senha: '',
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h1>Criar sua conta</h1>
      <Input
        id="nome"
        type="text"
        placeholder="Nome"
        value={values.nome}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={errors.nome && touched.nome ? 'input-error' : 'primary'}
      />
      {errors.nome && touched.nome && <p className="error">{errors.nome}</p>}
      <Input
        id="usuario"
        type="text"
        placeholder="Usuário"
        value={values.usuario}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={errors.usuario && touched.usuario ? 'input-error' : 'primary'}
      />
      {errors.usuario && touched.usuario && (
        <p className="error">{errors.usuario}</p>
      )}
      {status && status.usernameError && (
        <p className="error">{status.usernameError}</p>
      )}
      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={errors.email && touched.email ? 'input-error' : 'primary'}
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      {status && status.emailError && (
        <p className="error">{status.emailError}</p>
      )}
      <Input
        id="senha"
        type="password"
        placeholder="Senha"
        value={values.senha}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={errors.senha && touched.senha ? 'input-error' : 'primary'}
      />
      {errors.senha && touched.senha && <p className="error">{errors.senha}</p>}
      <Button variant="modalMainSubmit" disabled={isSubmitting} type="submit">
        Inscrever-se
      </Button>
    </form>
  );
};

export default SignUp;

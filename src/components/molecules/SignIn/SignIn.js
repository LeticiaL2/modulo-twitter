import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { useFormik } from 'formik';
import { signInSchema } from '../../../schemas/SignInSchema';
import { useAuth } from '../../../contexts/auth-context';

const SignIn = () => {
  const { login } = useAuth();

  const onSubmit = async (values, { setStatus }) => {
    try {
      await login(values);
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data.message;
        const statusCode = error.response.data.statusCode;
        if (statusCode === 401 && errorResponse.includes('Email')) {
          setStatus({ emailError: errorResponse });
        } else if (statusCode === 401 && errorResponse.includes('Senha')) {
          setStatus({ passwordError: errorResponse });
        } else {
          alert('Login failed');
        }
      } else {
        alert('Login failed');
      }
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
      email: '',
      senha: '',
    },
    validationSchema: signInSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h1> Entrar no X </h1>
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
      {status && status.passwordError && (
        <p className="error">{status.passwordError}</p>
      )}
      <Button variant="modalMainSubmit" disabled={isSubmitting} type="submit">
        Entrar
      </Button>
    </form>
  );
};

export default SignIn;

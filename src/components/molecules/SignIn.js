import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useFormik } from 'formik';
import { signInSchema } from '../../schemas/SignInSchema';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ handleClose }) => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const data = await loginUser(values);

    if (data && data.token) {
      navigate('/feed');
    } else {
      alert('Login failed');
    }
    actions.resetForm();
    handleClose();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
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
        className={errors.email && touched.email ? 'input-error' : ''}
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      <Input
        id="senha"
        type="password"
        placeholder="Senha"
        value={values.senha}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.senha && touched.senha ? 'input-error' : ''}
      />
      {errors.senha && touched.senha && <p className="error">{errors.senha}</p>}
      <Button disabled={isSubmitting} type="submit">
        Entrar
      </Button>
    </form>
  );
};

export default SignIn;

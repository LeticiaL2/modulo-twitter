import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/SignUpSchema";
import { registerUser } from "../../services/user";



const SignUp = ({ handleClose }) => {

    const onSubmit = async (values, actions) => {
        const response = await registerUser(values);
        if (response.status === false) {
            console.log({ email: response.mensagem.texto });
        } else {
            alert('Registration successful!');
            actions.resetForm();
            handleClose();
            //TODO maybe redirect to the feed page with the new user logged in
        }
    };

    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({ 
        initialValues: {
            nome: '',
            usuario: '',
            email: '',
            senha: ''
        },
        validationSchema: signUpSchema,
        onSubmit
    });

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <h1>Sign Up to Tweeter</h1>
            <input 
                id="nome" 
                type="text" 
                placeholder="Nome"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.nome && touched.nome ? "input-error" : ""}
            />
            {errors.nome && touched.nome && <p className="error">{errors.nome}</p>}
            <input
                id="usuario" 
                type="text" 
                placeholder="Usuário" 
                value={values.usuario}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.usuario && touched.usuario ? "input-error" : ""}
            />
            {errors.usuario && touched.usuario && <p className="error">{errors.usuario}</p>}
            <input
                id="email" 
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
            <input
                id="senha" 
                type="password" 
                placeholder="Senha"
                value={values.senha}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.senha && touched.senha ? "input-error" : ""}
            />
            {errors.senha && touched.senha && <p className="error">{errors.senha}</p>}
            <button disabled={isSubmitting} type="submit">Sign Up</button>
        </form>
    )
}

export default SignUp;
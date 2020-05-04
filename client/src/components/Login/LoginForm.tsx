import { useFormik } from 'formik';
import { LoginField, LoginCheckbox, LoginButton } from "./LoginElements";

export const LoginForm = () => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => { }
  });

  return (
    <form className="box" onSubmit={formik.handleSubmit}>
      <LoginField label='Username' icon='fa fa-user'>
        <input
          id='username'
          type='text'
          className="input"
          placeholder='e.g. swaggman'
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />
      </LoginField>
      <LoginField label='Password' icon='fa fa-lock'>
        <input
          id='password'
          type='password'
          className="input"
          placeholder='********'
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
      </LoginField>
      <LoginCheckbox />
      <LoginButton />
    </form >
  );
}

export default LoginForm;

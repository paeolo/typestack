import { useFormik } from 'formik';
import { LoginField, LoginCheckbox, LoginButton } from "./LoginElements";
import { useInjection } from '../../hooks';
import { UserStore } from '../../stores';
import { StoresBindings } from '../../contexts';

export const LoginForm = () => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async values => {
      userStore.login({
        username: values.username,
        password: values.password
      })
    }
  });

  return (
    <form className="box" onSubmit={formik.handleSubmit}>
      <LoginField label='Username' icon='fa fa-user'>
        <input id='username' className="input"
          type='text'
          placeholder='e.g. swaggman'
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />
      </LoginField>
      <LoginField label='Password' icon='fa fa-lock'>
        <input id='password' className="input"
          type='password'
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

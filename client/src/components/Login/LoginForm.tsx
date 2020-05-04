import { LoginField, LoginCheckbox, LoginButton } from "./LoginElements";

export const LoginForm = () => {
  return (
    <form className="box">
      <LoginField
        label='Email'
        type='email'
        placeholder='e.g. alexjohnson@gmail.com'
        icon='fa fa-envelope'
      />
      <LoginField
        label='Password'
        type='password'
        placeholder='********'
        icon='fa fa-lock'
      />
      <LoginCheckbox />
      <LoginButton />
    </form >
  );
}

export default LoginForm;

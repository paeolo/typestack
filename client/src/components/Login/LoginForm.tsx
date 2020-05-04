import { LoginField, LoginCheckbox, LoginButton } from "./LoginElements";

export const LoginForm = () => {
  return (
    <form className="box">
      <LoginField
        label='Username'
        type='text'
        placeholder='e.g. swaggman'
        icon='fa fa-user'
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

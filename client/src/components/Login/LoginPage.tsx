import LoginForm from './LoginForm';
import { LoginTitle } from './LoginTitle';

export const LoginPage = () => {
  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <LoginTitle />
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default LoginPage;

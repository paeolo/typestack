import React, { useEffect } from 'react';

import { useObserver } from 'mobx-react-lite';
import { useInjection } from '../hooks/use-injection';
import { UserStore } from '../stores';
import { StoresBindings } from '../contexts/keys';

const IndexPage = () => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);

  useEffect(() => {
    //userStore.login({ username: 'string', password: 'string' })
  }, []);

  return useObserver(() =>
    <React.Fragment>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" className="box">
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input type="password" placeholder="*******" className="input" required />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" /> Remember me
                      </label>
                  </div>
                  <div className="field">
                    <button className="button is-success">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default IndexPage;

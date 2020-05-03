import React, { useEffect } from 'react';

import { useObserver } from 'mobx-react-lite';
import { useInjection } from '../hooks/use-injection';
import { UserStore } from '../stores';
import { StoresBindings } from '../contexts/keys';

const IndexPage = () => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);

  useEffect(() => {
    userStore.login({ username: 'string', password: 'string' })
  }, []);

  return useObserver(() =>
    <div>
      <p>Welcome to next.js!</p>
      <p>
        <pre>
          {JSON.stringify(userStore.currentUser, undefined, 2)}
        </pre>
      </p>
    </div>
  );
}

export default IndexPage;

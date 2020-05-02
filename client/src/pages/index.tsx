import React, { useEffect } from 'react';

import { useStores } from '../hooks';
import { useObserver } from 'mobx-react-lite';

const IndexPage = () => {

  const { userStore } = useStores();

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

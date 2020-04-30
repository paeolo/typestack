import React, { useState, useEffect } from 'react';

import { User, UserRole } from '@openapi/schemas';
import { UserController } from '@openapi/routes';

const IndexPage = () => {

  console.log(UserRole.ADMIN);
  const [user, setUser] = useState({} as User);

  const getUser = async () => {
    await UserController.login({ username: 'string', password: 'string' });
    return await UserController.currentUser();
  }

  useEffect(() => {
    getUser()
      .then(value => setUser(value));
  }, [user.id]);

  return (
    <div>
      <p>Welcome to next.js!</p>
      <p>
        <pre>
          {JSON.stringify(user, undefined, 2)}
        </pre>
      </p>
    </div>
  );
}

export default IndexPage;

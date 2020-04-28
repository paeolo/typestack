import React, { useState, useEffect } from 'react';

import { OpenAPI } from '@openapi/.';
import { PingResponse } from '@openapi/schemas';
import { PingController } from '@openapi/routes';

OpenAPI.options.url = 'http://localhost:3000/api';

const IndexPage = () => {
  const [response, setResponse] = useState({} as PingResponse);

  useEffect(() => {
    PingController.ping()
      .then(value => setResponse(value))
  }, [response.greeting]);
  return (
    <div>
      <p>Welcome to next.js!</p>
      <p>{response.greeting}</p>
      <p>
        <pre>
          {JSON.stringify(response, undefined, 2)}
        </pre>
      </p>
    </div>
  );
}

export default IndexPage;


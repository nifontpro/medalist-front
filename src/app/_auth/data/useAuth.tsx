'use client';

import { useEffect, useRef, useState } from 'react';
import Keycloak from 'keycloak-js';

const useAuth = () => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const client = new Keycloak({
      url: 'http://localhost:8180/',
      realm: 'todoapp-realm',
      clientId: 'todoapp-client',
    });

    client
      .init({
        onLoad: 'login-required',
        flow: 'standard',
        redirectUri: 'http://localhost:3000/redirect',
      })
      .then((res) => setLogin(res));
  }, []);

  return isLogin;
};

export default useAuth;

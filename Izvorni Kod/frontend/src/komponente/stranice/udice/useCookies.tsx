import { useState } from 'react';

export default function useToken() {
  const getMBO = () => {
    const mbo = sessionStorage.getItem('mbo');
    return mbo;
  };

  const [token, setToken] = useState(getMBO());

  const saveToken = (userMBO: string) => {
    sessionStorage.setItem('mbo', userMBO);
    setToken(userMBO);
  };

  return {
    setToken: saveToken,
    token
  }
}

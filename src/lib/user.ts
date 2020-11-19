import { apiUrl } from "../constants";

export async function login(email: string, password: string) {
  const data =  {
    email,
    password,
  };

  const response = await fetch(`${apiUrl}/login/local`, {
    method: 'POST',
    credentials: 'include' as 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const responseJSON = await response.json();
  responseJSON.status = response.status;
  if (!response.ok) {
    return Promise.reject(responseJSON);
  }
  localStorage.setItem('jwt', responseJSON.token);
  return responseJSON;
}

export function isLoggedIn() {
  return localStorage.getItem('jwt');
}
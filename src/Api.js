const API_ROOT = `http://localhost:3001/api/v1`;
const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: token
};

const getPaintings = () => {
  return fetch(`${API_ROOT}/paintings/`, { headers: headers }).then(res =>
    res.json()
  );
};

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers
  }).then(res => res.json());
};

const getUsers = () => {
  return fetch(`${API_ROOT}/users`, {
    headers,
  }).then(res => res.json());
}

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  paintings: {
    getPaintings
  }
};

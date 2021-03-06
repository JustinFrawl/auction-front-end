const baseUrl = 'https://auction-back-end.herokuapp.com/api/v1/'

export default class Auth {
  static login (loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }



// static getCurrentUser = () => {
//   return fetch(`${baseUrl}/current_user`, {
//     headers: {
//       'content-type': 'application/json',
//       'accept': 'application/json',
//       'Authorization': `bearer ${localStorage.getItem('token')}`
//     }
//   }).then(res => res.json())
// };
}


function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`
  }
}

// 'Authorization': 'bearer ' + localStorage.getItem('token')

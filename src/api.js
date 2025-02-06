export function getUserInfo() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-31/users/me', {
    headers: {
      authorization: '36d03c96-8ae6-42bf-a42e-0f64d965ef64'
    }
  })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export function getCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
    headers: {
      authorization: '36d03c96-8ae6-42bf-a42e-0f64d965ef64'
    }
  })
  .then((res)=>{
    if(res.ok){
      return res.json()
    }
    return Promise.reject(res.status)
  })
}

export function patchUserInfo(newName, newAbout) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '36d03c96-8ae6-42bf-a42e-0f64d965ef64',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })})
    .then((res)=>{
      if(res.ok){
        return res.json();
      }
      return Promise.reject(res.status);
    })
}

export function postCard(name, link){
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
    method: 'POST',
    headers: {
      authorization: '36d03c96-8ae6-42bf-a42e-0f64d965ef64',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then((res)=>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

export function deleteCardFromServer(_id){
  return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/${_id}`, {
    method: 'DELETE',
    headers: {
      authorization: '36d03c96-8ae6-42bf-a42e-0f64d965ef64',
    },
  }) 
    .then((res)=>{
      if(res.ok){
        return;
      }
      return Promise.reject(res.status);
    })
}
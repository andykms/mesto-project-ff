const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: '36d03c96-8ae6-42bf-a42e-0f64d965ef64',
    'Content-Type': 'application/json'
  }
}

function baseResponse(res) {
  if(res.ok){
    return res.json()
  }
  return Promise.reject(res.status)
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(baseResponse)
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(baseResponse)
}

export function patchUserInfo(newName, newAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })})
    .then(baseResponse)
}

export function postCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then(baseResponse)
}

export function deleteCardFromServer(_id){
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
  }) 
    .then(baseResponse)
}

export function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
  })
  .then(baseResponse)
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(baseResponse)
}

function checkImage(url) {
  return fetch(url, {
    method: 'HEAD',
  })
    .then((res)=>{
      if(res.ok) {
        return res;
      }
      return Promise.reject(`К сожалению, не смогли обновить аватар профиля: ошибка ${res.status}`);
    })
    .then((res)=>{
      if (res.headers.get('Content-Type').includes('image') ) {
        return Promise.resolve();
      }
    })
}

export function patchUserAvatar(url) {
  return checkImage(url)
    .then(()=>{
      return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: url,
        }),
      })
    })
    .then(baseResponse)
}
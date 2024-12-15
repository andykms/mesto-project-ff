// @todo: Темплейт карточки
function newCardsList() {
  initialCards.forEach(function(item) {
    newCard(item['name'], item['link']);
  });
}


// @todo: DOM узлы
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

//Чтобы получить содержимое template, нужно обратиться к его свойству content
const addCard = document.querySelector('#card-template').content;
newCardsList();

// @todo: Функция создания карточки
function newCard(name, link) {
  const newCard = addCard.querySelector('li').cloneNode(true);
  newCard.querySelector('.card__image').setAttribute('src', link);
  newCard.querySelector('.card__image').setAttribute('alt', name);
  newCard.querySelector('.card__title').textContent = name;
  newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  showCards(newCard);
}


// @todo: Функция удаления карточки
function deleteCard(event) {
  //У объекта event есть свойство target. В нём хранится элемент, на котором сработало событие
  const listItem = event.target.closest('li');
  listItem.remove();
}


// @todo: Вывести карточки на страницу
function showCards(newCard) {
  //console.log("Проверяем на наличие в списке данной карточки");
  const currentCardsPseudo = cardList.querySelectorAll('li');
  const currentCards = Array.from(currentCardsPseudo);
  const isCurrentShow = currentCards.find(function (item) {
    return (item.querySelector('img').src === newCard.querySelector('img').src) && (item.querySelector('.card__title').textContent === newCard.querySelector('.card__title').textContent);
  });
  if(!isCurrentShow) {
    //Карточки нет в списке! Добавляем его;
    cardList.append(newCard);
  }
}
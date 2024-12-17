// @todo: Темплейт карточки
function createCardsList() {
  initialCards.forEach(function(item) {
    cardList.append(createCard(item['name'], item['link'], deleteCard));
  });
}


// @todo: DOM узлы
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

//Чтобы получить содержимое template, нужно обратиться к его свойству content
const addCard = document.querySelector('#card-template').content;
createCardsList();

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const newCard = addCard.querySelector('li').cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return newCard;
}


// @todo: Функция удаления карточки
function deleteCard(event) {
  //У объекта event есть свойство target. В нём хранится элемент, на котором сработало событие
  const listItem = event.target.closest('li');
  listItem.remove();
}



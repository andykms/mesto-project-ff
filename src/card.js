import { baseSelectors } from "./constants";
import { putLike, deleteLike } from "./api";


export function createCard(addCard, name, link, deleteCard, toggleLikeCard, openImageModal, isMyCard, likeCount, hasMyLike, cardId) {
  const newCard = addCard.querySelector(".places__item").cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.addEventListener('click',openImageModal);

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  
  if(isMyCard) {
    deleteButton.addEventListener('click', (evt) => deleteCard(evt, cardId));
  } else {
    deleteButton.remove();
  }

  const likeCountElement = newCard.querySelector('.card__like-count');
  likeCountElement.textContent = likeCount;

  const likeButton = newCard.querySelector(".card__like-button");

  if(hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener('click', (evt) => toggleLikeCard(evt, cardId, likeCountElement));
  
  return newCard;
}

export function toggleLikeCard(evt, cardId, likeCount) {
  const likeButton = evt.target;
  if(likeButton.classList.contains(baseSelectors.cardLikeButtonActive)) {
    deleteLike(cardId)
    .then((res)=>{
      likeButton.classList.remove(baseSelectors.cardLikeButtonActive);
      likeCount.textContent = res.likes.length;
    })
    .catch((err)=>{
      console.log(`${messages.errorDeleteLike} ${err}`);
    })
  } else {
    putLike(cardId)
      .then((res)=>{
        likeButton.classList.add(baseSelectors.cardLikeButtonActive);
        likeCount.textContent = res.likes.length;
      })
      .catch((err)=>{
        console.log(`${messages.errorPutLike} ${err}`);
      })
  }
}
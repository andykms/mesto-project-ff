import { baseSelectors } from "../constants";
import { putLike, deleteLike, deleteCardFromServer } from "./api";
import { closeModal } from "./modal";

export function createCard(addCard, name, link, isMyCard, likeCount, hasMyLike, cardId, {openConfirmationPopup, toggleLikeCard, openImageModal, deleteCard}) {
  const newCard = addCard.querySelector(".places__item").cloneNode(true);
  newCard.id = cardId;
  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  if(openImageModal) {
    cardImg.addEventListener('click',openImageModal);
  }

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  
  if(isMyCard) {
    if(deleteCard && openConfirmationPopup){
      deleteButton.addEventListener('click', (evt) => openConfirmationPopup(evt, deleteCard, cardId))
    };
  } else {
    deleteButton.remove();
  }

  const likeCountElement = newCard.querySelector('.card__like-count');
  likeCountElement.textContent = likeCount;

  const likeButton = newCard.querySelector(".card__like-button");

  if(hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if(toggleLikeCard) {
    likeButton.addEventListener('click', (evt) => toggleLikeCard(evt, cardId, likeCountElement));
  }
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

export function deleteCard(evt) {
  evt.preventDefault();
  const popupDeleteCard = evt.currentTarget;
  const cardId = popupDeleteCard.id;
  const listItem = document.getElementById(`${cardId}`);
  deleteCardFromServer(cardId)
    .then(()=>{
      listItem.remove();
      closeModal(popupDeleteCard);
    })
    .catch((err)=>{
      console.log(`${messages.errorDeleteCard} ${err}`);
    })
    .finally(()=>{
      popupDeleteCard.removeEventListener('submit', deleteCard);
      })
}
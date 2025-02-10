export const baseSelectors = {
  content: '.content',
  contentPage: '.page__content',
  cardList: '.places__list',
  addCard: '#card-template',
  popupEdit: '.popup_type_edit',
  popupNewCard: '.popup_type_new-card',
  popupImage: '.popup_type_image',
  modalCaption: '.popup__caption',
  popupEditAvatar: '.popup_type_edit-avatar',
  popupDeleteCardTemplate: '#card_popup-delete',
  modalImage: '.popup__image',
  buttonEditProfile: ".profile__edit-button",
  buttonAddCard: ".profile__add-button",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileImage: ".profile__image",
  submitButton: ".popup__button",
  popupDeleteCard: '.popup_type_delete-confirm',
  cardLikeButtonActive: "card__like-button_is-active",
}

export const selectorNames = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  patternErrorMessage: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
};

export const messages = {
  saving: 'Сохранение...',
  save: 'Сохранить',
  errorGiveProfile: 'К сожалению, не смогли получить профиль: ошибка',
  errorUpdateProfile: 'К сожалению, не смогли обновить данные профиля: ошибка',
  errorPublicateCard: 'К сожалению, не смогли опубликовать новое место: ошибка',
  errorDeleteCard: 'К сожалению, не смогли удалить публикацию: ошибка',
  errorDeleteLike: 'К сожалению, произошла ошибка при снятии лайка: ошибка',
  errorPutLike: 'К сожалению, произошла ошибка при поставлении лайка: ошибка',
  errorChangeAvatar: 'К сожалению, не смогли обновить аватар: ошибка',
}
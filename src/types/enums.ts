export enum REQUEST_STATUS {
  IDLE = 'idle',
  ONPROGRESS = 'onprogress',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export enum CATEGORY_TYPE {
  ARTICLE = 'article',
  BOOK = 'book',
  NEWS = 'news'
}

export enum FAMILY_RELATIONS {
  SELF = 1,
  FATHER = 2,
  MOTHER = 3,
  SISTER = 4,
  BROTHER = 5,
  UNCLE = 6,
  AUNT = 7,
  GRANDFATHER = 8,
  GRANDMOTHER = 9
}

export enum USER_TYPE {
  USER = 'user',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  AUTHOR = 'author'
}

export enum USER_STATE {
  PENDING = 'pending',
  ACTIVE = 'active',
  BUSY = 'busy',
  BANNED = 'banned'
}

export enum GENDERS {
  MALE = 'male',
  FEMALE = 'female'
}

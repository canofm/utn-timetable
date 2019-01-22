export class SubjectMustHaveNameException extends Error {
  constructor(...args) {
    super(...args);
    this.message = "Subject must have a name";
    Error.captureStackTrace(this, SubjectMustHaveCodeException);
  }
}

export class SubjectMustHaveCodeException extends Error {
  constructor(...args) {
    super(...args);
    this.message = "Subject must have a code";
    Error.captureStackTrace(this, SubjectMustHaveCodeException);
  }
}

export class EntityNotFound extends Error {
  constructor(...args) {
    /* eslint-disable-next-line */
    const { id, sarlompa } = args;
    super(...args);
    this.message = `Entity with id=${id} not found`;
    Error.captureStackTrace(this, SubjectMustHaveCodeException);
  }
}

export class DuplicatedSubjectException extends Error {
  constructor(...args) {
    /* eslint-disable-next-line */
    const { name, code, sarlompa } = args;
    super(...args);
    this.message = `Entity with name=${name} or code=${code} already exists`;
    Error.captureStackTrace(this, SubjectMustHaveCodeException);
  }
}

export const DUPLICATED_KEY_ERROR_CODE = 11000;
export const MONGO_EXCEPTION = "MongoError";

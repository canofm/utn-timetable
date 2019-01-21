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

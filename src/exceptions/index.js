import { merge } from "lodash";

class Exception extends Error {
  constructor(clazz, ...args) {
    super(...args);
    this.message = {};
    Error.captureStackTrace(this, clazz);
  }

  set text(text) {
    merge(this.message, { text });
  }
  set type(type) {
    merge(this.message, { type });
  }
}

export class PropertyLeftException extends Exception {
  constructor(...args) {
    super(PropertyLeftException, ...args);
    const entity = args[0];
    const property = args[1];
    this.text = `${entity} must have a ${property}`;
    this.type = "property_left";
  }
}

export class EntityNotFound extends Exception {
  constructor(...args) {
    super(EntityNotFound, ...args);
    const entity = args[0];
    const id = args[1];
    this.text = `${entity} with id=${id} not found`;
    this.type = "entity_not_found";
    this.statusCode = 404;
  }
}

export class DuplicatedEntityException extends Exception {
  constructor(...args) {
    super(DuplicatedEntityException, ...args);
    this.text = args[0];
    this.type = "duplicated_subject_exception";
  }
}

export const DUPLICATED_KEY_ERROR_CODE = 11000;
export const MONGO_EXCEPTION = "MongoError";

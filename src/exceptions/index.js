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

export class PropertyRequiredException extends Exception {
  constructor(...args) {
    super(PropertyRequiredException, ...args);
    const entity = args[0];
    const property = args[1];
    this.text = `${entity} must have a ${property}`;
    this.type = "property_required_exception";
    this.statusCode = 400;
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
    this.type = "duplicated_entity_exception";
    this.statusCode = 409;
  }
}

export class SchemaValidationException extends Exception {
  constructor(...args) {
    super(SchemaValidationException, ...args);
    this.text = args[0];
    this.type = "schema_validator_exception";
    this.statusCode = 400;
  }
}

export const DUPLICATED_KEY_ERROR_CODE = 11000;
export const MONGO_EXCEPTION = "MongoError";
export const SCHEMA_VALIDATOR_EXCEPTION = "ValidationError";

import { merge } from "lodash";

export default class ControllerFactory {
  static createCRUD(service, overrides = {}) {
    class Controller {
      create(req, res, next) {
        return service
          .create(req.body)
          .then(entity => res.status(201).json(entity))
          .catch(err => next(err));
      }

      update(req, res, next) {
        return service
          .update(req.params.id, req.body)
          .then(entity => res.status(200).json(entity))
          .catch(err => next(err));
      }

      get(req, res, next) {
        return service
          .get(req.params.id)
          .then(entity => res.status(200).json(entity))
          .catch(err => next(err));
      }

      getAll(req, res, next) {
        return service
          .getAll()
          .then(entity => res.status(200).json(entity))
          .catch(err => next(err));
      }

      delete(req, res, next) {
        return service
          .delete(req.params.id)
          .then(entity => res.status(204).json(entity))
          .catch(err => next(err));
      }
    }
    return merge(new Controller(), overrides);
  }
}

import { EntityNotFound } from "../../exceptions";
import { merge } from "lodash";

class RepositoryFactory {
  static createCRUD(model, mapper, modelName, ...overrides) {
    class CRUDRepository {
      get(id) {
        return model
          .findById(id)
          .then(mapper.toDomain)
          .catch(() => {
            throw new EntityNotFound(modelName, id);
          });
      }

      getAll() {
        // TODO: Add pagination
        // TODO: Add filters
        return model.find({}).then(entities => {
          return entities.map(entity => {
            return mapper.toDomain(entity);
          });
        });
      }

      create(entity) {
        return model.create(entity).then(mapper.toDomain);
      }

      update(id, entity) {
        return this.get(id)
          .then(oldEntity => merge(oldEntity, entity))
          .then(mergedEntity => mergedEntity.save())
          .then(mapper.toDomain);
      }

      delete(id) {
        return model.deleteOne({ id });
      }
    }
    return merge(new CRUDRepository(), overrides);
  }
}

export default RepositoryFactory;

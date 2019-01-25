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
        return model.findOneAndUpdate({ _id: id }, entity, { new: true }).then(mapper.toDomain);
      }

      delete(id) {
        return model.deleteOne({ _id: id }).then(result => {
          if (result.deletedCount === 0) {
            throw new EntityNotFound(modelName, id);
          }
          return result;
        });
      }
    }
    return merge(new CRUDRepository(), overrides);
  }
}

export default RepositoryFactory;

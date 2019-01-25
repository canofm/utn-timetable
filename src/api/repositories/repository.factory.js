import { EntityNotFound } from "../../exceptions";
import { merge, isEmpty } from "lodash";

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

      async getAll() {
        // TODO: Add pagination
        // TODO: Add filters
        const entities = await model.find({});
        return entities.map(mapper.toDomain);
      }

      create(entity) {
        return model.create(entity).then(mapper.toDomain);
      }

      async update(id, entity) {
        const updatedEntity = await model.findOneAndUpdate({ _id: id }, entity, { new: true });
        if (isEmpty(updatedEntity)) {
          throw new EntityNotFound(modelName, id);
        }
        return mapper.toDomain(updatedEntity);
      }

      async delete(id) {
        const result = await model.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          throw new EntityNotFound(modelName, id);
        }
        return result;
      }
    }
    return merge(new CRUDRepository(), overrides);
  }
}

export default RepositoryFactory;

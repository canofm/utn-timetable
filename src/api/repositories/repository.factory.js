import { EntityNotFound } from "../../exceptions";
import { merge } from "lodash";

class RepositoryFactory {
  static createCRUD(model) {
    class CRUDRepository {
      get(id) {
        return model.findById(id).catch(() => {
          throw new EntityNotFound(id);
        });
      }

      getAll() {
        return model.find({});
      }

      create(entity) {
        return model.create(entity);
      }

      update(id, entity) {
        return this.get(id)
          .then(oldEntity => merge(oldEntity, entity))
          .then(mergedEntity => mergedEntity.save());
      }

      delete(id) {
        return this.get(id).then(entity => entity.remove());
      }
    }
    return new CRUDRepository();
  }
}

export default RepositoryFactory;

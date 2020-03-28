import {rootEntities} from './rootEntities';
import {FEATURE_SELECTOR, HANDLER_RELATED_ENTITY, HANDLER_ROOT_ENTITIES, ID_TYPES, TRANSFORMER} from './types';

export function rootEntitiesSelector<STORE, ENTITY, TRANSFORMED_ENTITY>(
    featureSelector: FEATURE_SELECTOR<STORE, ENTITY>,
    transformer?: TRANSFORMER<ENTITY, TRANSFORMED_ENTITY>,
): (...relations: Array<HANDLER_RELATED_ENTITY<STORE, ENTITY>>) => HANDLER_ROOT_ENTITIES<STORE, ENTITY, ID_TYPES> {
    const callback = (...relations: Array<HANDLER_RELATED_ENTITY<STORE, ENTITY>>) =>
        transformer
            ? rootEntities(featureSelector, transformer, ...relations)
            : rootEntities(featureSelector, ...relations);
    callback.ngrxEntityRelationShip = 'rootEntitiesSelector';

    return callback;
}

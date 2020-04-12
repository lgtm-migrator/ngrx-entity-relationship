import {iif, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {HANDLER_ROOT_ENTITIES, HANDLER_ROOT_ENTITY, ID_TYPES, STORE_INSTANCE} from '../types';

export function relationships<STORE, ENTITY>(
    store: STORE_INSTANCE<STORE>,
    selector: HANDLER_ROOT_ENTITIES<STORE, ENTITY, ENTITY, ID_TYPES>,
): (next: Observable<Array<ENTITY>>) => Observable<Array<ENTITY>>;

export function relationships<STORE, ENTITY, TRANSFORMED>(
    store: STORE_INSTANCE<STORE>,
    selector: HANDLER_ROOT_ENTITIES<STORE, ENTITY, TRANSFORMED, ID_TYPES>,
): (next: Observable<Array<ENTITY>>) => Observable<Array<TRANSFORMED>>;

export function relationships<STORE, ENTITY>(
    store: STORE_INSTANCE<STORE>,
    selector: HANDLER_ROOT_ENTITY<STORE, ENTITY, ENTITY, ID_TYPES>,
): (next: Observable<ENTITY>) => Observable<ENTITY>;

export function relationships<STORE, ENTITY, TRANSFORMED>(
    store: STORE_INSTANCE<STORE>,
    selector: HANDLER_ROOT_ENTITY<STORE, ENTITY, TRANSFORMED, ID_TYPES>,
): (next: Observable<ENTITY>) => Observable<TRANSFORMED>;

export function relationships<STORE, SET, TRANSFORMED, TYPES>(
    store: STORE_INSTANCE<STORE>,
    selector: HANDLER_ROOT_ENTITY<STORE, SET, SET | TRANSFORMED, TYPES>,
): (next: Observable<SET>) => Observable<undefined | SET | TRANSFORMED> {
    return next =>
        next.pipe(
            switchMap(input => {
                const result = of(input);
                return iif(
                    () => input === undefined,
                    result,
                    result.pipe(
                        map(set => {
                            if (Array.isArray(set)) {
                                return (set.map(entity => selector.idSelector(entity)) as any) as TYPES;
                            }
                            return (selector.idSelector(set) as any) as TYPES;
                        }),
                        switchMap(id => store.select(selector, id)),
                    ),
                );
            }),
        );
}

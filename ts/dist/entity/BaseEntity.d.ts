import { AirtableEntityBase } from '../AirtableEntityBase';
import type { AirtableSDK } from '../AirtableSDK';
import type { Control } from '../types';
import type { Base, BaseListMatch } from '../AirtableTypes';
declare class BaseEntity extends AirtableEntityBase<Base> {
    constructor(client: AirtableSDK, entopts: any);
    make(this: BaseEntity): BaseEntity;
    list(this: any, reqmatch?: BaseListMatch, ctrl?: Control): Promise<BaseEntity[]>;
}
export { BaseEntity };

import { AirtableEntityBase } from '../AirtableEntityBase';
import type { AirtableSDK } from '../AirtableSDK';
import type { Control } from '../types';
import type { RecordType, RecordLoadMatch, RecordListMatch, RecordCreateData } from '../AirtableTypes';
declare class RecordEntity extends AirtableEntityBase<RecordType> {
    constructor(client: AirtableSDK, entopts: any);
    make(this: RecordEntity): RecordEntity;
    load(this: any, reqmatch?: RecordLoadMatch, ctrl?: Control): Promise<RecordEntity>;
    list(this: any, reqmatch?: RecordListMatch, ctrl?: Control): Promise<RecordEntity[]>;
    create(this: any, reqdata?: RecordCreateData, ctrl?: Control): Promise<RecordEntity>;
}
export { RecordEntity };

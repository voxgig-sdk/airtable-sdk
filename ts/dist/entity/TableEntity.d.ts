import { AirtableEntityBase } from '../AirtableEntityBase';
import type { AirtableSDK } from '../AirtableSDK';
import type { Control } from '../types';
import type { Table, TableListMatch, TableCreateData } from '../AirtableTypes';
declare class TableEntity extends AirtableEntityBase<Table> {
    constructor(client: AirtableSDK, entopts: any);
    make(this: TableEntity): TableEntity;
    list(this: any, reqmatch?: TableListMatch, ctrl?: Control): Promise<TableEntity[]>;
    create(this: any, reqdata?: TableCreateData, ctrl?: Control): Promise<TableEntity>;
}
export { TableEntity };

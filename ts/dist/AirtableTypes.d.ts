export interface Base {
    id?: string;
    name?: string;
    permissionLevel?: string;
}
export interface BaseListMatch {
    id?: string;
    name?: string;
    permissionLevel?: string;
}
export interface RecordType {
    createdTime?: string;
    fields?: Record<string, any>;
    id?: string;
    records?: any[];
}
export interface RecordLoadMatch {
    base_id: string;
    record_id: string;
    table_id: string;
}
export interface RecordListMatch {
    base_id: string;
    table_id: string;
}
export interface RecordCreateData {
    base_id: string;
    table_id: string;
    createdTime?: string;
    fields?: Record<string, any>;
    id?: string;
    records?: any[];
}
export interface Table {
    description?: string;
    id?: string;
    name?: string;
    primaryFieldId?: string;
}
export interface TableListMatch {
    base_id: string;
}
export interface TableCreateData {
    base_id: string;
    description?: string;
    id?: string;
    name?: string;
    primaryFieldId?: string;
}

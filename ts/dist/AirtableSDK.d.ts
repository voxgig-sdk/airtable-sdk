import { BaseEntity } from './entity/BaseEntity';
import { RecordEntity } from './entity/RecordEntity';
import { TableEntity } from './entity/TableEntity';
export type * from './AirtableTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AirtableEntityBase } from './AirtableEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AirtableSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Base(entopts?: Record<string, any>): BaseEntity;
    Record(entopts?: Record<string, any>): RecordEntity;
    Table(entopts?: Record<string, any>): TableEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AirtableSDK;
    tester(testopts?: any, sdkopts?: any): AirtableSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AirtableSDK;
export { stdutil, config, BaseFeature, AirtableEntityBase, AirtableSDK, SDK, };

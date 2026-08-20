import { Context } from './Context';
declare class AirtableError extends Error {
    isAirtableError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AirtableError };

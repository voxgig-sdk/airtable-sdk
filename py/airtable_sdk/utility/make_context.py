# Airtable SDK utility: make_context

from airtable_sdk.core.context import AirtableContext


def make_context_util(ctxmap, basectx):
    return AirtableContext(ctxmap, basectx)

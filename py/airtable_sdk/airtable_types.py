# Typed models for the Airtable SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Base(TypedDict, total=False):
    id: str
    name: str
    permissionLevel: str


class BaseListMatch(TypedDict, total=False):
    id: str
    name: str
    permissionLevel: str


class CreateRecord(TypedDict, total=False):
    records: list


class CreateRecordCreateDataRequired(TypedDict):
    base_id: str
    table_id: str


class CreateRecordCreateData(CreateRecordCreateDataRequired, total=False):
    records: list


class GetRecord(TypedDict):
    pass


class GetRecordLoadMatch(TypedDict):
    base_id: str
    record_id: str
    table_id: str


class ListRecord(TypedDict, total=False):
    createdTime: str
    fields: dict
    id: str


class ListRecordListMatch(TypedDict):
    base_id: str
    table_id: str


class Table(TypedDict, total=False):
    description: str
    id: str
    name: str
    primaryFieldId: str


class TableListMatch(TypedDict):
    base_id: str


class TableCreateDataRequired(TypedDict):
    base_id: str


class TableCreateData(TableCreateDataRequired, total=False):
    description: str
    id: str
    name: str
    primaryFieldId: str

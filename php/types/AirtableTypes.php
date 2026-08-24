<?php
declare(strict_types=1);

// Typed models for the Airtable SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Base entity data model. */
class Base
{
    public ?string $id = null;
    public ?string $name = null;
    public ?string $permissionLevel = null;
}

/** Request payload for Base#list. */
class BaseListMatch
{
    public ?string $id = null;
    public ?string $name = null;
    public ?string $permissionLevel = null;
}

/** CreateRecord entity data model. */
class CreateRecord
{
    public ?array $records = null;
}

/** Request payload for CreateRecord#create. */
class CreateRecordCreateData
{
    public string $base_id;
    public string $table_id;
    public ?array $records = null;
}

/** GetRecord entity data model. */
class GetRecord
{
}

/** Request payload for GetRecord#load. */
class GetRecordLoadMatch
{
    public string $base_id;
    public string $record_id;
    public string $table_id;
}

/** ListRecord entity data model. */
class ListRecord
{
    public ?string $createdTime = null;
    public ?array $fields = null;
    public ?string $id = null;
}

/** Request payload for ListRecord#list. */
class ListRecordListMatch
{
    public string $base_id;
    public string $table_id;
}

/** Table entity data model. */
class Table
{
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $primaryFieldId = null;
}

/** Request payload for Table#list. */
class TableListMatch
{
    public string $base_id;
}

/** Request payload for Table#create. */
class TableCreateData
{
    public string $base_id;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $primaryFieldId = null;
}


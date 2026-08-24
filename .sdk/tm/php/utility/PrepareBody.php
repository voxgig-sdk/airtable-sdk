<?php
declare(strict_types=1);

// Airtable SDK utility: prepare_body

class AirtablePrepareBody
{
    public static function call(AirtableContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

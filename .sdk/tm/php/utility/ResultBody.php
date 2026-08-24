<?php
declare(strict_types=1);

// Airtable SDK utility: result_body

class AirtableResultBody
{
    public static function call(AirtableContext $ctx): ?AirtableResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

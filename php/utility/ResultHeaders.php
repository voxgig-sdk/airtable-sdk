<?php
declare(strict_types=1);

// Airtable SDK utility: result_headers

class AirtableResultHeaders
{
    public static function call(AirtableContext $ctx): ?AirtableResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

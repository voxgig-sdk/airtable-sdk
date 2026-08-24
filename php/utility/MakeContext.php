<?php
declare(strict_types=1);

// Airtable SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AirtableMakeContext
{
    public static function call(array $ctxmap, ?AirtableContext $basectx): AirtableContext
    {
        return new AirtableContext($ctxmap, $basectx);
    }
}

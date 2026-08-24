<?php
declare(strict_types=1);

// Airtable SDK exists test

require_once __DIR__ . '/../airtable_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AirtableSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}

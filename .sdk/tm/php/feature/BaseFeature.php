<?php
declare(strict_types=1);

// Airtable SDK base feature

class AirtableBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AirtableContext $ctx, array $options): void {}
    public function PostConstruct(AirtableContext $ctx): void {}
    public function PostConstructEntity(AirtableContext $ctx): void {}
    public function SetData(AirtableContext $ctx): void {}
    public function GetData(AirtableContext $ctx): void {}
    public function GetMatch(AirtableContext $ctx): void {}
    public function SetMatch(AirtableContext $ctx): void {}
    public function PrePoint(AirtableContext $ctx): void {}
    public function PreSpec(AirtableContext $ctx): void {}
    public function PreRequest(AirtableContext $ctx): void {}
    public function PreResponse(AirtableContext $ctx): void {}
    public function PreResult(AirtableContext $ctx): void {}
    public function PreDone(AirtableContext $ctx): void {}
    public function PreUnexpected(AirtableContext $ctx): void {}
}

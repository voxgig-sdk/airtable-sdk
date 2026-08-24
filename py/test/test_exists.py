# Airtable SDK exists test

import pytest
from airtable_sdk import AirtableSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AirtableSDK.test(None, None)
        assert testsdk is not None

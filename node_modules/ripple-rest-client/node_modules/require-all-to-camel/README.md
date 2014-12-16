## Require All to Camel Case

This module uses the require-all module underneath,
simplifying the interface and converting object keys from
snake case to camel case

## Installation

npm install require-all-to-camel


## Example

Given the following structure, require-all-to-camel should
return an object with externalAccounts, externalTransactions,
kycData, rippleAddresses, rippleTransactions, and users as keys.

    /lib/models/
    ├── external_accounts.js
    ├── external_transactions.js
    ├── kyc_data.js
    ├── ripple_addresses.js
    ├── ripple_transactions.js
    └── users.js

    var requireToCamel = require('require-all-to-camel');

    var models = requireToCamel(__dirname_+'/lib/models');

    assert(models.externalAccounts);
    assert(models.externalTransactions);
    assert(models.users);
    assert(models.kycData);
    assert(models.rippleAddresses);
    assert(models.rippleTransactions);


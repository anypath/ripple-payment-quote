var assert = require('assert');
var requireAllToCamel = require(__dirname+'/../');

describe('loading the ./models directory', function(){

  it('should convert to camel case', function(){

    models = requireAllToCamel(__dirname+'/models');

    assert(models.firstModel.propertyA === 'a nice property');
    assert(models.secondModel.propertyA === 'another nice property');

  });

});


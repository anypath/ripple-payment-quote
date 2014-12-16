requireAll = require('require-all');

function toCamelCase(string){
  return string.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); }); 
}

function requireAllToCamel(directory, target){
  if (!target) { target = {} }; 

  var objects = requireAll({
    dirname: directory,
    filter:  /(.+)\.js$/
  }); 
    
  for (name in objects){
    target[toCamelCase(name)] = objects[name];
  }

  return target;
}

module.exports = requireAllToCamel;


Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] == value){
      return key;
    }
  }
  return null;
};

module("Test API")
test( "Test one insert", function() {
  localStorage.clear();
  one_insert = zon('lerolero').insert('test one insert');
  ok(one_insert, "Test one insert");
  equal(1, localStorage.length);
  equal("lerolero|" + one_insert, localStorage.getKey('test one insert'));
});


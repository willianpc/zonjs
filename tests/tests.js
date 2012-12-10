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
test( "Test two insert", function() {
  localStorage.clear();

  one_insert = zon('lerolero').insert('test one insert');
  two_insert = zon('lerolero').insert('test two insert');

  ok(one_insert, "Test one insert");
  ok(two_insert, "Test two insert");

  equal(2, localStorage.length);
  equal("lerolero|" + one_insert, localStorage.getKey('test one insert'));
  equal("lerolero|" + two_insert, localStorage.getKey('test two insert'));
});


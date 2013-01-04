zonJS
=====

**zonJS** is a namespace based framework for using with the Storage API

It is inspired by a good friend and great DBA Javier Tomas Zon

zonJS is a mutation of my previous API miniDB and is intended to be a way of manipulating LocalStorage API data in a fancy way, like if you had working with a regular table.

How to use
-----------------------

 * zon(NAMESPACE).insert(rowAsJSON). Aliases: add, set;
 * zon(NAMESPACE).findOne(rowId). Alias: get;
 * zon(NAMESPACE).all();
 * zon(NAMESPACE).del(rowId). Alias: remove;
 * zon(NAMESPACE).each(function(index, rowId, data) {}). Alias: iterate;

Examples
------------------------

**Adding a new row to the user namespace**
```javascript
zon('user').insert({name: 'Willian', email: 'o.chambs@gmail.com'});
```
If the namespace storage doesn't exist, it will be created. The row id will be returned by the insert function

**Removing a row from the user namespace**
```javascript
zon('user').del('8739874397494');
```
**Listing all rows from the product namespace**
```javascript
zon('product').all(); // returns a map object containing key/value for each row
```
**Retrieving a row from the product namespace**
```javascript
var product = zon('product').findOne('4545498504854');
```

**Iterating all rows from the users namespace**
```javascript
function listUsers(index, rowId, data) {
  console.log((index+1) + " - " + data.name);
}

zon('users').each(listUsers);
```

Notes
------------------------

 * Any type of data can be stored. Even strings or numbers. However, JSON objects are preferable;
 * This API is in need of suggestions. Just keep in mind Storage API has a small limit of 5Mb;

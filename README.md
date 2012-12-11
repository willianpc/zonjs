zonJS
=====

**zonJS** is a table like framework for using with the Storage API

It is inspired by a good friend and great DBA Javier Tomas Zon

zonJS is a mutation of my previus API miniDB and is intended to be a way of manipulating Storage API data in a fancy way, like if you had working with a regular table.

How to use
-----------------------

 * zon(TABLE_NAME).insert(rowAsJSON);
 * zon(TABLE_NAME).findOne(rowId);
 * zon(TABLE_NAME).all();
 * zon(TABLE_NAME).del(rowId);

Examples
------------------------

**Adding a new row to the user table**

zon('user').insert({name: 'Willian', email: 'o.chambs@gmail.com'});

If the table doesn't exist, it will be created. The row id will be returned by the insert function

**Removing a row from the user table**

zon('user').del(8739874397494);

**Listing all rows from the product table**

zon('product').all(); // returns a map object containing key/value for each row

**Retrieving a row from the product table**

var product = zon('product').findOne(4545498504854);

Notes
------------------------

 * Any type of data can be stored. Even strings or numbers. However, JSON objects are preferable;
 * This API is in need of suggestions. Just keep in mind Storage API has a small limit of 5Mb;
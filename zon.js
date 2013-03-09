'use strict';

;var zon = (function(document, window, undefined) {

    //Object.create polyfill
    if (!Object.create) {
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw new Error('Object.create implementation only accepts the first parameter.');
            }
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    //make it work on IE < 8
    if (!window.localStorage) {
      window.localStorage = {
        getItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
          return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
          return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
          if(!sKey) { return; }
          document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
          this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          this.length--;
        },
        hasOwnProperty: function (sKey) {
          return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
      };
      window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
    }

    function all() {
        var result = {}, obj, k, offset;

        for(var i=0; i < localStorage.length; i++) {
            k = localStorage.key(i);
            offset = k.indexOf(this.tbname + '|');

            if(offset > -1) {
                try {
                    obj = JSON.parse(localStorage.getItem(k));
                } catch(err) {
                    obj = localStorage.getItem(k);
                }
                result[k.substr(k.indexOf('|')+1)] = obj;
            }
        }
        
        return result;
    }
    
    function iterate(fn) {
        var result = {}, obj, k, offset;

        for(var i=0; i < localStorage.length; i++) {
            k = localStorage.key(i);
            offset = k.indexOf(this.tbname + '|');

            if(offset > -1) {
                try {
                    obj = JSON.parse(localStorage.getItem(k));
                } catch(err) {
                    obj = localStorage.getItem(k);
                }
                
                fn(i, k.substr(k.indexOf('|')+1, k.length), obj);
            }
        }
        
        return result;
    }

    function get(k) {
        var obj;

        try {
            obj = JSON.parse(localStorage.getItem(this.tbname + '|' + k));
        } catch(err) {
            obj = localStorage.getItem(this.tbname + '|' + k);
        }
        return obj;
    }

    function insert(data, id) {
        if(!id) {
            id = generateId();
        }
    
        if(typeof(data) === 'object') {
            data = JSON.stringify(data);
        }

        localStorage.setItem(this.tbname + '|' + id, data);
        return id;
    }
    
    function remove(id) {
        localStorage.removeItem(this.tbname + '|' + id);
    }
    
    function update(id, data) {

        if(typeof(data) === 'object') {
            data = JSON.stringify(data);
        }

        localStorage.setItem(this.tbname + '|' + id, data);
    }
    
    function generateId() {
        return Date.now() + '' + Math.round(Math.random()*1e9);
    }
    
    var tmpTbl = {
        insert: insert,
        add: insert,
        set: insert,
        findOne: get,
        get: get,
        del: remove,
        remove: remove,
        all: all,
        iterate: iterate,
        each: iterate,
        update: update
    };
    
    //stores table objects already called
    var cachedTables = {};
    
    function tbls(tableName) {
        if(tableName in cachedTables) {
            return cachedTables[tableName];
        }
    
        var obj = Object.create(tmpTbl);
        obj.tbname = tableName;
        cachedTables[tableName] = obj;
        return obj;
    }
    
    return tbls;
})(document, window);

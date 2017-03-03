# XHRT (XMLHttpRequest Transfer)
The XHRTransfer allows you to send a service method passing a URL, a Data and a fallback, if necessary.

## Using XHRT you can:
  - Send REST methods;
  - Pass data values to a method;
  - Pass a URL fallback if the first fail;

### Installation
#### Using like a library
```sh
$ git clone https://github.com/mpahenrique/xhrt.git
```
```HTML
<body>
...
...
<script src="path/to/xhrt/index.js"></script>
</body>
```

#### Using like a module
```sh
$ npm install xhrt --save
```

### Usage
#### Using like a module
```js
var xhrt = require('xhrt');
```

### Methods
#### GET
###### Usage:
```
xhrt.get(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
xhrt.get('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### POST
###### Usage:
```
xhrt.post(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
xhrt.post('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### PUT
###### Usage:
```
xhrt.put(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
xhrt.put('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### PATCH
###### Usage:
```
xhrt.patch(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
xhrt.patch('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### DELETE
###### Usage:
```
xhrt.delete(URL: string, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
xhrt.get('URL_TO_CALL', 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```
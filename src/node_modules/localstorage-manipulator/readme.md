# LocalStorage Manipulator
Get and save data in localStorage easily.

Using LocalStorage Manipulator you can:
  - Get Data from localStorage;
  - Save Data from localStorage;

#### Instalation:
##### Using like a node_module [server-side building (Browserify, etc)]
###### IN NODE_MODULES ROOT FOLDER:
```sh
$ npm install localstorage-manipulator --save
```
##### Using like a library
###### IN YOUR HTML:
```html
<script src="download/localstorage/manipulator/here.js"></script>
``` 

#### Usage:
##### Using like a node_module [server-side building (Browserify, etc)]
```js
var storage = require('localstorage-manipulator');
storage.saveData('test', {value : 123});
var result = storage.getData('test'); // { value : 123 }
```

##### Using like a library
```js
saveData('test', { value : 123 });
var result = getData('test'); // { value : 123 }
```
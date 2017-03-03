'use strict';

function init(){

    function $both(method, url, data, fallback){
    
        return new Promise(function(resolve, reject){

            if (method === 'DELETE') {fallback = data; data = '';};
            data = (method !== 'PUT' && method !== 'PATCH') ? $jsonToFormData(data) : data;
            if(method === 'POST') data = data.replace(/^\?/, '');
            if(!url) return fail('Service name unknown');

            try {
                var xhr = new XMLHttpRequest();
                url = (method !== 'GET') ? url : url + data;
                xhr.open(method, url);
                method === 'POST' && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
                (method === 'PUT' ||  method === 'PATCH') && xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function(){
                    if(xhr.readyState != 4) return;
                    if(xhr.status == 200 || xhr.status == 201) return resolve(xhr.responseText);
                    if(!!fallback && xhr.status != 200) return resolve($tryFallback(method, (fallback || url), (!!fallback ? true : false), data, { 'status' : xhr.status, 'data' : xhr.responseText, 'url' : url }));
                    return fail({ 'status' : xhr.status, 'data' : xhr.responseText, 'url' : url });
                }
                xhr.send((typeof data === 'object') ? JSON.stringify(data) : data);
            } catch (err) {
                var xdr = new XDomainRequest();
                xdr.open(method, url + data);
                xdr.ontimeout = fail;
                xdr.onerror = fail;
                xdr.onprogress = progress;
                xdr.onload = function() {
                    return resolve(xdr.responseText);
                }
                xdr.send();
            }

            function progress(prog){
                // console.log('progress :: ', prog)
            }

            function fail(err){
                reject(err);
            }

        });

    }

    function _get(serviceName, data, fallback){
        return $both('GET', serviceName, data, fallback);
    }

    function _post(serviceName, data, fallback){
        return $both('POST', serviceName, data, fallback);
    }

    function _put(serviceName, data, fallback){
        return $both('PUT', serviceName, data, fallback);
    }

    function _patch(serviceName, data, fallback){
        return $both('PATCH', serviceName, data, fallback);
    }

    function _delete(serviceName, data, fallback){
        return $both('DELETE', serviceName, data, fallback);
    }

    function $tryFallback(method, url, fallback, data, err){
        if (typeof err === 'object' ) err.message = (fallback) ? "Service error, trying fallback" : "";
        console.error('status: ', err.status, '\n', 'data: ', err.data, '\n', 'message: ', err.message, '\n', 'url: ', err.url)
        if (fallback) {
            return $both(method, url, data);
        }
    }

    function $jsonToFormData(obj){
        if (typeof obj !== 'object') return obj;
        var paramString = '?';
        for (var key in obj) {
            var value = obj[key];
            if(obj[key] instanceof Array){
                value = encodeURIComponent(JSON.stringify(value));
            }
            if (paramString != "" && paramString != "?") paramString += "&";
            paramString += key + "=" + encodeURIComponent(value);
        }
        return paramString;
    }

    return {
        get    : _get,
        post   : _post,
        put    : _put,
        patch  : _patch,
        delete : _delete
    }
}

try {
    module.exports = init();
} catch(err){
    // using like a library
    window.xhrt = init();
}

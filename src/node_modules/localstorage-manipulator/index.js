function both(method, key, data){
    window.noLocalStorage = window.noLocalStorage || {};
    try {
        localStorage.isAvailable = true;
        if(method == 'get') {
            return JSON.parse(localStorage[key]);
        }
        localStorage[key] = JSON.stringify(data);
    } catch(err) {
        if(method == 'get') {
            return JSON.parse(window.noLocalStorage[key] || '{}');
        }
        window.noLocalStorage[key] = JSON.stringify(data);
    } 
}

function saveData(key, data){
    return both('save', key, data);
}

function getData(key){
    return both('get', key);
}

try {
    module.exports = {
        saveData : saveData,
        getData  : getData
    }    
} catch (err){
    // Using like a library
}
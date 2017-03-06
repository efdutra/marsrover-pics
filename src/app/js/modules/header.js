function init(){

	console.info("View: Header");

    /*************** Dependencies ***************/
    var _             = require('dom-manipulator')
    ,   nunjucks      = require('../3rd-modules/nunjucks-edited')
    ,   xhrt          = require('xhrt');
    /********************************************/

    var selected	= _.getElm('.rovers')
    ,	rover 		= selected.value;

    console.log(rover);
}

module.exports = {
    init : init
}
function init(){

	console.info("View: Inicio");

    /*************** Dependencies ***************/
    var _             = require('dom-manipulator')
    ,   nunjucks      = require('../3rd-modules/nunjucks-edited')
    ,   xhrt           = require('xhrt');
    /********************************************/

    var token 	= 'K4bkwFu7BV29fSh6Q3drqyQavd7ouw4XNGon5RK1'
	, rover 	= 'spirit' // curiosity | opportunity | spirit
	, page	 	= '1'
	, endpoint 	= '100'
	, camera 	= 'navcam'
	, data 		= 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?sol=' + endpoint + '&camera=' + camera + '&page=' + page + '&api_key=' + token
	, outterDiv	= _.getElm('.block--grid');


	xhrt.get(data, '').then(function(resolve){
		myObj = JSON.parse(resolve);
		for (i = 0, lgt = myObj.photos.length; i < lgt; i++) {
			var imgs 		= myObj.photos[i].img_src
			, rover 		= myObj.photos[i].rover.name
			, camera 		= myObj.photos[i].camera.name
			, cameraFull 	= myObj.photos[i].camera.full_name
			, innerDiv 		= document.createElement('div')
			, img 			= document.createElement('img');

			innerDiv.className 	= 'img--min';
			img.src 			= imgs;

			console.log(rover, camera, cameraFull);

			innerDiv.appendChild(img);
			outterDiv.appendChild(innerDiv);
		}
	},function(reject){
		error = JSON.parse(reject.data);
		outterDiv.innerHTML = error.errors;
	});
}

module.exports = {
    init : init
}
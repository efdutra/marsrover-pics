function init(){

	console.info("View: Inicio");

    /*************** Dependencies ***************/
    var _             = require('dom-manipulator')
    ,   nunjucks      = require('../3rd-modules/nunjucks-edited')
    ,   xhrt          = require('xhrt');
    /********************************************/

	var outterDiv	= _.getElm('.block--grid')
	, marsRover		= _.getElm('.rovers')
	, cam			= _.getElm('.camera')
	, solarT		= _.getElm('.sol')
	, day 			= _.getElm('.day')
	, pics 			= _.getElm('.pics-num')
	, range			= _.byAttr('range')
	, page			= _.getElm('.page')
    , date 			= _.getElm('.date')
    , today			= new Date().toISOString().slice(0,10)
    , yesterday		= new Date(new Date().getTime() - 48 * 60 * 60 * 1000).toISOString().slice(0,10)
    , token			= 'JMhQuzTd3zYQmjQdhgBNHqAbuBAx1CXyJ6ZHIpZf'
    , def			= {
				'rovers' 	 : 'curiosity',
				'camera' 	 : '',
				'sol' 	 	 : '64',
				'page'	 	 : '1',
				'date' 		 : ''
			}
    // , hasSol		= (!def.date && def.sol ? '?sol=' + def.sol : '')
    // , hasED			= (def.date ? '?earth_date=' + def.date : '' )
    // , hasCam		= (def.camera ? '&camera=' + def.camera : '')
    , innerDiv  	= _.createElm({'elm':'div', 'insertAfter': outterDiv, 'attributes': {'class':'pics--mars'}});

    _.bindElm(marsRover, 'change', changeStuff);
    _.bindElm(cam, 'change', changeStuff);
    _.bindElm(solarT, 'change', changeStuff);
    _.bindElm(page, 'change', changeStuff);
    _.bindElm(date, 'change', changeStuff);

    date.setAttribute("value", yesterday);


  	function changeStuff(e) {
  		if (!!(_.getElm('.box--img'))) _.removeElm('.box--img');
  		if (!!(_.getElm('.error'))) _.removeElm('.error');

		var select 	= e.target.getAttribute("name")
		,	valSel	= range ? e.target.value : e.target.options[e.target.selectedIndex].value
		,	infos 	= {}
		infos[select] = valSel
		def[select] = valSel

		console.log(url());

		displayPics(url());

		day.innerHTML = def.sol;
	}

	function url() {
		return 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + def.rovers + '/photos' + (!def.date && def.sol ? '?sol=' + def.sol : '') + (def.date ? '?earth_date=' + def.date : '' ) + (def.camera ? '&camera=' + def.camera : '') + '&page=' + def.page + '&api_key=' + token
	}

    function displayPics(elm) {
		xhrt.get(url(), '').then(function(resolve){
			myObj = JSON.parse(resolve);
			for (i = 0, lgt = myObj.photos.length; i < lgt; i++) {
				var imgs 		= myObj.photos[i].img_src
				, 	sol 		= myObj.photos[i].sol
				, 	maxSol 		= myObj.photos[i].rover.max_sol
				// , rover 		= myObj.photos[i].rover.name
				// , camera 		= myObj.photos[i].camera.name
				// , cameraFull 	= myObj.photos[i].camera.full_name
				, boxImg        = _.createElm({'elm':'div', 'insertAfter' : '.pics--mars', 'attributes':{'class':'box--img img-'+i}})
				, obj 			= {
					'elm' : 'div',
					'insertAfter' : '.img-'+i,
					'attributes' : {
						'style' : {
							'background-image' : 'url('+imgs+')'
						},
						'class' : 'img--min'
					}
				};
				// outterDiv.innerHTML = url();
				_.createElm(obj);

				pics.innerHTML = myObj.photos.length;
			}

			function setAttributes(el, options) {
			   Object.keys(options).forEach(function(attr) {
			     el.setAttribute(attr, options[attr]);
			   })
			}

			setAttributes(solarT, {
				'max' : maxSol,
				'value' : def.sol
			});

		},function(reject){
			error = JSON.parse(reject.data);
			var objError = {
				'elm' : 'span',
				'content' : error.errors,
				'insertAfter' : '.pics--mars',
				'attributes' : {
					'class' : 'error'
				}
			}
			_.createElm(objError);
			pics.innerHTML = '0';

		});
    }
    return displayPics();
}

module.exports = {
    init : init
}
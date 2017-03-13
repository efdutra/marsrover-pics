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
				'camera' 	 : 'fhaz',
				'sol' 	 	 : '100',
				'page'	 	 : '1',
				'date' 		 : ''
			}
	// , hasSol		= (!def.date && def.sol ? '?sol=' + def.sol : '')
	// , hasED			= (def.date ? '?earth_date=' + def.date : '' )
	// , hasCam		= (def.camera ? '&camera=' + def.camera : '')
    , innerDiv  	= _.createElm({'elm':'div', 'insertAfter': outterDiv, 'attributes': {'class':'pics--mars'}})
    , modal 		= _.getElm('.pics--modal')
    , overlay 		= _.getElm('.overlay')
    , close 		= _.getElm('.close--modal')
    , picSrc 		= _.getElm('.pic--img')
    , title 		= _.getElm('.dinTitle')
    , subTitle 		= _.getElm('.dinSubTitle')
    , extra 		= _.getElm('.dinExtra');


    _.bindElm(marsRover, 'change', changeStuff);
    _.bindElm(cam, 'change', changeStuff);
    _.bindElm(solarT, 'change', changeStuff);
    _.bindElm(page, 'change', changeStuff);
    _.bindElm(date, 'change', changeStuff);
    _.bindElm(close, 'click', closeModal);

    date.setAttribute("value", yesterday);

    function closeModal() {
		_.removeClass(modal, 'open');
		_.removeClass(overlay, 'open');
    }

  	function changeStuff(e) {
  		if (!!(_.getElm('.box--img'))) _.removeElm('.box--img');
  		if (!!(_.getElm('.error'))) _.removeElm('.error');

		var select 	= e.target.getAttribute("name")
		,	valSel	= range ? e.target.value : e.target.options[e.target.selectedIndex].value
		,	infos 	= {}
		infos[select] = valSel
		def[select] = valSel

		// console.log(url());

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
				var sol 		= myObj.photos[i].sol
				, 	maxSol 		= myObj.photos[i].rover.max_sol
				, 	data 		= {
					'imgs'		 : myObj.photos[i].img_src,
					'rover'		 : myObj.photos[i].rover.name,
					'cameraFull' : myObj.photos[i].camera.full_name,
					'date'  	 : myObj.photos[i].earth_date
				}
				,   boxImg   	= _.createElm({'elm':'div', 'insertAfter' : '.pics--mars', 'attributes':{'class':'box--img img-'+i}})
				,   obj 		= {
					'elm' : 'div',
					'insertAfter' : '.img-'+i,
					'attributes' : {
						'style' : {
							'background-image' : 'url('+data.imgs+')'
						},
						'class' : 'img--min'
					}
				}

				// outterDiv.innerHTML = url();
				_.createElm(obj);
				var pic = _.getElm(obj.insertAfter);

				pics.innerHTML = myObj.photos.length;
				pic.dataset.data = JSON.stringify(data);

				_.bindElm(pic, 'click', function(e) {
					var infos = JSON.parse(e.currentTarget.dataset.data);
					picSrc.src = infos.imgs;
					title.innerHTML = infos.rover;
					subTitle.innerHTML = infos.cameraFull;
					extra.innerHTML = infos.date;
					_.addClass(modal, 'open');
					_.addClass(overlay, 'open');
				})
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
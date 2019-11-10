/*
	Javascript for wufuba.com
	Author: www.wufuba.com
*/

// var DEBUG = false;
// if(!DEBUG){
//  if(!window.console) window.console = {};
//  var methods = ["log","debug","warn","info"];
//  for(var i=0;i<methods.length;i++){
//  console[methods[i]] = function(){};
//  }
// }

var detectedWidth = $(window).width();
var detectedHeight = $(window).height();
var deviceSybtem = null;
var androidBtnSave = null;
var iOSBtnSave = null;
var dwnURL = null;

function plugIn() {
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1140px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 320px)'
	});

	var $window = $(window),
		$body = $('body');

	// Disable animations/transitions until the page has loaded.
	$body.addClass('is-loading');

	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-loading');
		}, 250);
	});

	// Fix: Placeholder polyfill.
	$('form').placeholder();

	// Prioritize "important" elements on mobile.
	skel.on('+mobile -mobile', function () {
		$.prioritize(
			'.important\\28 mobile\\29',
			skel.breakpoint('mobile').active
		);
	});

	// Scrolly.
	$('.scrolly').scrolly();

}

function detectDesktopOrMobiile() {
	console.log('detect desktop or mobile');

	if (detectedWidth <= 800) {
		console.log('this is mobile');
		if (androidBtnSave!=null)
		{
			androidDownload();	
		}
		else if (iOSBtnSave!=null)
		{
			iOSCountryDetected();
		}
	}
	else {
		console.log('this is desktop');
		setTimeout(showQRcode,1500);
	}
}

function detectDeviceSybtem() {
	console.log('detected device system');
	
		if (isAndroid && detectedWidth <= 800) {
			console.log('this is Android');
			deviceSybtem = 0;
			console.log('deviceSybtem=' + deviceSybtem);

			$("#btn_07,#btn_08,#btn_09").removeClass("btnOnline");
			$("#btn_07,#btn_08,#btn_09").addClass("btnDisable");
			$("#btn_07,#btn_08,#btn_09").removeAttr("href");

		}
		else if (isiOS && detectedWidth <= 800 || isiOS && detectedWidth == 1024 || isiOS && detectedWidth == 1366) {
			console.log('this is iOS');
			deviceSybtem = 1;
			console.log('deviceSybtem=' + deviceSybtem);

			$("#btn_01,#btn_02,#btn_03").removeClass("btnOnline");
			$("#btn_01,#btn_02,#btn_03").addClass("btnDisable");
			$("#btn_01,#btn_02,#btn_03").removeAttr("href");
		}
	

}

function showQRcode() {
	console.log('show QRcode');

		$('#qrCodeArea').show();

	if (androidBtnSave!=null) //show Android QRcode description
		{
			console.log('安卓 安裝說明');
			$('#qrCodeBox_android').show();
			$('#qrCodePic_android_01').show();
			$('#qrCodeBox_ios').hide();
			$('.qrCodePic_ios').hide();
			
		}
	else if (iOSBtnSave!=null) //show iOS QRcode description
		{
			console.log('蘋果 安裝說明');
			$('#qrCodeBox_android').hide();
			$('#qrCodePic_android_01').hide();
			$('#qrCodeBox_ios').show();
			$('#qrCodePic_ios').show();
		}
	
}

function downloadClickRecord(k) {
	console.log('download click record');

	switch(k) {
		case 0:
			iOSBtnSave = null;
			androidBtnSave = 1;
			dwnURL = 'https://www.wufuba.com/?down';
			break;
		case 1:
			iOSBtnSave = null;
			androidBtnSave = 2;
			dwnURL = 'https://www.wufuba.com/?down';
			break;	
		case 2:
			iOSBtnSave = null;
			androidBtnSave = 3;
			dwnURL = 'https://www.wufuba.com/?down';
			break;	
		case 3:
			androidBtnSave = null;
			iOSBtnSave = 1;
			dwnURL = 'https://www.wufuba.com/?down';	
			break;	
		case 4:
			androidBtnSave = null;
			iOSBtnSave = 2;
			dwnURL = 'https://www.wufuba.com/?down';
			break;
		case 5:
			androidBtnSave = null;
			iOSBtnSave = 3;
			dwnURL = 'https://www.wufuba.com/?down';
			break;	
	}

	detectDesktopOrMobiile();
}

function iOSDownload() {
	console.log('iOS download');

	var elem = document.createElement('a');
	elem.href = dwnURL;
	elem.click();

	console.log('end of downloading iOS 載點' + iOSBtnSave);
	console.log('載點url=' + dwnURL);
	dwnURL = null;

}

function androidDownload() {
	console.log('Android download');

	var elem = document.createElement('a');
	elem.href = dwnURL;
	elem.click();

	console.log('end of downloading Android 載點' + iOSBtnSave);
	console.log('載點url=' + dwnURL);
	dwnURL = null;
}

function closeQRCode() {
	$('#qrCodeArea').hide();
	$('#qrCodeBox_ios').hide();
	$('#qrCodeBox_android').hide();
}

function pageViewManual() {
	console.log('page view manual');
	trackEvent('PV手动', 'health2.site', '');
}

$(document).ready(function () {
	console.log('window ready');

	// == adjust UI to fix the window  ==
	plugIn();

	detectDeviceSybtem();
	pageViewManual();
});
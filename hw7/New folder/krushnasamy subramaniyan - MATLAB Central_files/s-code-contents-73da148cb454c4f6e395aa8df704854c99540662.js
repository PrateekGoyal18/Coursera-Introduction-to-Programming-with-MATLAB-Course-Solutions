function cfCheckRSID(cvURL) {
 	var cvHostName = cfUtility(cvURL,'server');
 	switch ( cvHostName ) {
 		case "www.mathworks.com":
 		case "mathworks.com":
 		case "www.mathworks.com.au":
 		case "mathworks.com.au":
		case "au.mathworks.com":
		case "www.au.mathworks.com":
 		case "www.mathworks.ch":
 		case "mathworks.ch":
		case "ch.mathworks.com":
		case "www.ch.mathworks.com":
 		case "www.mathworks.cn":
 		case "mathworks.cn":
		case "cn.mathworks.com":
		case "www.cn.mathworks.com":
		case "www.mathworks.de":
 		case "mathworks.de":
		case "de.mathworks.com":
		case "www.de.mathworks.com":
		case "www.mathworks.es":
		case "mathworks.es":
		case "www.es.mathworks.com":
		case "es.mathworks.com":
		case "www.mathworks.fr":
		case "mathworks.fr":
		case "www.fr.mathworks.com":
		case "fr.mathworks.com":
		case "www.mathworks.in":
		case "mathworks.in":
		case "www.in.mathworks.com":
		case "in.mathworks.com":
		case "www.mathworks.it":
		case "mathworks.it":
		case "www.it.mathworks.com":
		case "it.mathworks.com":
		case "www.mathworks.co.jp":
		case "mathworks.co.jp":
		case "www.jp.mathworks.com":
		case "jp.mathworks.com":
		case "www.mathworks.co.kr":
		case "mathworks.co.kr":
		case "www.kr.mathworks.com":
		case "kr.mathworks.com":
		case "www.mathworks.nl":
		case "mathworks.nl":
		case "www.nl.mathworks.com":
		case "nl.mathworks.com":
		case "www.mathworks.se":
		case "mathworks.se":
		case "www.se.mathworks.com":
		case "se.mathworks.com":
		case "www.mathworks.co.uk":
		case "mathworks.co.uk":
		case "www.uk.mathworks.com":
		case "uk.mathworks.com":
		case "www.makerzone.mathworks.com":
		case "makerzone.mathworks.com":
		case "www.go.mathworks.com":
		case "go.mathworks.com":
		case "www.go2.mathworks.com":
		case "go2.mathworks.com":
		case "www.mathworksservicerequest.force.com":
		case "mathworksservicerequest.force.com":
		case "www.blogs.mathworks.com":
		case "blogs.mathworks.com":
		case "www.matlabacademy.mathworks.com":
		case "matlabacademy.mathworks.com":
			ReportSuiteID = "mathwgbl";
			break;
		default:
			ReportSuiteID = "mathglobaltest";
			break;
	}
	ReportSuiteID = ReportSuiteID.toLowerCase();
	return ReportSuiteID ;
}

function cfUtility(cvURL,cvAction) {
	cvURL = unescape(cvURL.toLowerCase());
	cvURL=cvURL.replace("searchresults?","searchresults/?");
	switch (cvAction) {
	case "server":
		var a = cvURL.split(/\/+/g)[1];
		if (typeof(a) !== 'undefined') {
			var b = a.split("."); if (b.length == 2) { var c = 'www.' + a; } else { c = a; } TheResult = c;
		} else {
			TheResult = "";
		}
		break;
	case "domain":
		var a = cfUtility(cvURL,"server")
		if (typeof(a) !== 'undefined') {
			var b  = a.split("."); b_len = b.length;
			var TheResult = String(b[b_len - 2] + '.' + b[b_len - 1]);
		} else {
			TheResult = "";
		}
		break;

	case "filename":
		//var a = cvURL.split("?")[0];
		var a = cvURL.split(/\#|;jsessionid=|\?/)[0]; var b = a.substring(a.lastIndexOf('/')+1); // 100013 CG: edited this line to split on # & jsessionid as well
		TheResult = b;
		break;
	case "pagename":
		//var a = cvURL.split("?")[0];
		var a = cvURL.split(/\#|;jsessionid=|\?/)[0]; // 100013 CG: edited this line to split on # & jsessionid as well
		a = a.replace("http://","");
		a = a.replace("https://","");
		a = a.replace(cfUtility(cvURL,"server"),"");
		var b = a.substring(a.lastIndexOf('/')+1);
		a = a.replace(b,"");
		//a=cfUtility(cvURL,"server").replace("www.mathworks","")+a+cfUtility(cvURL,"filename");
		a= a+cfUtility(cvURL,"filename");
		if ((cfUtility(cvURL,"filename") == "") || (!cfUtility(cvURL,"filename"))){
			if (cvURL.search("searchresults/?")<0 && cvURL.search("/company/jobs/")<0 && cvURL.search("/matlabcentral/")<0 && cvURL.search("/downloads/web_downloads/")<0 && cvURL.search("/support/bugreports/")<0 && cvURL.search("/training-schedule/")<0 && cvURL.search("blogs.mathworks.")<0) {
				a= a+"index.html"; //adding index.html when filename not present
			}
		}
		/*if((cfUtility,"server")==("go.mathworks.com") || (cfUtility,"server")=="go2.mathworks.com")*/
		if(cvURL.search('go.mathworks.com') !=-1 || cvURL.search('go2.mathworks.com') !=-1 ){
		a=cfUtility(cvURL,"filename");
		a= "elq::" + a ;
		}
		TheResult = a;
		break;
	case "channel":
		//var a = cvURL.split("?")[0];
		var a = cvURL.split(/\#|;jsessionid=|\?/)[0]; // 100013 CG: edited this line to split on # & jsessionid as well
		a = a.replace("http://","");
		a = a.replace("https://","");
		a = a.replace(cfUtility(cvURL,"server"),"");
		var b = a.substring(a.lastIndexOf('/')+1);
		if (a !='/downloads') { a = a.replace(b,"");} //100113 CG: added the if statement to prevent downloads page being capture as homepage
		//a = a.replace(cvURL.split(/\/+/g)[1],cfUtility(cvURL,"server"));
		/*if((cfUtility,"server")=="go.mathworks.com" || (cfUtility,"server")=="go2.mathworks.com")*/
		if(cvURL.search('go.mathworks.com') !=-1 || cvURL.search('go2.mathworks.com') !=-1 || cvURL.search('force.com') !=-1){
		a=cfUtility(cvURL,"server");
		}
		TheResult = a;
		break;
	case "filenameparameters":
		var cvParamPos = cvURL.indexOf("?"); if (cvParamPos != -1) { var cvParam = cvURL.substring(cvParamPos); } else { var cvParam = ""; }
		TheResult = cfUtility(cvURL,"filename") + cvParam;
		break;
	case "se":
		var cvReferrer_Server = cvURL.split(/\/+/g)[1];
		var cvReferrer_Server_Splitted = cvReferrer_Server.split(".");
		cvReferrer_Server_Splitted_Length = cvReferrer_Server_Splitted.length;
		var TheResult = String('.' + cvReferrer_Server_Splitted[cvReferrer_Server_Splitted_Length - 2] + '.');
		break;
	case "ext":
		var TheResult = cvURL.substring(cvURL.lastIndexOf('/') + 1, cvURL.length).substring(cvURL.substring(cvURL.lastIndexOf('/') + 1, cvURL.length).lastIndexOf('.') + 1, cvURL.substring(cvURL.lastIndexOf('/') + 1, cvURL.length).length);
		break;
	default:
		var TheResult = "";
	}
	return TheResult;
}

function undorewrite(origurl) {

	omniurl=unescape(origurl.toLowerCase());
	domain=cfUtility(omniurl,'server');
	if (domain.indexOf("mathworks.de")>-1 || domain.indexOf("mathworks.in")>-1 || domain.indexOf("mathworks.co.jp")>-1 || domain.indexOf("mathworks.co.uk")>-1 || domain.indexOf("mathworks.fr")>-1
   		|| domain.indexOf("mathworks.cn")>-1 || domain.indexOf("mathworks.nl")>-1 || domain.indexOf("mathworks.se")>-1 || domain.indexOf("mathworks.it")>-1 || domain.indexOf("mathworks.com.au")>-1
 	    || domain.indexOf("mathworks.co.kr")>-1 || domain.indexOf("mathworks.es")>-1 || domain.indexOf("mathworks.ch")>-1){
 		if(omniurl.indexOf("mathworks.de/de/")>-1 || omniurl.indexOf("mathworks.in/in/")>-1 || omniurl.indexOf("mathworks.co.uk/uk/")>-1 || omniurl.indexOf("mathworks.co.jp/jp/")>-1 || omniurl.indexOf("mathworks.fr/fr/")>-1 			        || omniurl.indexOf("mathworks.cn/cn/")>-1 || omniurl.indexOf("mathworks.nl/nl/")>-1 || omniurl.indexOf("mathworks.se/se/")>-1 || omniurl.indexOf("mathworks.it/it/")>-1 || omniurl.indexOf("mathworks.com.au/au/")>-1 																																																																																																									    	|| omniurl.indexOf("mathworks.co.kr/kr/")>-1 || omniurl.indexOf("mathworks.es/es/")>-1 || omniurl.indexOf("mathworks.ch/ch/")>-1){
			channel=cfUtility(omniurl,'channel');
			foldersplit = channel.split("/");
			omniurl= omniurl.replace("/"+foldersplit[1]+"/","/");
		}
	}
	return omniurl;
}


function cfGetQParam(a, b) {	// Custom Function to Get Query Parameters
	var c = a.indexOf('?'); var d = a.indexOf('#');
	if (c < 0) { return ""; }
	var e = a.substr(c + 1);
	if (d > 0) { e = a.substring(c + 1, d); }
	var f = e.split('&');
	for (var i = 0; i < f.length; i++) {
		var g = f[i].split('=');
		g[0] = unescape(g[0]);
		if (g[0] == b) {
			g[1] = unescape(g[1]);
			if (g[1].indexOf('"') > -1) {
				var h = /"/g;
				g[1] = g[1].replace(h, '\\"')
			}
			if (g[1].indexOf('+') > -1) {
				var j = /\+/g;
				g[1] = g[1].replace(j, ' ')
			}
			return g[1]
		}
	}
	return ""
}

function cfLeft(str, n){
	if (n <= 0) { return ""; } else if (n > String(str).length) { return str; } else { return String(str).substring(0,n); }
}

function cfRight(str, n){
    if (n <= 0) { return ""; } else if (n > String(str).length) { return str; } else { var iLen = String(str).length; return String(str).substring(iLen, iLen - n); }
}

function cfClean(cvURL) {
	if (cvURL) {
		cvURL = cvURL.replace("http://","/");
		cvURL = cvURL.replace("https://","/");
	}
	return cvURL;
}

function removeHTMLTags(strInputCode) {
	if (strInputCode) {
		strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
			return (p1 == "lt") ? "<" : ">";
		});
		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
		return strTagStrippedText;
	}
}

function chnlshrink(chnl) {
	chan=chnl.toLowerCase();
	switch (chan) {
		case "paid search":
			chanl = "ppc";
			break;
		case "paid social ad":
			chanl = "psb";
			break;
		case "paid social media":
			chanl = "psm";
			break;
		case "external promotion":
			chanl = "pep";
			break;
		case "partner promotion":
			chanl = "prp";
			break;
		case "direct load":
			chanl = "dl";
			break;
		case "email":
			chanl = "eml";
			break;
		case "paid non-search":
			chanl = "pns";
			break;
		case "natural search":
			chanl = "nats";
			break;
		case "referrers":
			chanl = "ref";
			break;
		default:
		chanl = "unk";
			break;
	}
	return chanl;
}

function prodassign(type){
	if (type=='urly'){
		if (s.prop4.indexOf('products/curvefitting/')>-1 || s.prop4.indexOf('/help/curvefit/')>-1 || s.prop4.indexOf('/help/toolbox/curvefit/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/curvefit/')>-1)) {prod="Curve Fitting Toolbox";}
		else if (s.prop4.indexOf('products/communications/')>-1 || s.prop4.indexOf('/help/ja_JP/comm/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/comm/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/comm/')>-1)) {prod="Communications System Toolbox";}
		else if (s.prop4.indexOf('products/communications/')>-1 || s.prop4.indexOf('/help/comm/')>-1 || s.prop4.indexOf('/help/toolbox/comm/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/comm/')>-1)) {prod="Communications System Toolbox";}
		else if (s.prop4.indexOf('products/compiler/')>-1 || s.prop4.indexOf('/help/ja_JP/compiler/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/compiler/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/compiler/')>-1)) {prod="MATLAB Compiler";}
		else if (s.prop4.indexOf('products/compiler/')>-1 || s.prop4.indexOf('/help/compiler/')>-1 || s.prop4.indexOf('/help/toolbox/compiler/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/compiler/')>-1)) {prod="MATLAB Compiler";}
		else if (s.prop4.indexOf('products/control/')>-1 || s.prop4.indexOf('/help/ja_JP/control/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/control/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/control/')>-1)) {prod="Control System Toolbox";}
		else if (s.prop4.indexOf('products/control/')>-1 || s.prop4.indexOf('/help/control/')>-1 || s.prop4.indexOf('/help/toolbox/control/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/control/')>-1)) {prod="Control System Toolbox";}
		else if (s.prop4.indexOf('products/daq/')>-1 || s.prop4.indexOf('/help/daq/')>-1 || s.prop4.indexOf('/help/toolbox/daq/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/daq/')>-1)) {prod="Data Acquisition Toolbox";}
		else if (s.prop4.indexOf('products/database/')>-1 || s.prop4.indexOf('/help/database/')>-1 || s.prop4.indexOf('/help/toolbox/database/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/database/')>-1)) {prod="Database Toolbox";}
		else if (s.prop4.indexOf('products/derivatives/')>-1 || s.prop4.indexOf('/help/finderiv/')>-1 || s.prop4.indexOf('/help/toolbox/finderiv/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/finderiv/')>-1)) {prod="Financial Derivatives Toolbox";}
		else if (s.prop4.indexOf('products/datafeed/')>-1 || s.prop4.indexOf('/help/datafeed/')>-1 || s.prop4.indexOf('/help/toolbox/datafeed/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/datafeed/')>-1)) {prod="Datafeed Toolbox";}
		else if (s.prop4.indexOf('products/gauges/')>-1 || s.prop4.indexOf('/help/gauges/')>-1 || s.prop4.indexOf('/help/toolbox/gauges/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/gauges/')>-1)) {prod="Gauges Blockset";}
		else if (s.prop4.indexOf('products/dsp-system/')>-1 || s.prop4.indexOf('/help/dsp/')>-1 || s.prop4.indexOf('/help/toolbox/dsp/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/dsp/')>-1)) {prod="DSP System Toolbox";}
		else if (s.prop4.indexOf('products/embedded-coder/')>-1 || s.prop4.indexOf('/help/ecoder/')>-1 || s.prop4.indexOf('/help/toolbox/ecoder/')>-1 || (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ecoder/')>-1)) {prod="Embedded Coder";}
		else if (s.prop4.indexOf('products/excellink/')>-1 || s.prop4.indexOf('/help/exlink/')>-1 || s.prop4.indexOf('/help/toolbox/exlink/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/exlink/')>-1)) {prod="Spreadsheet Link EX";}
		else if (s.prop4.indexOf('products/finance/')>-1 || s.prop4.indexOf('/help/finance/')>-1 || s.prop4.indexOf('/help/toolbox/finance/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/finance/')>-1)) {prod="Financial Toolbox";}
		else if (s.prop4.indexOf('products/fuzzy-logic/')>-1 || s.prop4.indexOf('/help/fuzzy/')>-1 || s.prop4.indexOf('/help/toolbox/fuzzy/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/fuzzy/')>-1)) {prod="Fuzzy Logic Toolbox";}
		else if (s.prop4.indexOf('products/instrument/')>-1 || s.prop4.indexOf('/help/instrument/')>-1 || s.prop4.indexOf('/help/toolbox/instrument/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/instrument/')>-1)) {prod="Instrument Control Toolbox";}
		else if (s.prop4.indexOf('products/sysid/')>-1 || s.prop4.indexOf('/help/ident/')>-1 || s.prop4.indexOf('/help/toolbox/ident/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ident/')>-1)) {prod="System Identification Toolbox";}
		else if (s.prop4.indexOf('products/image/')>-1 || s.prop4.indexOf('/access/helpdesk/help/images/')>-1 || s.prop4.indexOf('/access/helpdesk/help/toolbox/images/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/helpdesk/help/images/')>-1)) {prod="Image Processing Toolbox";}
		else if (s.prop4.indexOf('products/image/')>-1 || s.prop4.indexOf('/help/ja_JP/images/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/images/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/images/')>-1)) {prod="Image Processing Toolbox";}
		else if (s.prop4.indexOf('products/mapping/')>-1 || s.prop4.indexOf('/help/map/')>-1 || s.prop4.indexOf('/help/toolbox/map/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/map/')>-1)) {prod="Mapping Toolbox";}
		else if (s.prop4.indexOf('products/mpc/')>-1 || s.prop4.indexOf('/help/mpc/')>-1 || s.prop4.indexOf('/help/toolbox/mpc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/mpc/')>-1)) {prod="Model Predictive Control Toolbox";}
		else if (s.prop4.indexOf('products/ML_reportgenerator/')>-1 || s.prop4.indexOf('/help/rptgen/')>-1 || s.prop4.indexOf('/help/toolbox/rptgen/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/rptgen/')>-1)) {prod="MATLAB Report Generator";}
		else if (s.prop4.indexOf('products/neural-network/')>-1 || s.prop4.indexOf('/help/nnet/')>-1 || s.prop4.indexOf('/help/toolbox/nnet/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/nnet/')>-1)) {prod="Neural Network Toolbox";}
		else if (s.prop4.indexOf('products/optimization/')>-1 || s.prop4.indexOf('/help/ja_JP/optim/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/optim/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/optim/')>-1)) {prod="Optimization Toolbox";}
		else if (s.prop4.indexOf('products/optimization/')>-1 || s.prop4.indexOf('/help/optim/')>-1 || s.prop4.indexOf('/help/toolbox/optim/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/optim/')>-1)) {prod="Optimization Toolbox";}
		else if (s.prop4.indexOf('products/pde/')>-1 || s.prop4.indexOf('/help/pde/')>-1 || s.prop4.indexOf('/help/toolbox/pde/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/pde/')>-1)) {prod="Partial Differential Equation Toolbox";}
		else if (s.prop4.indexOf('products/simpower/')>-1 || s.prop4.indexOf('/help/ja_JP/physmod/powersys/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/physmod/powersys/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/physmod/powersys/')>-1)) {prod="SimPowerSystems";}
		else if (s.prop4.indexOf('products/simpower/')>-1 || s.prop4.indexOf('/help/physmod/powersys/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/powersys/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/physmod/powersys/')>-1)) {prod="SimPowerSystems";}
		else if (s.prop4.indexOf('products/robust/')>-1 || s.prop4.indexOf('/help/robust/')>-1 || s.prop4.indexOf('/help/toolbox/robust/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/robust/')>-1)) {prod="Robust Control Toolbox";}
		else if (s.prop4.indexOf('products/simulink-coder/')>-1 || s.prop4.indexOf('/help/ja_JP/rtw/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/rtw/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/rtw/')>-1)) {prod="Simulink Coder";}
		else if (s.prop4.indexOf('products/simulink-coder/')>-1 || s.prop4.indexOf('/help/rtw/')>-1 || s.prop4.indexOf('/help/toolbox/rtw/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/rtw/')>-1)) {prod="Simulink Coder";}
		else if (s.prop4.indexOf('products/stateflow/')>-1 || s.prop4.indexOf('/help/ja_JP/stateflow/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/stateflow/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/stateflow/')>-1)) {prod="Stateflow";}
		else if (s.prop4.indexOf('products/stateflow/')>-1 || s.prop4.indexOf('/help/stateflow/')>-1 || s.prop4.indexOf('/help/toolbox/stateflow/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/stateflow/')>-1)) {prod="Stateflow";}
		else if (s.prop4.indexOf('products/signal/')>-1 || s.prop4.indexOf('/help/ja_JP/signal/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/signal/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/signal/')>-1)) {prod="Signal Processing Toolbox";}
		else if (s.prop4.indexOf('products/signal/')>-1 || s.prop4.indexOf('/help/signal/')>-1 || s.prop4.indexOf('/help/toolbox/signal/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/signal/')>-1)) {prod="Signal Processing Toolbox";}
		else if (s.prop4.indexOf('products/simulink/')>-1 || s.prop4.indexOf('/help/ja_JP/simulink/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/simulink/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/simulink/')>-1)) {prod="Simulink";}
		else if (s.prop4.indexOf('products/simulink/')>-1 || s.prop4.indexOf('/help/simulink/')>-1 || s.prop4.indexOf('/help/toolbox/simulink/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/simulink/')>-1)) {prod="Simulink";}
		else if (s.prop4.indexOf('products/symbolic/')>-1 || s.prop4.indexOf('/help/ja_JP/symbolic/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/symbolic/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/symbolic/')>-1)) {prod="Symbolic Math Toolbox";}
		else if (s.prop4.indexOf('products/symbolic/')>-1 || s.prop4.indexOf('/help/symbolic/')>-1 || s.prop4.indexOf('/help/toolbox/symbolic/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/symbolic/')>-1)) {prod="Symbolic Math Toolbox";}
		else if (s.prop4.indexOf('products/SL_reportgenerator/')>-1 || s.prop4.indexOf('/help/rptgenext/')>-1 || s.prop4.indexOf('/help/toolbox/rptgenext/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/rptgenext/')>-1)) {prod="Simulink Report Generator";}
		else if (s.prop4.indexOf('products/statistics/')>-1 || s.prop4.indexOf('/help/ja_JP/stats/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/stats/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/stats/')>-1)) {prod="Statistics Toolbox";}
		else if (s.prop4.indexOf('products/statistics/')>-1 || s.prop4.indexOf('/help/stats/')>-1 || s.prop4.indexOf('/help/toolbox/stats/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/stats/')>-1)) {prod="Statistics Toolbox";}
		else if (s.prop4.indexOf('products/3d-animation/')>-1 || s.prop4.indexOf('/help/sl3d/')>-1 || s.prop4.indexOf('/help/toolbox/sl3d/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/sl3d/')>-1)) {prod="Simulink 3D Animation";}
		else if (s.prop4.indexOf('products/wavelet/')>-1 || s.prop4.indexOf('/help/wavelet/')>-1 || s.prop4.indexOf('/help/toolbox/wavelet/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/wavelet/')>-1)) {prod="Wavelet Toolbox";}
		else if (s.prop4.indexOf('products/rtwt/')>-1 || s.prop4.indexOf('/help/rtwin/')>-1 || s.prop4.indexOf('/help/toolbox/rtwin/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/rtwin/')>-1)) {prod="Real-Time Windows Target";}
		else if (s.prop4.indexOf('products/xpcembedded/')>-1 || s.prop4.indexOf('/help/xpc/')>-1 || s.prop4.indexOf('/help/toolbox/xpc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/xpc/')>-1)) {prod="xPC Target Embedded Option";}
		else if (s.prop4.indexOf('products/xpctarget/')>-1 || s.prop4.indexOf('/help/xpc/')>-1 || s.prop4.indexOf('/help/toolbox/xpc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/xpc/')>-1)) {prod="xPC Target";}
		else if (s.prop4.indexOf('products/aeroblks/')>-1 || s.prop4.indexOf('/help/aeroblks/')>-1 || s.prop4.indexOf('/help/toolbox/aeroblks/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/aeroblks/')>-1)) {prod="Aerospace Blockset";}
		else if (s.prop4.indexOf('products/matlabxl/')>-1 || s.prop4.indexOf('/help/matlabxl/')>-1 || s.prop4.indexOf('/help/toolbox/matlabxl/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/matlabxl/')>-1)) {prod="MATLAB Builder EX";}
		else if (s.prop4.indexOf('products/simmechanics/')>-1 || s.prop4.indexOf('/help/physmod/sm/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/sm/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/physmod/sm/')>-1)) {prod="SimMechanics";}
		else if (s.prop4.indexOf('products/mbc/')>-1 || s.prop4.indexOf('/help/mbc/')>-1 || s.prop4.indexOf('/help/toolbox/mbc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/mbc/')>-1)) {prod="Model-Based Calibration Toolbox";}
		else if (s.prop4.indexOf('products/imaq/')>-1 || s.prop4.indexOf('/help/imaq/')>-1 || s.prop4.indexOf('/help/toolbox/imaq/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/imaq/')>-1)) {prod="Image Acquisition Toolbox";}
		else if (s.prop4.indexOf('products/fixedincome/')>-1 || s.prop4.indexOf('/help/finfixed/')>-1 || s.prop4.indexOf('/help/toolbox/finfixed/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/finfixed/')>-1)) {prod="Fixed-Income Toolbox";}
		else if (s.prop4.indexOf('products/bioinfo/')>-1 || s.prop4.indexOf('/help/bioinfo/')>-1 || s.prop4.indexOf('/help/toolbox/bioinfo/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/bioinfo/')>-1)) {prod="Bioinformatics Toolbox";}
		else if (s.prop4.indexOf('products/filterhdl/')>-1 || s.prop4.indexOf('/help/hdlfilter/')>-1 || s.prop4.indexOf('/help/toolbox/hdlfilter/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/hdlfilter/')>-1)) {prod="Filter Design HDL Coder";}
		else if (s.prop4.indexOf('products/fixed/')>-1 || s.prop4.indexOf('/help/ja_JP/fixedpoint/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/fixedpoint/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/fixedpoint/')>-1)) {prod="Fixed-Point Toolbox";}
		else if (s.prop4.indexOf('products/fixed/')>-1 || s.prop4.indexOf('/help/fixedpoint/')>-1 || s.prop4.indexOf('/help/toolbox/fixedpoint/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/fixedpoint/')>-1)) {prod="Fixed-Point Toolbox";}
		else if (s.prop4.indexOf('products/simfixed/')>-1 || s.prop4.indexOf('/help/ja_JP/fixpoint/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/fixpoint/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/fixpoint/')>-1)) {prod="Simulink Fixed Point";}
		else if (s.prop4.indexOf('products/simfixed/')>-1 || s.prop4.indexOf('/help/fixpoint/')>-1 || s.prop4.indexOf('/help/toolbox/fixpoint/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/fixpoint/')>-1)) {prod="Simulink Fixed Point";}
		else if (s.prop4.indexOf('products/simverification/')>-1 || s.prop4.indexOf('/help/slvnv/')>-1 || s.prop4.indexOf('/help/toolbox/slvnv/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/slvnv/')>-1)) {prod="Simulink Verification and Validation";}
		else if (s.prop4.indexOf('products/simcontrol/')>-1 || s.prop4.indexOf('/help/ja_JP/slcontrol/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/slcontrol/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/slcontrol/')>-1)) {prod="Simulink Control Design";}
		else if (s.prop4.indexOf('products/simcontrol/')>-1 || s.prop4.indexOf('/help/slcontrol/')>-1 || s.prop4.indexOf('/help/toolbox/slcontrol/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/slcontrol/')>-1)) {prod="Simulink Control Design";}
		else if (s.prop4.indexOf('products/opc/')>-1 || s.prop4.indexOf('/help/opc/')>-1 || s.prop4.indexOf('/help/toolbox/opc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/opc/')>-1)) {prod="OPC Toolbox";}
		else if (s.prop4.indexOf('products/simrf/')>-1 || s.prop4.indexOf('/help/simrf/')>-1 || s.prop4.indexOf('/help/toolbox/simrf/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/simrf/')>-1)) {prod="SimRF";}
		else if (s.prop4.indexOf('products/rftoolbox/')>-1 || s.prop4.indexOf('/help/rf/')>-1 || s.prop4.indexOf('/help/toolbox/rf/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/rf/')>-1)) {prod="RF Toolbox";}
		else if (s.prop4.indexOf('products/computer-vision/')>-1 || s.prop4.indexOf('/help/vision/')>-1 || s.prop4.indexOf('/help/toolbox/vision/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/vision/')>-1)) {prod="Computer Vision System Toolbox";}
		else if (s.prop4.indexOf('products/simdrive/')>-1 || s.prop4.indexOf('/help/physmod/sdl/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/sdl/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/physmod/sdl/')>-1)) {prod="SimDriveline";}
		else if (s.prop4.indexOf('products/parallel-computing/')>-1 || s.prop4.indexOf('/help/distcomp/')>-1 || s.prop4.indexOf('/help/toolbox/distcomp/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/distcomp/')>-1)) {prod="Parallel Computing Toolbox";}
		else if (s.prop4.indexOf('products/distriben/')>-1 || s.prop4.indexOf('/help/mdce/')>-1 || s.prop4.indexOf('/help/toolbox/mdce/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/mdce/')>-1)) {prod="MATLAB Distributed Computing Server";}
		else if (s.prop4.indexOf('products/simbiology/')>-1 || s.prop4.indexOf('/help/simbio/')>-1 || s.prop4.indexOf('/help/toolbox/simbio/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/simbio/')>-1)) {prod="SimBiology";}
		else if (s.prop4.indexOf('products/systemtest/')>-1 || s.prop4.indexOf('/help/systemtest/')>-1 || s.prop4.indexOf('/help/toolbox/systemtest/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/systemtest/')>-1)) {prod="SystemTest";}
		else if (s.prop4.indexOf('products/simevents/')>-1 || s.prop4.indexOf('/help/simevents/')>-1 || s.prop4.indexOf('/help/toolbox/simevents/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/simevents/')>-1)) {prod="SimEvents";}
		else if (s.prop4.indexOf('products/netbuilder/')>-1 || s.prop4.indexOf('/help/dotnetbuilder/')>-1 || s.prop4.indexOf('/help/toolbox/dotnetbuilder/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/dotnetbuilder/')>-1)) {prod="MATLAB Builder NE";}
		else if (s.prop4.indexOf('products/simhydraulics/')>-1 || s.prop4.indexOf('/help/physmod/hydro/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/hydro/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/physmod/hydro/')>-1)) {prod="SimHydraulics";}
		else if (s.prop4.indexOf('products/aerotb/')>-1 || s.prop4.indexOf('/help/aerotbx/')>-1 || s.prop4.indexOf('/help/toolbox/aerotbx/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/aerotbx/')>-1)) {prod="Aerospace Toolbox";}
		else if (s.prop4.indexOf('products/javabuilder/')>-1 || s.prop4.indexOf('/help/javabuilder/')>-1 || s.prop4.indexOf('/help/toolbox/javabuilder/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/javabuilder/')>-1)) {prod="MATLAB Builder JA";}
		else if (s.prop4.indexOf('products/hdl-coder/')>-1 || s.prop4.indexOf('/help/hdlcoder/')>-1 || s.prop4.indexOf('/help/toolbox/hdlcoder/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/hdlcoder/')>-1)) {prod="HDL Coder";}
		else if (s.prop4.indexOf('products/simscape/')>-1 || s.prop4.indexOf('/access/helpdesk/help/physmod/simscape/')>-1 || s.prop4.indexOf('/access/helpdesk/help/toolbox/physmod/simscape/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/helpdesk/help/physmod/simscape/')>-1)) {prod="Simscape";}
		else if (s.prop4.indexOf('products/sldesignverifier/')>-1 || s.prop4.indexOf('/help/sldv/')>-1 || s.prop4.indexOf('/help/toolbox/sldv/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/sldv/')>-1)) {prod="Simulink Design Verifier";}
		else if (s.prop4.indexOf('products/polyspaceclientc/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace Client for C/C++";}
		else if (s.prop4.indexOf('products/polyspaceclientada/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace Client for Ada";}
		else if (s.prop4.indexOf('products/polyspaceserverc/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace Server for C/C++";}
		else if (s.prop4.indexOf('products/polyspaceserverada/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace Server for Ada";}
		else if (s.prop4.indexOf('products/polyspacemodelsl/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace Model Link SL";}
		else if (s.prop4.indexOf('products/polyspacemodeltl/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace Model Link TL";}
		else if (s.prop4.indexOf('products/polyspaceumlrh/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/polyspace/')>-1)) {prod="Polyspace UML Link RH";}
		else if (s.prop4.indexOf('products/simelectronics/')>-1 || s.prop4.indexOf('/help/physmod/elec/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/elec/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/physmod/elec/')>-1)) {prod="SimElectronics";}
		else if (s.prop4.indexOf('products/econometrics/')>-1 || s.prop4.indexOf('/help/econ/')>-1 || s.prop4.indexOf('/help/toolbox/econ/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/econ/')>-1)) {prod="Econometrics Toolbox";}
		else if (s.prop4.indexOf('products/vehicle-network/')>-1 || s.prop4.indexOf('/help/vnt/')>-1 || s.prop4.indexOf('/help/toolbox/vnt/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/vnt/')>-1)) {prod="Vehicle Network Toolbox";}
		else if (s.prop4.indexOf('products/sl-design-optimization/')>-1 || s.prop4.indexOf('/help/sldo/')>-1 || s.prop4.indexOf('/help/toolbox/sldo/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/sldo/')>-1)) {prod="Simulink Design Optimization";}
		else if (s.prop4.indexOf('products/do-178/')>-1 || s.prop4.indexOf('/help/qualkitdo/')>-1 || s.prop4.indexOf('/help/toolbox/qualkitdo/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/qualkitdo/')>-1)) {prod="DO Qualification Kit";}
		else if (s.prop4.indexOf('products/iec-61508/')>-1 || s.prop4.indexOf('/help/certkitiec/')>-1 || s.prop4.indexOf('/help/toolbox/certkitiec/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/certkitiec/')>-1)) {prod="IEC Certification Kit";}
		else if (s.prop4.indexOf('products/hdl-verifier/')>-1 || s.prop4.indexOf('/help/edalink/')>-1 || s.prop4.indexOf('/help/toolbox/edalink/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/edalink/')>-1)) {prod="HDL Verifier";}
		else if (s.prop4.indexOf('products/matlab/')>-1 || s.prop4.indexOf('/help/ja_JP/techdoc/')>-1 || s.prop4.indexOf('/help/ja_JP/techdoc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/ja_JP/techdoc/')>-1)) {prod="MATLAB";}
		else if (s.prop4.indexOf('products/matlab/')>-1 || s.prop4.indexOf('/help/matlab/')>-1 || s.prop4.indexOf('/help/techdoc/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/techdoc/')>-1)) {prod="MATLAB";}
		else if (s.prop4.indexOf('products/sl-plc-coder/')>-1 || s.prop4.indexOf('/help/plccoder/')>-1 || s.prop4.indexOf('/help/toolbox/plccoder/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/plccoder/')>-1)) {prod="Simulink PLC Coder";}
		else if (s.prop4.indexOf('products/global-optimization/')>-1 || s.prop4.indexOf('/help/gads/')>-1 || s.prop4.indexOf('/help/toolbox/gads/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/gads/')>-1)) {prod="Global Optimization Toolbox";}
		else if (s.prop4.indexOf('products/matlab-coder/')>-1 || s.prop4.indexOf('/help/coder/')>-1 || s.prop4.indexOf('/help/toolbox/coder/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/coder/')>-1)) {prod="MATLAB Coder";}
		else if (s.prop4.indexOf('products/phased-array/')>-1 || s.prop4.indexOf('/help/phased/')>-1 || s.prop4.indexOf('/help/toolbox/phased/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/phased/')>-1)) {prod="Phased Array System Toolbox";}
		else if (s.prop4.indexOf('products/simulink-code-inspector/')>-1 || s.prop4.indexOf('/help/slci')>-1 || s.prop4.indexOf('/help/toolbox/slci')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/slci/')>-1)) {prod="Simulink Code Inspector";}

//100113 CG: Added last OR statement above to account for changes in the URL of previous doc version & below 6 lines for new products. updated queryval and prodgroup for new products as well.
		else if (s.prop4.indexOf('products/polyspace-code-prover/')>-1 || s.prop4.indexOf('help/codeprover/')>-1 || s.prop4.indexOf('/help/toolbox/codeprover/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/codeprover/')>-1)) {prod="Polyspace Code Prover";}
		else if (s.prop4.indexOf('products/polyspace-bug-finder/')>-1 || s.prop4.indexOf('/help/bugfinder/')>-1 || s.prop4.indexOf('/help/toolbox/bugfinder/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/bugfinder/')>-1)) {prod="Polyspace Bug Finder";}
		else if (s.prop4.indexOf('products/financial-instruments/')>-1 || s.prop4.indexOf('/help/fininst/')>-1 || s.prop4.indexOf('/help/toolbox/fininst/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/fininst/')>-1)) {prod="Financial Instruments Toolbox";}
		else if (s.prop4.indexOf('products/trading/')>-1 || s.prop4.indexOf('help/trading/')>-1 || s.prop4.indexOf('/help/toolbox/trading/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/trading/')>-1)) {prod="Trading Toolbox";}
		else if (s.prop4.indexOf('products/fixed-point-designer/')>-1 || s.prop4.indexOf('/help/fixedpoint/')>-1 || s.prop4.indexOf('/help/toolbox/fixedpoint/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/fixedpoint/')>-1)) {prod="Fixed-Point Designer";} /*doc shares same URL as old FP tb*/
		else if (s.prop4.indexOf('products/matlab-production-server/')>-1 || s.prop4.indexOf('help/mts/')>-1 || s.prop4.indexOf('/help/toolbox/mts/')>-1|| (s.prop4.indexOf('/help/releases/')>-1 && s.prop4.indexOf('/mts/')>-1)) {prod="MATLAB Production Server"}
		else prod = "unknown";

		prod = prod.toLowerCase();
		return prod;
	}
	else {
		queryval=s.getQueryParam(type);
		queryval=queryval.toLowerCase();
		switch (queryval) {
		case "cm": prod = "communications system toolbox"; break;
		case "ct": prod = "control system toolbox"; break;
		case "db": prod = "database toolbox"; break;
		case "ds": prod = "dsp system toolbox"; break;
		case "el": prod = "spreadsheet link ex"; break;
		case "fi": prod = "financial toolbox"; break;
		case "fp": prod = "fixed point designer"; break;
		case "fl": prod = "fuzzy logic toolbox"; break;
		case "ip": prod = "image processing toolbox"; break;
		case "mg": prod = "mapping toolbox"; break;
		case "ml": prod = "matlab"; break;
		case "co": prod = "matlab compiler"; break;
		case "mp": prod = "model predictive control toolbox"; break;
		case "nn": prod = "neural network toolbox"; break;
		case "op": prod = "optimization toolbox"; break;
		case "pd": prod = "partial differential equation toolbox"; break;
		case "ps": prod = "simpowersystems"; break;
		case "rt": prod = "simulink coder"; break;
		case "rc": prod = "robust control toolbox"; break;
		case "sg": prod = "signal processing toolbox"; break;
		case "sl": prod = "simulink"; break;
		case "sf": prod = "stateflow"; break;
		case "st": prod = "statistics toolbox"; break;
		case "sm": prod = "symbolic math toolbox"; break;
		case "id": prod = "system identification toolbox"; break;
		case "wa": prod = "wavelet toolbox"; break;
		case "da": prod = "data acquisition toolbox"; break;
		case "dg": prod = "gauges blockset"; break;
		case "mr": prod = "matlab report generator"; break;
		case "sr": prod = "simulink report generator"; break;
		case "wt": prod = "real-time windows target"; break;
		case "sv": prod = "matlab & simulink student version"; break;
		case "df": prod = "datafeed toolbox"; break;
		case "xp": prod = "xpc target"; break;
		case "xe": prod = "xpc target embedded option"; break;
		case "cf": prod = "curve fitting toolbox"; break;
		case "ic": prod = "instrument control toolbox"; break;
		case "de": prod = "financial derivatives toolbox"; break;
		case "ec": prod = "embedded coder"; break;
		case "vr": prod = "simulink 3d animation"; break;
		case "eb": prod = "matlab builder ex"; break;
		case "mb": prod = "model-based calibration toolbox"; break;
		case "ms": prod = "simmechanics"; break;
		case "ae": prod = "aerospace blockset"; break;
		case "ia": prod = "image acquisition toolbox"; break;
		case "fx": prod = "fixed-income toolbox"; break;
		case "sd": prod = "simulink control design"; break;
		case "bi": prod = "bioinformatics toolbox"; break;
		case "gd": prod = "global optimization toolbox"; break;
		case "vv": prod = "simulink verification and validation"; break;
		case "rf": prod = "rf toolbox"; break;
		case "rb": prod = "simrf"; break;
		case "fh": prod = "filter design hdl coder"; break;
		case "ot": prod = "opc toolbox"; break;
		case "po": prod = "fixed-point toolbox"; break;
		case "sb": prod = "simbiology"; break;
		case "vp": prod = "computer vision system toolbox"; break;
		case "ld": prod = "simdriveline"; break;
		case "dm": prod = "parallel computing toolbox"; break;
		case "dw": prod = "matlab distributed computing server"; break;
		case "se": prod = "simevents"; break;
		case "mn": prod = "matlab builder ne"; break;
		case "sh": prod = "simhydraulics"; break;
		case "sy": prod = "systemtest"; break;
		case "hd": prod = "hdl coder"; break;
		case "mj": prod = "matlab builder ja"; break;
		case "at": prod = "aerospace toolbox"; break;
		case "dv": prod = "simulink design verifier"; break;
		case "ss": prod = "simscape"; break;
		case "pf": prod = "polyspace server for ada"; break;
		case "pg": prod = "polyspace model link sl"; break;
		case "pc": prod = "polyspace client for c/c++"; break;
		case "ph": prod = "polyspace model link tl"; break;
		case "pi": prod = "polyspace uml link rh"; break;
		case "pa": prod = "polyspace client for ada"; break;
		case "pb": prod = "polyspace code prover"; break;
		case "aa": prod = "al's toolbox"; break;
		case "bx": prod = "bryans toolbox"; break;
		case "sn": prod = "simelectronics"; break;
		case "et": prod = "econometrics toolbox"; break;
		case "vn": prod = "vehicle network toolbox"; break;
		case "so": prod = "simulink design optimization"; break;
		case "ar": prod = "phased array system toolbox"; break;
		case "do": prod = "do qualification kit"; break;
		case "ie": prod = "iec certification kit"; break;
		case "es": prod = "hdl verifier"; break;
		case "pl": prod = "simulink plc coder"; break;
		case "ci": prod = "simulink code inspector"; break;
		case "me": prod = "matlab coder"; break;
		case "hm": prod = "simulink hmi design"; break;
		case "it": prod = "financial instruments toolbox"; break;
		case "pr": prod = "matlab production server"; break;
		case "TR": prod = "trading toolbox"; break;
		case "BF": prod = "polyspace bug finder"; break;

		default:
			prod = "unknown";
			break;
		}
		prod = prod.toLowerCase();
		return prod;

	}
}

function prodgroup (prod){
		prod = prod.toLowerCase();
		switch (prod) {
		case "aerospace blockset": prodgrp="v1 control systems"; break;
		case "aerospace toolbox": prodgrp="v1 control systems"; break;
		case "al's toolbox": prodgrp="unknown"; break;
		case "bioinformatics toolbox": prodgrp="v5 computational biology"; break;
		case "bryans toolbox": prodgrp="unknown"; break;
		case "communications system toolbox": prodgrp="v2 signal processing and communications"; break;
		case "computer vision system toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "control system toolbox": prodgrp="v1 control systems"; break;
		case "curve fitting toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "data acquisition toolbox": prodgrp="v4 test and measurement"; break;
		case "database toolbox": prodgrp="v6 computational finance"; break;
		case "datafeed toolbox": prodgrp="v6 computational finance"; break;
		case "do qualification kit": prodgrp="s6 embedded code generation"; break;
		case "dsp system toolbox": prodgrp="v2 signal processing and communications"; break;
		case "econometrics toolbox": prodgrp="v6 computational finance"; break;
		case "embedded coder": prodgrp="s6 embedded code generation"; break;
		case "filter design hdl coder": prodgrp="s7 hdl code generation and verification"; break;
		case "financial derivatives toolbox": prodgrp="v6 computational finance"; break;
		case "financial instruments toolbox": prodgrp="unknown"; break;
		case "financial toolbox": prodgrp="v6 computational finance"; break;
		case "fixed-income toolbox": prodgrp="v6 computational finance"; break;
		case "fixed-point toolbox": prodgrp="s6 embedded code generation"; break;
		case "fuzzy logic toolbox": prodgrp="v1 control systems"; break;
		case "gauges blockset": prodgrp="s1 simulink and stateflow"; break;
		case "global optimization toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "hdl coder": prodgrp="s7 hdl code generation and verification"; break;
		case "hdl verifier": prodgrp="s7 hdl code generation and verification"; break;
		case "iec certification kit": prodgrp="s6 embedded code generation"; break;
		case "image acquisition toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "image processing toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "instrument control toolbox": prodgrp="v4 test and measurement"; break;
		case "mapping toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "matlab": prodgrp="m1 matlab"; break;
		case "matlab & simulink student version": prodgrp="e1 edu"; break;
		case "matlab builder ex": prodgrp="m3 application deployment"; break;
		case "matlab builder ja": prodgrp="m3 application deployment"; break;
		case "matlab builder ne": prodgrp="m3 application deployment"; break;
		case "matlab coder": prodgrp="s6 embedded code generation"; break;
		case "matlab compiler": prodgrp="m3 application deployment"; break;
		case "matlab distributed computing server": prodgrp="m4 parallel computing"; break;
		case "matlab production server": prodgrp="unknown"; break;
		case "matlab report generator": prodgrp="s1 simulink and stateflow"; break;
		case "model predictive control toolbox": prodgrp="v1 control systems"; break;
		case "model-based calibration toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "neural network toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "opc toolbox": prodgrp="v4 test and measurement"; break;
		case "optimization toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "parallel computing toolbox": prodgrp="m4 parallel computing"; break;
		case "partial differential equation toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "phased array system toolbox": prodgrp="v2 signal processing and communications"; break;
		case "polyspace client for ada": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace client for c/c++": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace model link sl": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace model link tl": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace server for ada": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace server for c/c++": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace uml link rh": prodgrp="p1 polyspace embedded code verification"; break;
		case "real-time windows target": prodgrp="s4 rapid prototyping and hil simulation"; break;
		case "rf toolbox": prodgrp="v2 signal processing and communications"; break;
		case "robust control toolbox": prodgrp="v1 control systems"; break;
		case "signal processing toolbox": prodgrp="v2 signal processing and communications"; break;
		case "simbiology": prodgrp="v5 computational biology"; break;
		case "simdriveline": prodgrp="s3 physical modeling"; break;
		case "simelectronics": prodgrp="s3 physical modeling"; break;
		case "simevents": prodgrp="s2 discrete event simulation"; break;
		case "simhydraulics": prodgrp="s3 physical modeling"; break;
		case "simmechanics": prodgrp="s3 physical modeling"; break;
		case "simpowersystems": prodgrp="s3 physical modeling"; break;
		case "simrf": prodgrp="v2 signal processing and communications"; break;
		case "simscape": prodgrp="s3 physical modeling"; break;
		case "simulink": prodgrp="s1 simulink and stateflow"; break;
		case "simulink 3d animation": prodgrp="s1 simulink and stateflow"; break;
		case "simulink code inspector": prodgrp="s6 embedded code generation"; break;
		case "simulink coder": prodgrp="s6 embedded code generation"; break;
		case "simulink control design": prodgrp="v1 control systems"; break;
		case "simulink design optimization": prodgrp="v1 control systems"; break;
		case "simulink design verifier": prodgrp="s5 model verification and validation"; break;
		case "simulink fixed point": prodgrp="s6 embedded code generation"; break;
		case "simulink hmi design": prodgrp="s1 simulink and stateflow"; break;
		case "simulink plc coder": prodgrp="s6 embedded code generation"; break;
		case "simulink report generator": prodgrp="s1 simulink and stateflow"; break;
		case "simulink verification and validation": prodgrp="s5 model verification and validation"; break;
		case "spreadsheet link ex": prodgrp="v6 computational finance"; break;
		case "stateflow": prodgrp="s1 simulink and stateflow"; break;
		case "statistics toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "symbolic math toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "system identification toolbox": prodgrp="v1 control systems"; break;
		case "systemtest": prodgrp="s5 model verification and validation"; break;
		case "unknown tmw": prodgrp="z2 obsolete"; break;
		case "vehicle network toolbox": prodgrp="v4 test and measurement"; break;
		case "wavelet toolbox": prodgrp="v2 signal processing and communications"; break;
		case "xpc target": prodgrp="s4 rapid prototyping and hil simulation"; break;
		case "xpc target embedded option": prodgrp="s4 rapid prototyping and hil simulation"; break;
		case "trading toolbox": prodgrp="v6 computational finance"; break;
		case "polyspace bug finder": prodgrp="p1 polyspace embedded code verification"; break;

		default:
			prodgrp = "unknown";
			break;
		}
		prodgrp = prodgrp.toLowerCase();
		return prodgrp;
	}

var cvURL = unescape(document.URL);
cvURL = cvURL.toLowerCase();
cvURL = undorewrite(cvURL);

var refURL = unescape(document.referrer);
refURL = refURL.toLowerCase();
refURL = undorewrite(refURL);
/* Set report suite ID dynamically based on domain */

ReportSuiteID = cfCheckRSID(cvURL);
var s_account = ReportSuiteID ;

// if (cvURL.indexOf('www-external-')>-1 || cvURL.indexOf('.dhcp.mathworks.')>-1 || cvURL.indexOf('-dev')>-1 || cvURL.indexOf('-test')>-1 || cvURL.indexOf('-integ')>-1 || cvURL.indexOf('dev-')>-1 || cvURL.indexOf('uat-')>-1 || ((cvURL.indexOf('mathworksservicerequest.') >-1 && cvURL.indexOf('.cs')>-1)))
// {
// 	var s_account = "mathglobaltest";
// }
/* 050114 Added below statment to set report suite on mathworksservicerequest.secure.force.com based upon the cc query string parameter CG */

if (cfGetQParam(cvURL,'cc') != ""  &&  cvURL.indexOf('mathworksservicerequest.') >-1 && cvURL.indexOf('.cs')==-1 ){
	forceReportSuite = cfGetQParam(cvURL,'cc');
	forceReportSuite = forceReportSuite.toLowerCase();
	if (forceReportSuite == "us") {
		s_account="mathwgbl,mathwmain";
	}
	else if (forceReportSuite == "de") {
		s_account="mathwgbl,mathwde";
	}
	else if (forceReportSuite == "cn") {
		s_account="mathwgbl,mathwcn";
	}
	else if (forceReportSuite == "in") {
		s_account="mathwgbl,mathwin";
	}
	else if (forceReportSuite == "jp") {
		s_account="mathwgbl,mathwjp";
	}
	else if (forceReportSuite == "uk") {
		s_account="mathwgbl,mathwuk";
	}
	else if (forceReportSuite == "kr") {
		s_account="mathwgbl,mathwkr";
	}
	else if (forceReportSuite == "au") {
		s_account="mathwgbl,mathwau";
	}
	else if (forceReportSuite == "ch") {
		s_account="mathwgbl,mathwch";
	}
	else if (forceReportSuite == "es") {
		s_account="mathwgbl,mathwes";
	}
	else if (forceReportSuite == "fr") {
		s_account="mathwgbl,mathwfr";
	}
	else if (forceReportSuite == "it") {
		s_account="mathwgbl,mathwit";
	}
	else if (forceReportSuite == "nl") {
		s_account="mathwgbl,mathwnl";
	}
	else if (forceReportSuite == "se") {
		s_account="mathwgbl,mathwse";
	}
	else {s_account="mathwgbl";}
}
s= new AppMeasurement();
 s=s_gi(s_account);

// Function to return s_account for Flash Video tracking
s.bcAccount = function(){
	return s_account;
}
s.bcInfo = function(){
	var s=this;
	return "prop24|"+s.pageName+"^prop27|"+s.pageURL+"^prop25|"+document.referrer.toString();
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */

/*Adding for the visitorID service - 082515 CG*/
s.visitor = Visitor.getInstance("B1441C8B533095C00A490D4D@AdobeOrg");

s.charSet="UTF-8";
/* Conversion Config */
s.currencyCode="USD";
/* Link Tracking Config */

s.trackDownloadLinks	=	true;
s.trackExternalLinks	=	true;
s.trackInlineStats		=	true;
s.linkDownloadFileTypes	=	"exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,dmg";
s.linkInternalFilters	=	"javascript:,mathworks.,force.com";
s.linkLeaveQueryString	=	false;
s.linkTrackVars			=	"None";
s.linkTrackEvents		=	"None";
s.visitorNamespace		=	"mathworks";
s.mobile 				=	"true"; //100113 CG: added this line to use the mobile suscriber ID to track mobile visits

/* Channel Manager Plugin Config */
/*Left out -'Internal Banner Ad' then 'IBA_ Remove adw_ in production*/
s._channelPattern="Paid Search|ppc_>Paid Social Ad|psb_>Paid Social Media|psm_>External Promotion|pep_>Partner Promotion|prp_>Paid Search|adw_"
s._channelParameter="Email|s_v1"
s._channelDomain="Social Media|facebook.com,linkedin.com,twitter.com,orkut.com,friendster.com,livejournal.com,blogspot.com,wordpress.com,friendfeed.com,myspace.com,digg.com,reddit.com,stumbleupon.com,twine.com,yelp.com,mixx.com,delicious.com,tumblr.com,disqus.com,intensedebate.com,plurk.com,slideshare.net,backtype.com,netvibes.com,mister-wong.com,diigo.com,flixster.com,youtube.com,vimeo.com,12seconds.tv,zooomr.com,identi.ca,jaiku.com,flickr.com,imeem.com,dailymotion.com,photobucket.com,fotolog.com,smugmug.com,classmates.com,myyearbook.com,mylife.com,tagged.com,brightkite.com,ning.com,bebo.com,hi5.com,yuku.com,cafemom.com,xanga.com"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
// FPC Migration
s.trackingServer="metrics.mathworks.com"
s.trackingServerSecure="smetrics.mathworks.com"
s.visitorMigrationKey="51AA1C7A"
s.visitorMigrationServer="mathworks.com.ssl.sc.omtrdc.net"
s.visitorMigrationServerSecure="mathworks.com.ssl.d1.sc.omtrdc.net"

/*setting cookie domain variable - added 12/28/2012 - CG*/
s.fpCookieDomainPeriods="2"
var d=window.location.hostname
if(d.indexOf('.co.uk')>-1||d.indexOf('.co.jp')>-1||d.indexOf('.co.kr')>-1||d.indexOf('.com.au')>-1)
  s.fpCookieDomainPeriods="3";


/************************** CONFIG SECTION END **************************/


s.usePlugins	=	true;
function s_doPlugins(s)
{

	/*	Set PageName	*/

	 if ((!window.s.pageType) && (s.pageName== "" || s.pageName==null))  {
		s.pageName=cfUtility(cvURL,'pagename');
	 }

	/*	Set Channel	*/
	s.channel=cfUtility(cvURL,'channel');

	/*	Set Server	*/
	s.server=cfUtility(cvURL,'server');

	if ((cvURL.indexOf('blogs.mathworks.')>-1) && (s.channel=="/"))
	{
		s.channel="blogs index page";
		if (!window.s.pageType){
			s.pageName="blogs index page";
		}
		s.prop32="blogs";

	}
	else if (s.channel=="/") //&& (cvURL.indexOf('/downloads') ==-1))
	{
		s.channel="homepage";
		if (!window.s.pageType){
			s.pageName="homepage";
		}
	}

	/* Set URL Page Name */
	if (s.channel=="homepage" || s.channel=="blogs index page"){
		s.prop4 = s.server;
	}
	else {
		s.prop4 = s.server+ cfUtility(cvURL,'pagename');
	}

	/* Some exceptions when file= query string param is present */
	if (s.getQueryParam('file') != "")
	{
		if (!window.s.pageType){
			s.pageName=cfUtility(cvURL,'pagename')+"?file="+s.getQueryParam('file');
		}
	s.prop4 = s.server+s.channel+"?file="+s.getQueryParam('file');
	}

	String.prototype.replaceAll = function(str1, str2, ignore){
   		return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
	};

	/* setting prop33 for WSM URL Pagename*/
	s.prop33=s.prop4.replaceAll("/","::");

	/*setting blank prop17 for WSM lead generator type*/
	s.prop17="BLANK";

	/*  Set Site Section, Sub Sections */
	cvSplit = s.channel.split("/");
	if ((s.prop5 == null || s.prop5 == "") && cvSplit[1] != null && cvSplit[1] != "") s.prop5 = cvSplit[1];
	if (cvURL.indexOf('makerzone.mathworks')>-1 && (cvSplit[1] == null || cvSplit[1] == "")) s.prop5 = "mz::" + s.channel; // 01013 CG added this line to indentify MAL for MZ homepage
	if ((s.prop5 == null || s.prop5 == "") && (cvSplit[1] == null || cvSplit[1] == "")) s.prop5 = s.channel; // 01013 CG added this line to indentify MAL for homepage & blogs
	if (cvURL.indexOf('makerzone.mathworks')>-1 && (cvSplit[1] != null && cvSplit[1] != "") ) s.prop5 ="mz::" + cvSplit[1]; // 01013 CG added this line to indentify makerzone MALs
	if (cvSplit[2] != null && cvSplit[2] != "") s.prop6 = s.prop5 + "/" + cvSplit[2];
	if (cvSplit[3] != null && cvSplit[3] != "") s.prop7 = s.prop6 + "/" + cvSplit[3];


	/* Get new and legacy campaign parameters from URL */
	if (s.getQueryParam('s_eid') != "") {
		s.campaign = s.eVar13=s.getValOnce(s.getQueryParam('s_eid')); // wrap getValonce plugin
	}
	else if (s.getQueryParam('s_v1') != "") {
		var tmpv1 = s.getQueryParam('s_v1');
		if(tmpv1.indexOf('_') > 0) {
	      	s.campaign=tmpv1.substring(0,tmpv1.indexOf('_'));
		}
        else {
        	s.campaign=tmpv1;
        }
		//Email opened - prop56
		s.prop56=s.getQueryParam('s_v1');
        // de-duplicate campaign variable to keep from inflating values
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
		//s.eVar1=s.campaign;
		s.eVar1='D=v0';
		//s.campaign = s.eVar1=s.getValOnce(s.getQueryParam('s_v1'));
	}

	if (s.getQueryParam('s_tid') != "") {
		s.eVar14 = s.getValOnce(s.getQueryParam('s_tid'));
		//s.prop22=s.eVar14;
		s.prop22='D=v14';
	}
	if (s.getQueryParam('s_iid') != "") {
		s.eVar15 = s.getValOnce(s.getQueryParam('s_iid'));
		//s.prop23=s.eVar15;
		s.prop23='D=v15';
	}
	if (s.getQueryParam('s_cid') != "") {
		s.eVar35 = s.getValOnce(s.getQueryParam('s_cid'));
	}

	if (s.campaign != '') {
		s.prop1=s.getAndPersistValue(s.campaign,'s_cmp_pages',0);
	}
	if (s.prop1 != '') {
		if (!window.s.pageType){
			//s.prop2=s.prop1 +"||"+ s.pageName;
			s.prop2='D=c1+"||"+pageName';
		}
	}

	if (s.eVar1 != '') {
		s.prop12=s.getAndPersistValue(s.eVar1,'s_email_pages',0);
	}
	if (s.prop12 != '') {
		if (!window.s.pageType){
			//s.prop13=s.prop12 +"||"+ s.pageName;
			s.prop13='D=c12+"||"+pageName';
		}
	}

	if (s.eVar35 != '') {s.prop8=s.getAndPersistValue(s.eVar35,'s_old_pages',0); }
	if (s.prop8 != '') {
		if (!window.s.pageType){
			//s.prop9=s.prop8 +"||"+ s.pageName;
			s.prop9='D=c8+"||"+pageName';
		}
	}

	if(s.getQueryParam('elq_cid') != "") {
		s.eVar59 = s.getValOnce(s.getQueryParam('elq_cid'));
		}



	/*	Set Page Title and Full URL*/
	s.prop35=document.title.toLowerCase();
	s.prop34="D=g";
	//s.prop34=decodeURI(cvURL); 091813 CG: commented out to reduce image request size, using dynamic variable above


	/*	Capturing referrer and previous page information	*/
	if (cfUtility(refURL,'server').search("mathworks.") != -1){
		s.prop10= cfUtility(refURL,'server');
		s.prop28= s.getPreviousValue(s.prop35,'c_c35','');
		refSplit = cfUtility(refURL,'channel').split("/");
		if ((s.prop19 == null || s.prop19 == "") && refSplit[1] != null && refSplit[1] != "") s.prop19 = refSplit[1];
		if ((s.prop19 == null || s.prop19 == "") && (refSplit[1] == null || refSplit[1] == "")) s.prop19 = 'D=c40' ; // 01013 CG added this line to indentify previous MAL for homepage and blogs
		if (refURL.indexOf('makerzone.mathworks')>-1 && (refSplit[1] != null && refSplit[1] != "") ) s.prop19 ="mz::" + refSplit[1]; /// 01013 CG added this line to indentify makerzone MALs
		if (refSplit[2] != null && refSplit[2] != "") s.prop20 = s.prop19 + "/" + refSplit[2];
		if (refSplit[3] != null && refSplit[3] != "") s.prop21 = s.prop20 + "/" + refSplit[3];
		s.prop42="D=r";
		//s.prop42=decodeURI(refURL); 091813 CG: commented out to reduce image request size, using dynamic variable above
		s.prop29=cfUtility(refURL,'server')+cfUtility(refURL,'channel')+cfUtility(refURL,'filename');
		/* Get previous value of product name, group, artifact type and lead generator. Copied from old s_code	*/
		s.prop38= s.getPreviousValue(s.prop30,'c_c30','');
		s.prop39= s.getPreviousValue(s.prop31,'c_c31','');
		s.prop40= s.getPreviousValue(s.prop32,'c_c32','');
		//s.prop41= s.getPreviousValue(s.prop33,'c_c33','');
		/* Capturing CTA location	*/
		if (s.prop29 && s.getQueryParam('s_iid') != ""){
			//s.eVar28=s.prop29;
			s.eVar28='D=c29';
			s.eVar54='D=c40';
		}
	}


	/* Set Internal Search Phrase	*/
	if (s.getQueryParam('q') != '') {
		s.eVar3=s.getQueryParam('q');
		s.prop3=s.getQueryParam('q');
	}
	if (s.getQueryParam('qdoc') != '') {
		s.eVar3=s.getQueryParam('qdoc')+':: lucene';
		s.prop3=s.getQueryParam('qdoc')+':: lucene';
	}

	/* Set MWA Unique ID, Omniture Visitor ID & MW Gen. Unique Visit ID	*/
	if (document.cookie.match('MW_AL')) {
		s.eVar4='logged in';
	}
	else {
		s.eVar4='not logged in';
	}
	if (document.cookie.match('MW_AL')) {
		s.eVar5=s.c_r('MW_AL');
		s.prop16=s.c_r('MW_AL');
	}

	/* New or Repeat Visit and Days Since Last Visit*/
	s.eVar6=s.getNewRepeat();
	s.eVar9=s.getDaysSinceLastVisit();


	/*	Identify first page of visit	*/
	var tmp	= s.getVisitStart('c_vs');
	if (tmp == 1)	{
		s.prop15 = 'Yes';
		s.eVar29= Math.floor(Math.random()*1000000); // Random number
		//s.eVar25=s.prop35;
		s.eVar25='D=c35';
		if (!window.s.pageType){
			//s.eVar26=s.pageName;
			s.eVar26='D=pageName';
		}
		//s.eVar27=s.server;
		s.eVar27='D=server';
		var ts = Math.round((new Date()).getTime() / 1000);
		s.eVar34=s.eVar29+'::'+ts; // Random number+Unix time stamp
	}

	if (s.eVar29 != '') {
		s.prop26=s.getAndPersistValue(s.eVar29,'c_rand',0);
	}
	if (s.eVar34 != '') {
		s.prop14=s.getAndPersistValue(s.eVar34,'c_sess',0);
	}

	/*	Last Seminar Viewed	*/
	if (s.prop4.search("/company/events/seminars/seminar") != -1) {
		//s.eVar12 = s.prop35;
		s.eVar12='D=c35';
	}

	/*	Recruiting source	*/
	if (s.prop4.search("/company/jobs/") != -1 && s.getQueryParam('src') != '')	{
		s.eVar19 =s.getQueryParam('src');
	}


	/* Setting MW Lead Submit ID on confirmation pages */
	if (s.getQueryParam('wfsid') != ''){
		s.prop53 = s.getQueryParam('wfsid');
	}

	if (s.getQueryParam('elqsid')!= ''){
		s.prop53= s.getQueryParam('elqsid');
	}

		/* Setting contact potential use on confirmation pages */
	if (s.getQueryParam('potential_use') != ''){
		s.prop18 =s.getQueryParam('potential_use');
		s.eVar63 =s.getQueryParam('potential_use');
	}

	/*	Success Events - Pls. work in Korean Conf. event59 & event51 in old code	*/
	/*050114 CG update events for eloqua landing pages*/

	// Trial Confirmation
	if (s.prop53){
		if (s.prop4.search("/programs/trials/trial_confirmation.html") != -1 ||
			s.prop4.search("-trial-request-conf") != -1||
			s.prop4.search("/programs/trials/earlyvv_trials_confirmation.html") != -1||
			s.prop4.search("/programs/nrd/matlab-trial-request-conf") != -1 ||
			s.prop4.search("/programs/nrd/buy-matlab-get-price-request-conf") !=-1 ||
			s.prop35.search("trial software request confirmation") != -1 ||
			s.prop4.search("/programs/trials/trial_options.html") != -1)	{
			s.events='event1:'+s.prop53+',event24:'+s.prop53;
			s.eVar8='Trial Requested';
		}

		// Contact Sales
		if (s.prop4.search("/company/aboutus/contact_us/confirmation.html") != -1 ||
		   (s.prop4.search("-csa-")!= -1 && s.prop4.search("confirmation") != -1)){
			s.events='event2:'+s.prop53+',event24:'+s.prop53;
			s.eVar8='Contact Sales';
		}

		// TechKit Requested
		if (s.prop4.search("/cmspro/conf") != -1 ||
			s.prop4.search("/techkit/conf") != -1 ||
			s.prop4.search("conf_techkit") != -1 ||
			(s.prop4.search("/techkits/") != -1 && s.prop4.search("conf") != -1) ||
			(s.prop4.search("techkits") != -1 && s.prop4.search("conf") != -1) ||
			s.prop4.search("/student_version/techkit_conf") != -1 ||
			(s.prop4.search("-kit-") != -1 && s.prop4.search("confirmation") != -1))
		{
			s.events='event3:'+s.prop53+',event24:'+s.prop53;
			s.eVar8='Techkit Requested';
		}

		// White paper registration

		if (s.prop4.search("download-white-paper_conf")!= -1) {
			s.events='event53:'+s.prop53+',event24:'+s.prop53;
		}

		//adwords confirmation pages

		if ((s.prop4.search("/nrd/") !=-1) && (s.prop4.search("-conf")) !=-1) {
			s.events='event54:'+s.prop53+',event24:'+s.prop53;
			s.eVar8='AdWords Confirmation'
		}

		// Course Ware requested
			if (s.prop4.search("/academia/courseware")!= -1 && s.prop4.search("confirmation") != -1) {
			s.events='event56:'+s.prop53+',event24:'+s.prop53;
		}

		// Event Registration
		if (s.prop4.search("/company/events/seminars/intl_reg_conf_page.html") != -1 ||
			(s.prop4.search("-sem-") != -1 && s.prop4.search("confirmation") != -1)) {
			s.events ='event4:'+s.prop53+',event6:'+s.prop53+',event24:'+s.prop53;
			s.eVar8 = 'Seminar Registration';
		}
		else if (s.prop4.search("/webinars/webinarconf.html") != -1 ||
				(s.prop4.search("-rwb-") != -1 && s.prop4.search("confirmation") != -1)) {
			//var id= s.getQueryParam('id'); // to be used for deduping - not required because of wfsid
			s.events='event4:'+s.prop53+',event7:'+s.prop53+',event24:'+s.prop53;
			s.eVar8 = 'Recorded Webinar Registration';
		}
///added on 61813 to track ovp video registrations - CG ////
		else if (s.prop58 != null && s.prop58.search("conf") !=-1) {
			s.events='event4:'+s.prop53+',event7:'+s.prop53+',event24:'+s.prop53;
			s.eVar8 = 'Recorded Webinar Registration';
		}
		else if (s.prop59 != null && s.prop59.search("conf") !=-1) {
			s.events='event4:'+s.prop53+',event24:'+s.prop53+',event37:'+s.prop53;
			s.eVar8 = 'OVP Registration';
		}
		else if (s.prop4.search("/webinars/upcomingconf.html") != -1 ||
			(s.prop4.search("-lwb-") != -1 && s.prop4.search("confirmation") != -1)) {
			//var id= s.getQueryParam('id'); // to be used for deduping - not required because of wfsid
			s.events='event4:'+s.prop53+',event8:'+s.prop53+',event24:'+s.prop53;
			s.eVar8 = 'Live Webinar Registration';
		}
		else if ( s.prop4.search("events/conferences/matlab-tour/confirmation.html") !=-1 ||
			(s.prop4.search("/company/events/") != -1 && s.prop4.search("tour") != -1 && s.prop4.search("confirmation.html") != -1)) {
			s.events='event4:'+s.prop53+',event9:'+s.prop53+',event24:'+s.prop53;  //tour registration
			s.eVar8 = 'Tour Registration';
		}
		else if (s.prop4.search("company/events/conferences/") != -1 && s.prop4.search("confirmation.html") !=-1 ||
			(s.prop4.search("-con-") != -1 && s.prop4.search("confirmation") !=-1)) {
			s.events='event4:'+s.prop53+',event10:'+s.prop53+',event24:'+s.prop53; //conference registration
			s.eVar8='Conference Registration';
		}
		else if (s.prop4.search("services/training/confirm_training.html") != -1) {
			s.events='event11:'+s.prop53+',event24:'+s.prop53;  // Contacted Training
			s.eVar8='Contacted Training';
		}
		else if (s.prop4.search("services/training/conf_brochure.html") != -1) {
			s.events='event13:'+s.prop53+',event24:'+s.prop53;  // Training Brochure Requested
			s.eVar8='Training Brochure Requested';
		}
		else if (s.prop4.search("support/contact_us/renewal_confirm.html") != -1 ||
			(s.prop4.search("-rer-") != -1 && s.prop4.search("confirmation") != -1 )) {
			s.events='event16:'+s.prop53+',event24:'+s.prop53;  // SMS Renewal Requested
			s.eVar8='SMS Renewal Requested';
		}
		else if (s.prop4.search("company/aboutus/contact_us/quote_confirmation.html") != -1 ||
			(s.prop4.search("qur") != -1 && s.prop4.search("confirmation") != -1)){
			s.events='event17:'+s.prop53+',event24:'+s.prop53;  // Sales Quote Requested
			s.eVar8='Sales Quote Requested';
		}
		else if (s.prop4.search("academia/student_version/eval_confirmation.html") != -1){
			s.events='event21:'+s.prop53+',event24:'+s.prop53;  //SV Evaluation Requested
			s.eVar8='SV Eval Requested';
		}
	}

		if (s.prop4.search("/programs/trials/trial_options.html") != -1)	{
			s.events='event1'
	}

	if (s.prop4.search("/company/jobs/apply/job_bids/confirmation") != -1 || s.prop4.search("/company/jobs/apply/quick_apply/create")!=-1) {
			s.events='event20'; // Resume Submitted
		}

		else if (s.prop4.search("emailoptions/mailings/confirmation") !=-1 || s.prop4.search("/preference-center-confirmation") !=-1) {
			s.events='event12'; // Email Opt-Out Confirmation

	}
		else if (s.prop4.search("/support/service_requests/submitaction.do") != -1) {
			s.events='event15'; // Service Request Submitted
	}
		else if (s.prop4.search("/academia/student_center/tutorials/") != -1 && cvURL.indexOf("launchpad") >-1) {
			s.events='event14' // Tutorial Registration
			s.eVar8='Tutorial Registration';
		}

		/*100113 CG: Moved Tutorial registration below s.prop53 constrait and removed serialization from event 14*///

	/*else if (s.server.search(".co.kr") != -1 && s.prop4.search("company/events/conferences/technology-conference-korea/proceedings") !=-1 &&
		(s.prop4.search("i1-model-based-design.html")!= -1 || s.prop4.search("d4-image-video-processing.html") !=-1 ||
		s.prop4.search("v2-early-verification.html")!= -1 || s.prop4.search("i2-signal-processing.html")!= -1||
		s.prop4.search("i4-vihecle-design-optimization.html")!= -1||s.prop4.search("d1-sytem-toolbox.html")!= -1 )) {
			s.events='event22'; //KR Conf Proceedings Watched
			//s.eVar8 = 'Korean Conference Proceedings Watched';
	}*/
		else if (s.prop4.search("/programs/customersat/confirmation.html") != -1) {
			s.events='event23'; // CustomerSat Confirmation
	}
		else if (s.prop4.search("/expert_contact_conf.html") !=-1 || s.prop4.search("/expert-contact-confirmation.html") != -1) {
			s.events='event25'; // Expert contacted
	}
		else if (s.prop4.search("/services/consulting/confirmation.html") !=-1)  {
			s.events='event22'; // Consulting contacted
		}

	/*code to captuire apply now button - added 12/28/2012 - CG */
	if (s.prop4.search("/company/jobs/apply/job_bids/resume")!= -1 ) {
			s.events='event36'; // Apply Logged-in
	}
		else if (s.prop4.search("/company/jobs/apply/apply_now")!=-1)  {
			s.events='event37'; // Apply Not Logged-in
	}

	//code to captuire web store order confirmation - added 12/28/2012 - CG. 100113 CG: updated for new web store confirmation page (/store/checkoutconfirmed.do) & turned on visit based event serialization
	if (s.prop4.search("/store/verifysubmit.do") != -1) {
			s.events='event35, event46';
	}

	if (s.prop4.search("/store/checkoutconfirmed.do") != -1) {
			s.events='event35, event47';
	}
	/// 03032015 CG: added code to capture price list PDF offer confirmation
	if (s.prop4.search("/pricing/pricing_list_conf.html") != -1) {
			s.events='event57:'+s.prop53+',event24:'+s.prop53;
		}

	/*	Code to get Google referrer information	*/
	s.getGoogleRank('event18','event19','eVar17','eVar18');
	if(s.events){
		if((s.events+',').indexOf('event18,')>-1){
			if (!window.s.pageType){
				s.hier1=s.eVar17+"|"+s.pageName+"|"+s.eVar18;
				s.hier2=s.pageName+"|"+s.eVar18+"|"+s.eVar17+"|";
			}
		}
	}


// 100113 CG: added below line to set referrer sub-domain
	s.eVar55 = s.getFullReferringDomains();

	/* Channel Manager v2.4	*/
		s.channelManager('s_eid,s_v1',':','c_cm','','s_dl',0);
		if (s._channel != "" || s._channel != undefined){
			s.eVar37=s._referringDomain;
			s.eVar38=s._partner;
			//s.campaign=s._campaignID;
			s.eVar39=s.campaign;
			s.eVar2=s._keywords;
			s.eVar40=s._channel;
			s.eVar36=s._referrer;
		}


	if (s.eVar2 != '') {
		s.prop11=s.getAndPersistValue(s.eVar2,'c_srch',0);
	}

	/*Setting the Campaign Touches counter*/
		if(s.eVar39){
			s.eVar41='+1'; s.eVar42='+1'; s.eVar43='+1'; s.eVar44='+1';
			s.events=s.apl(s.events,'event5',',',2);
		}

	/*Setting getTimeToComplete plugin to measure time from campaign click-through to registration completion*/
/*	if(s.events){
		if((s.events+',').indexOf('event5,')>-1){s.eVar45=s.eVar46=s.eVar47=s.eVar48='start';}
		if((s.events+',').indexOf('event1,')>-1){s.eVar45='stop';}
		if((s.events+',').indexOf('event2,')>-1){s.eVar46='stop';}
		if((s.events+',').indexOf('event3,')>-1){s.eVar47='stop';}
		if((s.events+',').indexOf('event4,')>-1){s.eVar48='stop';}
	}*/
	if(s.events){
		if(s.eVar39){s.eVar45=s.eVar46=s.eVar47=s.eVar48='start';}
		if(s.events.indexOf('event1:')>-1){s.eVar45='stop';}
		if(s.events.indexOf('event2:')>-1){s.eVar46='stop';}
		if(s.events.indexOf('event3:')>-1){s.eVar47='stop';}
		if(s.events.indexOf('event4:')>-1){s.eVar48='stop';}
	}

	s.eVar45=s.getTimeToComplete(s.eVar45,'ttc45',0);
	s.eVar46=s.getTimeToComplete2(s.eVar46,'ttc46',0);
	s.eVar47=s.getTimeToComplete3(s.eVar47,'ttc47',0);
	s.eVar48=s.getTimeToComplete4(s.eVar48,'ttc48',0);


	if (s.eVar40){
		/*Trial Requested - Campaign Stacking Channel*/
		s.eVar49=s.crossVisitParticipation(chnlshrink(s.eVar40),'v49','365','20','>','event1',1);

		/*Contacted Sales - Campaign Stacking Channel*/
		s.eVar50=s.crossVisitParticipation(chnlshrink(s.eVar40),'v50','365','20','>','event2',1);

		/*TechKit Requested - Campaign Stacking Channel*/
		s.eVar51=s.crossVisitParticipation(chnlshrink(s.eVar40),'v51','365','20','>','event3',1);

		/*Event Registration - Campaign Stacking Channel*/
		s.eVar52=s.crossVisitParticipation(chnlshrink(s.eVar40),'v52','365','20','>','event4',1);
	}

	/* The following functions set product name into propN(30) and product group into propN(31) */
	s.prop30= prodassign('urly');
	if ((!s.prop30 || s.prop30=="unknown")&& s.getQueryParam('ref') != '' ){
		s.prop30=prodassign('ref');
	}
	else if ((!s.prop30 || s.prop30=="unknown") && s.getQueryParam('product') != ''){
		s.prop30=prodassign('product');
	}
	if (s.prop30){
		s.prop31=prodgroup(s.prop30);
	}

	/*	Additional product name, group, artifact type assignment	*/
	if(s.prop5 == 'solutions'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32 = 'solution';
	}
	else if(s.prop5 == 'data-acquisition' || s.prop5== 'data-analysis' || s.prop5 == 'mathematical-modeling' || s.prop5 == 'algorithm-development' || s.prop5 == 'parallel-computing' || s.prop5 == 'desktop-web-deployment'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32 = 'solution-capabilities';
	}
	else if(s.prop5=='system-design-simulation'||s.prop5=='physical-modeling'||s.prop5=='discrete-event-simulation'||s.prop5=='rapid-prototyping'||s.prop5=='embedded-code-generation'||s.prop5=='hdl-code-generation-verification'||s.prop5=='verification-validation'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32 = 'solution-capabilities';
	}
	else if(s.prop5=='embedded-systems'||s.prop5=='control-systems'||s.prop5=='dsp'||s.prop5=='communications-systems'||s.prop5=='image-video-processing'||s.prop5=='fpga-design'||s.prop5=='mechatronics'||s.prop5=='test-measurement'||s.prop5=='computational-biology'||s.prop5=='computational-finance'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32='solution-application';
	}
	else if(s.prop5=='aerospace-defense'||s.prop5=='automotive'||s.prop5=='biotech-pharmaceutical'||s.prop5=='communications'||s.prop5=='electronics-semiconductors'||s.prop5=='energy-production'||s.prop5=='financial-services'||s.prop5=='industry-automation-machinery'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32 = 'solution-industry';
	}
	else if(s.prop5=='industries' && s.prop6 == 'other'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32 = 'solution-industry';
	}
	else if (s.prop5 == 'matlabcentral'){
		s.prop30 = 'unknown';
		s.prop31 = 'unknown';
		s.prop32 = 'matlabcentral';

	}

	else if(s.prop5=='company'){
		if (s.prop7){
			if (s.prop7 == 'company/aboutus/contact_us' || s.prop7== 'company/events/webinars' || s.prop7 == 'company/events/seminars' ){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30 = 'unknown';
					s.prop31 = 'unknown';
				}
				s.prop32= cvSplit[3];
			}
			else if (s.prop6== 'company/events'){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30 = 'unknown';
					s.prop31 = 'unknown';
				}
				s.prop32= cvSplit[2];
			}
			else {
			s.prop30 = 'unknown';
			s.prop31 = 'unknown';
			s.prop32=cvSplit[1];
			}
		}
/*		else if (s.prop6){
			var filename=cfUtility(cvURL,'filename');
			if (filename.indexOf('.')!=-1){
				s.prop30=filename.substring(0,filename.indexOf('.'));
			}
			else {
				s.prop30=cvSplit[2];
			}
			s.prop31=cvSplit[2];
			s.prop32=cvSplit[1];
		}*/
		else {
			s.prop30=s.prop31='unknown';
			s.prop32='company';
		}

	}

	else if (s.prop5=='programs'){
		if (s.prop6 == 'programs/techkits' || s.prop6 == 'programs/trial' || s.prop6 == 'programs/trials'){
			if (!s.prop30){
				if (s.prop38 != 'no value'){
					s.prop30 =  s.prop38;
					s.prop31 =  s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
			}
			s.prop32 = cvSplit[2];
		}
	}


	else if (s.channel=="homepage") {
			s.prop30=s.prop31='unknown';
			s.prop32='homepage';
	}


	else if (s.prop30 && s.prop5=='products') {
		var filename=cfUtility(cvURL,'filename');
		if(filename.search('description') > -1){
			s.prop32="product_info";
		}
		/*
		else if (filename.search('demos') > -1){
			var show = s.getQueryParam('show');
			if (show){
			s.prop32='product_demos_'+show;
			}
			else {
			s.prop32='product_demos';
			}
		}*/
		else if ((filename == 'index.html') || (filename == '')){
			if(s.prop6){
				s.prop32='product_main';
			}
			else {
				s.prop32='product';
			}
		}
		else {
			if (filename.indexOf('.')!=-1){
			//s.prop32='product_'+filename.substring(0,filename.indexOf('.'));
			s.prop32='product_other';
			}
		}
	}
	else if (s.prop5 == 'products'){
		if (cfUtility(cvURL,'filename')=='login_pricing.html'){
			if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
				s.prop32= 'Get Pricing';

		}
	}
	else if (s.prop5 == 'store'){
		if (cfUtility(cvURL,'filename')=='productindexsubmit.do'){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
				s.prop32= 'Store - Get Pricing';
		}
		else if (cfUtility(cvURL,'filename')=='productindexlink.do'){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
				s.prop32= 'Store - Buy Now';
		}

	}

	else if (cvURL.indexOf('blogs.mathworks.')>-1){
		s.prop30=s.prop31='unknown';
		s.prop32='blogs';
	}

	if (!s.prop30){
		s.prop30='unknown';
	}
	if (!s.prop31){
		s.prop31='unknown';
	}

	if (!s.prop32){
		if (s.prop5){
				s.prop32=s.prop5;
		}
		else {
			s.prop32='unknown';
		}
	}

//s.detectRIA('s_ria','eVar56','eVar57','','','1');
s.tnt=s.trackTNT();
}

	/*	Copy product name, product grp and artifact type props into eVars	*/
	if(s.prop30) {s.eVar30=s.prop30;}
	if(s.prop31) {s.eVar31=s.prop31;}
	if(s.prop32) {s.eVar32=s.prop32;}


	//Extra page title prop for WSM reporting
	if (s.prop35) {s.prop55 = s.prop35;}
	//Extra artifact type prop for reporting as eVar32 has been used by videos
	if (s.eVar32) {s.eVar33=s.eVar32;}



 /* Added on 4/15/13 to track internal search widget - CG */
// Application-set search properties
// - prop49: application identifier
// - prop50: search term minus facets
// - prop51: search results page
// - prop52: search facets
(function(search) {
  if (!search) { return; }

  if (search.app)                            { s.prop49 = search.app; }
  if (search.term && search.term !== '')     { s.prop50 = search.term; }
  if (search.page)                           { s.prop51 = search.page; }
  if (search.facets && search.facets !== '') { s.prop52 = search.facets; }
  if (search.typeahead && search.typeahead !== '') { s.prop63 = search.typeahead; }
})(window.SearchTracking);

/*added on 6/14/13 to track use for the doc TOC - CG */

(function(toc) {
  if (!toc) { return; }

  if (toc.open) {
    		s.prop60="TOC open"; //record the property for setting that the toc was open on page load.
  }
  if (toc.clicked) {
    s.prop61=cfUtility(cvURL,'pagename'); // record that the current page resulted as a click on the TOC.
    s.prop62=cfUtility(refURL,'channel')+cfUtility(refURL,'filename');  // records the previous (referrer) page the user was on.
 }


})(window.TocTracking);


/************************** PLUGINS SECTION - START *************************/
s.doPlugins=s_doPlugins;


/*
 * Get Full Referring Domains 100113 CG: Added to capture the referring sub-domain
 */
s.getFullReferringDomains=new Function(""
+"var s=this,dr=window.document.referrer,n=s.linkInternalFilters.spli"
+"t(',');if(dr){var r=dr.split('/')[2],l=n.length;for(i=0;i<=l;i++){i"
+"f(r.indexOf(n[i])!=-1){r='';i=l+1;}}return r}");


/*
 * Plugin: getQueryParam 2.3
 */
// s.getQueryParam=new Function("p","d","u",""
// +"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
// +"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
// +".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
// +"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
// +"=p.length?i:i+1)}return v");
// s.p_gpv=new Function("k","u",""
// +"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
// +"=s.pt(q,'&','p_gvf',k)}return v");
// s.p_gvf=new Function("t","k",""
// +"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
// +"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
// +"epa(v)}return ''");

/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.n=navigator;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");

/*
plugin:  getQueryParam 2.4
*/

s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v"); s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");



/*
 * s.join: 1.0 - Joins an array into a string
 */

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");


/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");

s.getDaysSinceLastVisit=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
+"60*60*1000;e.setTime(ct+3*365*day);cval=s.c_r(c);if(!cval){s.c_w(c,"
+"ct,e);return 'First page view or cookies not supported';}else{var d"
+"=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);return 'More t"
+"han 30 days';}if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);return 'More "
+"than 7 days';}if(d<7*day+1 && d>day){s.c_w(c,ct,e);return 'Less tha"
+"n 7 days';}if(d<day+1){s.c_w(c,ct,e);return 'Less than 1 day';}}els"
+"e return '';}");

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin Utility: apl v1.1

s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");*/

/*
 * Plugin Utility: Append to List v1.2
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=l.split(d),al=a.length;fo"
+"r(i=0;i<al;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowe"
+"rCase()));}}if(!m)l=l?l+d+v:v;return l;");

/*
 * Plugin: getTimeToComplete 0.4 - return the time from start to stop
 */
s.getTimeToComplete=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
s.getTimeToComplete2=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr2){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr2=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
s.getTimeToComplete3=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr3){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr3=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
s.getTimeToComplete4=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr4){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr4=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");

/*
 *	Plug-in: crossVisitParticipation v1.6 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!='')arry=eval(c);var e=new Date();e.setFullYear(e.getFullY"
+"ear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[ar"
+"ry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new"
+" Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var "
+"td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.roun"
+"d((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arr"
+"y[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{deli"
+"m:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join"
+"(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * channelManager v2.4 - Tracking External Traffic
 */
s.channelManager = new Function("a", "b", "c", "d", "e", "f", "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r(e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.indexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s.repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length;G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1){N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';else P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campaign=u;s._keywords=M;s._channel=P;");

/* Top 130 Search Engines (used by Channel Manager) */
s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com "
+"Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>da"
+"um.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_"
+"q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as"
+"_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com."
+"bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh"
+">google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bo"
+"livia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,"
+"as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q"
+",as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,a"
+"s_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co"
+".cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>go"
+"ogle.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - De"
+"nmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.e"
+"c|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>googl"
+"e.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Esto"
+"nia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - Fra"
+"nce>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Gre"
+"ece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google"
+" - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_"
+"q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|"
+"q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google."
+"is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>googl"
+"e.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>go"
+"ogle.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>g"
+"oogle.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Kore"
+"a>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithua"
+"nia>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Goo"
+"gle - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_"
+"q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,"
+"as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>"
+"google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google"
+" - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Go"
+"ogle - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.p"
+"e|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>go"
+"ogle.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>g"
+"oogle.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Googl"
+"e - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google"
+" - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.co"
+"m.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Sin"
+"gapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google -"
+" Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_"
+"q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as"
+"_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com"
+".tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>go"
+"ogle.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trini"
+"dad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q"
+",as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirat"
+"es>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q"
+"|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com"
+".vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Is"
+"lands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor"
+"|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|quer"
+"y,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sez"
+"nam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs"
+"|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.searc"
+"h.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p"
+"|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Can"
+"ada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com"
+",de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yaho"
+"o.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo"
+"! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yah"
+"oo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search."
+"yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yaho"
+"o! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singap"
+"ore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yah"
+"oo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)"
+">tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk"
+".search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>s"
+"earch.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink"
+" Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRu"
+"nner Search>optimum.net|q|Optimum Search";

s.getGoogleRank=new Function("ce,ie,ev1,ev2,dn",""
+"var s=this,dr,rd,p,pa,kr,kw,dn=dn||'';qp='resnum,cd';dr=s.referrer|"
+"|typeof s.referrer!='undefined'?s.referrer:document.referrer;if(!dr"
+"||!ce||!ie)return;rd=s.split(dr,'/');if(rd[2].substring(0,11)!='www"
+".google.')return;kw=s.getQueryParam('q,as_q',' ',dr);if(!kw)return;"
+"if(ev1)s[ev1]=kw;kr=rd[3].substring(0,4)=='url?'?s.getQueryParam(qp"
+",'|',dr):'';if(kr.indexOf('|')>-1)kr=kr.substring(0,kr.indexOf('|')"
+");if(!kr||kr=='0'){if(ev2)s[ev2]='no rank available';return;}if(ev2"
+")s[ev2]=kr;p=s.products;pa=s.split(p,',');pa[0]=s.split(pa[0],';');"
+"pa[0][0]=pa[0][0]||'';pa[0][1]=pa[0][1]||dn;pa[0][2]=pa[0][2]||'';p"
+"a[0][3]=pa[0][3]||'';pa[0][4]=s.apl(pa[0][4],ie+'='+kr,'|',2);pa[0]"
+"=s.join(pa[0],{delim:';'});pa=s.join(pa,{delim:','});s.events=s.apl"
+"(s.events,ce,',',2);s.events=s.apl(s.events,ie,',',2);s.products=pa"
+";return;");

if(!s.__ccucr)
{
    s.c_rr = s.c_r;
    s.__ccucr = true;
    function c_r(k)
    {
        var s = this, d = new Date, v = s.c_rr(k), c = s.c_rspers(), i, m, e;
        if(v) return v; k = s.escape ? s.escape(k) : encodeURIComponent(k);
        i = c.indexOf(' ' + k + '='); c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i);
        e = i < 0 ? i : c.indexOf(';', i); m = m > 0 ? m : e;
        v = i < 0 ? '' : s.unescape ? s.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        return v;
    }
    function c_rspers()
    {
        var s = this, cv = s.c_rr("s_pers"), date = new Date().getTime(), expd = null, cvarr = [], vcv = "";
        if(!cv) return vcv; cvarr = cv.split(";"); for(var i = 0, l = cvarr.length; i < l; i++)    { expd = cvarr[i].match(/\|([0-9]+)$/);
        if(expd && parseInt(expd[1]) >= date) { vcv += cvarr[i] + ";"; } } return vcv;
    }
    s.c_rspers = c_rspers;
    s.c_r = s.cookieRead = c_r;
}
if(!s.__ccucw)
{
    s.c_wr = s.c_w;
    s.__ccucw = true;
    function c_w(k, v, e)
    {
        var s = this, d = new Date, ht = 0, pn = 's_pers', sn = 's_sess', pc = 0, sc = 0, pv, sv, c, i, t, f;
        d.setTime(d.getTime() - 60000); if(s.c_rr(k)) s.c_wr(k, '', d); k = s.escape ? s.escape(k) : encodeURIComponent(k);
        pv = s.c_rspers(); i = pv.indexOf(' ' + k + '='); if(i > -1) { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; }
        sv = s.c_rr(sn); i = sv.indexOf(' ' + k + '='); if(i > -1) { sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
        sc = 1; } d = new Date; if(e) { if(e == 1) e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
        if(e.getTime() > d.getTime()) {  pv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + '|' + e.getTime() + ';';
        pc = 1; } } else { sv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + ';';
        sc = 1; } sv = sv.replace(/%00/g, ''); pv = pv.replace(/%00/g, ''); if(sc) s.c_wr(sn, sv, 0);
        if(pc) { t = pv; while(t && t.indexOf(';') != -1) { var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
        t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht; } d.setTime(ht); s.c_wr(pn, pv, d); }
        return v == s.c_r(s.unescape ? s.unescape(k) : decodeURIComponent(k));
    }
    s.c_w = s.cookieWrite = c_w;
}

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");


/*
 * Plugin: detectRIA v0.1 - detect and set Flash, Silverlight versions
 */
s.detectRIA=new Function("cn", "fp", "sp", "mfv", "msv", "sf", ""
+"cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-"
+"1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc',"
+"'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin"
+"g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u"
+"k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)"
+"{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['"
+"Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16"
+",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len"
+"gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript"
+"ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)"
+"{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}"
+"if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec"
+"Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri"
+"pt('on error resume next: result = IsObject(CreateObject(\"Shockwav"
+"eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'flas"
+"h not detected':fv==0?'flash enabled (no version)':'flash '+fv;}if("
+"!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'"
+"+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'"
+"+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'"
+"+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'"
+"+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('"
+"+'e){}}';eval(tc);sr=sv==''?'silverlight not detected':'silverlight"
+" '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;"
+"if(sr)s[sp]=sr;}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/* Test&Target Plugin Start - TNT integration Plugin v1.0*/




/************************** PLUGINS SECTION - END *************************/

/* Module: Media */
/*s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.co=0;i.cot=0;i.lm=0;i.lom=0;m.l[n]=i}};m._delete=function(n){var"
+" m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new Object;"
+"i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.complete=function(n,o){th"
+"is.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=vo.linkTrackEvents,pe='m_i',pev3,c=vo.context"
+"Data,x;c['a.contentType']='video';c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0){c[ns+'length']=i.l;}c[ns+'timePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns"
+"+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView']=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i"
+".lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3='video';vo.pe=pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x i"
+"n d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='string'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]="
+"c[x]}else if(y){if(y=='view'||y=='segmentView'||y=='complete'||y=='timePlayed'){if(e)e+=','+a;if(c[x]){if(y=='timePlayed'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events"
+"2+=(vo.events2?',':'')+a}}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,"
+"x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.events2?',':'')+d[x+'s'][c[x]]}}}vo.contextData=0}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){v"
+"ar m=this,pe='m_o',pev3,d='--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.fl"
+"oor(i.to):'')+i.e+(x!=0&&x!=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvent"
+"s,ti=m.trackSeconds,tp=m.trackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;n=m.cn(n);i=n&&m.l&&"
+"m.l[n]?m.l[n]:0;if(i){if(o<0){if(i.lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name"
+"=n;w.length=i.l;w.openTime=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP"
+"':(x==3?'MONITOR':(x==4?'TRACK':(x==5?'COMPLETE':('CLOSE'))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i"
+".lo=o;if((x<=3||x==5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i"
+".l)*100<c&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z"
+".length;w.mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat('"
+"'+z[j]):0;if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if("
+"c||z[j]=='E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-"
+"i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||i.x>"
+"=100){x=0;m.e(n,2,-1,0,0,-1,pd);v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m.completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}e"
+"k=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePl"
+"ayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new Object;vo.contextData=new Object;vo.linkTrackVars=v;vo"
+".linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i);else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx="
+"sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthReq"
+"uired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,x"
+"c=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s"
+"_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.curre"
+"ntMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o'"
+",'var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-"
+"1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}"
+"';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateC"
+"hange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()"
+"?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+"
+"';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l"
+",\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '"
+"+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if"
+"(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'"
+"+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)"
+"\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTag"
+"Name(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,fal"
+"se);if(m.onLoad)m.onLoad(s,m)";
s.m_i("Media");*/

function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.5
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function AppMeasurement(){var a=this;a.version="1.5";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.zb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.ob=function(a){try{console.log(a)}catch(b){}};a.za=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.fb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.fb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.G=[];a.ba=function(c,b,d){if(a.ta)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.G.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.na();0<a.G.length;){d=a.G.shift();if(b&&!d.t&&d.t>c){a.G.unshift(d);setTimeout(a.delayReady,
parseInt(a.maxDelay/2));break}a.ta=1;a[d.m].apply(a,d.a);a.ta=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.K,(m=a.lightTrackVars)&&(m=","+m+","+a.ga.join(",")+",");else{d=a.c;if(a.pe||a.linkType)m=a.linkTrackVars,
f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].yb,f=a[e].xb));m&&(m=","+m+","+a.A.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.B=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.B(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.za(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.hb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.K,(n=a.lightTrackVars)&&(n=","+n+","+a.ga.join(",")+",");else{b=a.c;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].yb,r=a[e].xb));n&&(n=","+n+","+a.A.join(",")+",");r&&(r=","+r+",",
n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.B("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.B("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&
"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.B("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.B("mts",a[e],n,e));g="";break;default:a.za(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.u=function(a){var b=a.tagName;if("undefined"!=""+a.Cb||"undefined"!=""+a.sb&&"HTML"!=(""+a.sb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.va=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.H=function(c){var b=a.u(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.va(c),e)?{id:e.substring(0,100),type:g}:0};a.Ab=function(c){for(var b=a.u(c),d=a.H(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.u(c),d=a.H(c);
d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.rb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.u(d);for(b=a.H(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.u(d),b=a.H(d);b&&"BODY"!=c||(d=0);if(d){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.va(d));e&&!a.linkLeaveQueryString&&
(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.ya(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?
(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,
100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.ib=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),b[p]=f;f=a.account.split(",");if(c||a.e){c&&
!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(m=0;m<f.length;m++)for(e&&(k=b[p].join(","),k==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),g=0;g<b[p].length;g++)k=b[p][g],k==f[m]&&(e&&(a.e+="&u="+a.escape(k)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(g,1),d=1);c||(d=1);if(d){e="";m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};
a.jb=function(){if(!a.wb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?
a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Bb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.wb=1}};a.L={};a.loadModule=function(c,b){var d=a.L[c];if(!d){d=k["AppMeasurement_Module_"+
c]?new k["AppMeasurement_Module_"+c](a):{};a.L[c]=a[c]=d;d.Na=function(){return d.Ra};d.Sa=function(b){if(d.Ra=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Na,set:d.Sa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.L)if(!Object.prototype[b]&&(d=a.L[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.mb=function(){var c=
Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.M=function(c,b){var d,f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Ga=function(c,b){var d,
f,e,g;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.cb=function(a){var b,d,f,e,g,m=0,k,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?m=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(m=",p,ei,"),
m&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=m.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?k=n+"&"+q:q=""}d=253-(k.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.Ma=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;
b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.Y=!1;a.D=!1;a.Ta=function(){a.D=!0;a.i()};a.W=!1;a.Q=!1;a.Qa=function(c){a.marketingCloudVisitorID=c;a.Q=!0;a.i()};a.T=!1;a.N=!1;a.Ia=function(c){a.analyticsVisitorID=c;a.N=!0;a.i()};a.V=!1;a.P=!1;a.Ka=function(c){a.audienceManagerLocationHint=c;a.P=!0;a.i()};a.U=!1;a.O=!1;a.Ja=function(c){a.audienceManagerBlob=c;a.O=!0;a.i()};a.La=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),
!1):!0};a.X=!1;a.C=!1;a.na=function(){a.C=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.Y||a.D||(a.Ma(a.Ta)?a.D=!0:a.Y=!0);if(a.Y&&!a.D)return!1;b&&b.isAllowed()&&(a.W||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.W=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Qa]),a.marketingCloudVisitorID&&(a.Q=!0)),a.T||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.T=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ia]),a.analyticsVisitorID&&(a.N=!0)),a.V||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.V=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ka]),a.audienceManagerLocationHint&&(a.P=!0)),a.U||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.U=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ja]),a.audienceManagerBlob&&(a.O=!0)),a.W&&!a.Q&&!a.marketingCloudVisitorID||a.T&&!a.N&&!a.analyticsVisitorID||a.V&&!a.P&&!a.audienceManagerLocationHint||a.U&&!a.O&&!a.audienceManagerBlob)&&(c=!1);a.X||
a.C||(a.La(a.na)?a.C=!0:a.X=!0);a.X&&!a.C&&(c=!1);return c};a.k=q;a.o=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Xa=c;f.Wa=b;f.Ua=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.o&&(a.o=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.o&&(clearInterval(a.o),a.o=0),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),c.Wa.apply(c.Xa,c.Ua)};a.Oa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Ga(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,
a.track,b);return!0}return!1};a.gb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+
"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.eb&&(a.authState=a.visitor.eb()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Oa(c)||(b&&a.M(b),c&&(d={},a.Ga(d,0),a.M(c)),a.mb()&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.gb()),a.rb(),a.usePlugins&&a.doPlugins&&
a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ha||(a.referrer=r.document.referrer),a.Ha=1,a.referrer=a.cb(a.referrer),a.l("_g")),a.ib()&&!a.abort&&(a.jb(),g+=a.hb(),a.qb(e,g),a.l("_t"),a.referrer=""))),c&&a.M(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=
a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.q=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.c.length;c++)if(b=a.c[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==
b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.qb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&
a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.vb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.ab(d);a.da()};a.ab=function(c){a.g||a.kb();a.g.push(c);a.fa=a.r();a.Fa()};a.kb=function(){a.g=a.nb();a.g||(a.g=[])};a.nb=function(){var c,b;if(a.ka()){try{(b=k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};
a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.wa=function(){var c=0;a.g&&(c=a.g.length);a.v&&c++;return c};a.da=function(){if(!a.v)if(a.xa=q,a.ja)a.fa>a.J&&a.Da(a.g),a.ma(500);else{var c=a.Va();if(0<c)a.ma(c);else if(c=a.ua())a.v=1,a.pb(c),a.tb(c)}};a.ma=function(c){a.xa||(c||(c=0),a.xa=setTimeout(a.da,c))};a.Va=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.r()-a.Ca;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.ua=function(){if(0<a.g.length)return a.g.shift()};a.pb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.ob(b)}};a.Pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.S=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.S=!0,a.R=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.R=function(a){return k.$.parseJSON(a)},a.S=!0):a.R=function(){return null};a.tb=function(c){var b,
d,f;a.Pa()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.S?b.pa=!0:b=0));!b&&a.lb&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",
b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="");b.ra=function(){try{a.la&&(clearTimeout(a.la),a.la=0),b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(c){}};b.onload=b.ub=function(){b.ra();a.$a();a.Z();a.v=0;a.da();if(b.pa){b.pa=!1;try{var c=a.R(b.responseText);AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.bb=function(){b.ra();(a.trackOffline||a.ja)&&a.v&&a.g.unshift(a.Za);a.v=0;a.fa>a.J&&a.Da(a.g);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&
(200==b.status?b.ub():b.bb())};a.Ca=a.r();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Aa)try{f.removeChild(a.Aa)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Aa=a.Ya}b.abort&&(a.la=setTimeout(b.abort,5E3));a.Za=c;a.Ya=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.F||a.q)a.forcedLinkTrackingTimeout||
(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.$a=function(){if(a.ka()&&!(a.Ba>a.J))try{k.localStorage.removeItem(a.ia()),a.Ba=a.r()}catch(c){}};a.Da=function(c){if(a.ka()){a.Fa();try{k.localStorage.setItem(a.ia(),k.JSON.stringify(c)),a.J=a.r()}catch(b){}}};a.Fa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.ua()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=
function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.r=function(){return(new Date).getTime()};a.ya=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.vb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.M(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],
f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&
b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.K=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.K.push("prop"+n)),a.c.push("eVar"+n),a.K.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
a.Ca=0;a.fa=0;a.J=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.lb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.F&&a.j.dispatchEvent(a.F);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.F=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.I&&a.I==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.I=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.I==m&&(a.I=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.F=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();

var a = [ '', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ' ];
var b = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

Array.prototype.add = function(key) {
    var sum = 0, i;
    if(key === undefined) {
        for(i=0; i<this.length; i++) {
            sum += parseFloat(this[i]);
        }
    } else {
        for(i=0; i<this.length; i++) {
            sum += parseFloat(this[i][key]);
        }
    }
    return sum;
};

Array.prototype.addNonBlanks = function(key) {
    var sum= 0;
    var i = this.length;
    if(key) {
        while (i--) {
            if(parseFloat(this[i][key]))
                sum += parseFloat(this[i][key]);
        }
    } else {
        while (i--) {
            if(parseFloat(this[i]))
                sum += parseFloat(this[i]);
        }
    }
    return sum;
};

Array.prototype.search = function(key, value) {
    for(var i=0; i<this.length; i++) {
        if(this[i][key] == value) {
            return this[i];
        }
    }
};
Array.prototype.getObjByKeyVal = function(key, val) {
	var i = this.length;
	while (i--) {
		if(this[i][key] == val)
			return this[i];
	}
};
Array.prototype.getIndexByKeyVal = function(key, val) {
	var i = this.length;
	while (i--) {
		if(this[i][key] == val)
			return i;
	}
};
String.prototype.toTextString = function(number) {
    return number.parseInt(number).toTextString();
};

Number.prototype.toTextString = function() {
    var num = Math.round(this.valueOf());
    n = ('000000000' + num).substr(-9).match(
        /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n)
        return;
    else if(num == 0) {
        return "zero rupees only";
    }
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str + ' rupees only';
};

String.prototype.leadingZeros = function(length) {
    return parseInt(this).leadingZeros(length);
};
Number.prototype.leadingZeros = function(length) {
    var zero = length - this.valueOf().toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + this.valueOf();
};

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

function dateToStr(date){
	if(date) {
		return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	} else {
		return '';
	}
}

function removeTime(date){
	if(!date) {
		date = new Date();
	}
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}

function getDateFromAge(age) {
	var today = new Date();
	var todayinMilliSecs = today.getTime();
	var ageinMilliSecs = age*365*24*60*60*1000;
	var dobinMilliSecs = todayinMilliSecs - ageinMilliSecs;
	return new Date(dobinMilliSecs);
}
function getAgeFromDob(dob) {
	var dobYear = dob.getFullYear();
	var today = new Date();
	var currentYear = today.getFullYear();
	return currentYear-dobYear;
}

function toURLParams(obj, nullAllowed) {
	var params = '';
	Object.keys(obj).forEach(function(k) {
		if (nullAllowed || (!nullAllowed && obj[k] !== null && obj[k] !== undefined)) {
			params += (encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]) + '&');
		}
	});
	return params.substr(0, params.length-1);
}


var REFERER_LIST = ["Krishna Reddy","Narayana Reddy"];
var DISPENCER_LIST = ["Priyanka","Bhavani"];
var TAX_PERCENTS = [{key: "0 %", val: "0"},
	{key: "5 %", val: "5"},
	{key: "12 %",val: "12"},
	{key: "18 %",val: "18"},
	{key: "28 %",val: "28"}];

var PURCHASE_PAYMENT_TYPES = [{id: 1, value: "Cash"},
	{id: 2, value: "Credit"},
	{id: 3, value: "Partial Credit"},
	{id: 4, value: "Free"}];

var SALES_PAYMENT_TYPES = [
	{id: 1, value: "Cash"},
	{id: 2, value: "Credit"},
	{id: 3, value: "Partial Credit"}];
var OP_COST_CONFIG = {
		"costs":{
	        "1": { //GENERAL
	            "1": {"cost": 50, "validity": 15},
	            "2": {"cost": 100, "validity": 15},
	            "3": {"cost": 0, "validity": 15},
	            "4": {"cost": 75, "validity": 15},
	            "5": {"cost": 0, "validity": 15},
	            "6": {"cost": 0, "validity": 15}
	        },
	        "2": { //EMERGENCY
				"1": {"cost": 100, "validity": 5},
	            "2": {"cost": 100, "validity": 5},
	            "3": {"cost": 0, "validity": 5},
	            "4": {"cost": 100, "validity": 5},
	            "5": {"cost": 0, "validity": 5},
	            "6": {"cost": 0, "validity": 5}
	        }
	    },
		"free": [4, 5, 6]
	};
var GENDERS = ["Male","Female"];
var RELATIONS = ["S/o","D/o","W/o","C/o"];

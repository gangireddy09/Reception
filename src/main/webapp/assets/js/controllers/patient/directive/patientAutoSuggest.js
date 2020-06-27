angular.module("receptionModule").directive("patientAutoSuggest",function(){
	return{
		restrict : 'E',
		scope : {
			options : '=',
			outputModel : '=',
			onSelect : '&'
		},
		templateUrl : "./views/patient/patientAutoSuggest.html",
	    controller : controller,
	    link : function(scope, ele, attr) {
			scope.ele = $(ele);
		},
	};
	function controller($scope,patientAutoSuggestService,$timeout){
		$scope.init = init;
		$scope.changeSuggestInput = changeSuggestInput;
		$scope.selectItem = selectItem;
		$scope.closeList = closeList;
		$scope.inputKeyDown = keyboardHandler;
		function init(){
			if(!$scope.options){
				$scope.options = {};
			}
			$scope.suggestModel = '';
			$scope.suggestList = [];
		}
		$scope.clearInput = function() {
			$scope.suggestModel = '';
			$scope.outputModel ='';
			$scope.clearable = false;
			if(typeof $scope.options.onClear === 'function') {
				$scope.options.onClear();
			}
		};
		function changeSuggestInput(searchInput){
			if(searchInput ==''){
				$scope.suggestList = [];
				$scope.clearable = false;
			}else{
				patientAutoSuggestService.searchPatients(searchInput,15).then(function(res){
					$scope.suggestList = res;
					$scope.clearable = true;
				});
			}
		    
		}
		function selectItem(patient){
			$scope.outputModel = patient;
			$scope.suggestModel = patient.name;
			if(typeof $scope.onSelect === 'function'){
				$scope.onSelect({selected : patient});
			}
			$scope.suggestList = [];
		}
		
		function closeList(immediageClose) {
			if (immediageClose) {
				$scope.suggestList = [];
			} else {
				$timeout(function() {
					if (!$($scope.ele).find('input.form-field').is(":focus")) {
						$scope.suggestList = [];
					}
				}, 500);
			}
		}
		function keyboardHandler(evt) {
			if (evt.keyCode === 40) {// KeyDown
				if(!$scope.suggestList.length){
					$scope.changeSuggestInput($scope.suggestModel);
			    }
				if ($($scope.ele).find(".auto-suggest-list li").hasClass('focused')) {
					$($scope.ele).find(".auto-suggest-list li.focused").removeClass('focused').next().addClass('focused').focus();
				} else {
					$($scope.ele).find(".auto-suggest-list li:first-child").addClass('focused').focus();
				}
				$(evt.currentTarget).focus();
				evt.preventDefault();
			} else if (evt.keyCode == 38) {// Key Up
				if(!$scope.suggestList.length){
					$scope.changeSuggestInput($scope.suggestModel);
			    }
				if ($($scope.ele).find(".auto-suggest-list li").hasClass('focused')) {
					$($scope.ele).find(".auto-suggest-list li.focused").removeClass('focused').prev().addClass('focused').focus();
				} else {
					$($scope.ele).find(".auto-suggest-list li:last-child").addClass('focused').focus();
				}
				$(evt.currentTarget).focus();
				evt.preventDefault();
			} else if (evt.keyCode === 27) {
				$scope.closeList();
			} else if (evt.keyCode === 13) {
				$scope.outputModel = undefined;
				var selectedIndex = ($($scope.ele).find(".auto-suggest-list li").index($($scope.ele).find(".auto-suggest-list li.focused")));
				if (selectedIndex !== -1) {
					$scope.selectItem($scope.suggestList[selectedIndex]);
				}
				evt.preventDefault();
			}
		}
		init();
	}
}).service("patientAutoSuggestService",['$http','$q',function($http,$q){
	
	this.searchPatients = searchPatients;
	this.getCurrentData = getCurrentData;
	this.currentSearchData = [];
	
	function searchPatients(searchInput,count){
		var defer = $q.defer();
		this.currentSearchData = [];
		$http.get("./patient/listbyoptions?name="+searchInput).success(function(res){
			this.currentSearchData = res.response;
			defer.resolve(getCurrentData(count));
		});
		return defer.promise;
	}
	function getCurrentData(count) {
		return self.currentSearchData.splice(0, count);
	}
}]);
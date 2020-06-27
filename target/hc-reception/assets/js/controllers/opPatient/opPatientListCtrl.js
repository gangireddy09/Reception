angular.module("receptionModule").controller("opPatientListCtrl",['$scope','$stateParams','opPatientService','opService','commonService','labPatientService','$log','$parse',
                                                                  function($scope,$stateParams,opPatientService,opService,commonService,labPatientService,$log,$parse){
	$scope.getOpPatientListByOpId = getOpPatientListByOpId;
	$scope.getOpTypes = getOpTypes;
	$scope.getOpPatientViewByOpId = getOpPatientViewByOpId;
	$scope.searchOpPatient = searchOpPatient;
	$scope.print = print;
	$scope.sort = sort;
	$scope.opTypes = [];
	var tempList = [];
	$scope.defaultStatusSort = true;
	var enableDateSort = true;
	var enableStatusSort = true;
	var opPatient = {
			op:{
				id :{
				}
			},
			patient:{
				id : null,
				name : null,
				village : null,
				mobileNo : null
			},
			opType:{
				opType : null
			},
			status : null
	} ;
	$scope.searchObj = angular.copy(opPatient);
	function init(){
		$scope.formLoader = false;
		$scope.opId = $stateParams.opId;
		opPatient.op.id = $scope.opId;
		getOpPatientListByOpId(opPatient);
		getLabtests($scope.opId);
		getOpPatientViewByOpId($scope.opId);
		$scope.opPatientList = [];
		getOpTypes();
	}
	
	function getOpPatientListByOpId(opPatient){
		$scope.formLoader = true;
		$scope.generalOpList = [];
		$scope.emergencyOpList = [];
		$scope.phoneCallOpList = [];
		$scope.freeOpList = [];
		$scope.reviewOpList = [];
		opPatientService.getOpPatientsListByOptions(opPatient).then(function(res){
			$scope.opPatientList = res;
			for(var i = 0;i<$scope.opPatientList.length;i++){
				if($scope.opPatientList[i].opType.id =='1' && !$scope.opPatientList[i].isReviewOp){
					if(!$scope.opPatientList[i].opSubType ){
						$scope.generalOpList.push($scope.opPatientList[i]);
					}else if($scope.opPatientList[i].opSubType && ($scope.opPatientList[i].opSubType.id !='3' && $scope.opPatientList[i].opSubType.id !='7')  && $scope.opPatientList[i].opSubType.id !='4'){
						$scope.generalOpList.push($scope.opPatientList[i]);
					}
				}
				if($scope.opPatientList[i].opType.id =='2'){
					$scope.emergencyOpList.push($scope.opPatientList[i]);
				}
				if($scope.opPatientList[i].opType.id =='1' && $scope.opPatientList[i].opSubType && $scope.opPatientList[i].opSubType.id =='4' && !$scope.opPatientList[i].isReviewOp){
					$scope.phoneCallOpList.push($scope.opPatientList[i]);
				}
				if($scope.opPatientList[i].opType.id =='1' && $scope.opPatientList[i].opSubType && ($scope.opPatientList[i].opSubType.id =='3' || $scope.opPatientList[i].opSubType.id =='7') && !$scope.opPatientList[i].isReviewOp){
					$scope.freeOpList.push($scope.opPatientList[i]);
				}
				if($scope.opPatientList[i].opType.id =='1' && $scope.opPatientList[i].isReviewOp){
					$scope.reviewOpList.push($scope.opPatientList[i]);
				}
			}

			$scope.formLoader = false;
		});
	}
	
	function getOpTypes(){
		commonService.getOpTypes().then(function(res){
			res.splice(0,0,{opType:"Select All"});
			$scope.opTypes = res;
			$scope.searchObj.opType = $scope.opTypes[0];
		});
	}
	
	function getOpPatientViewByOpId(opId){
		opService.get(opId).then(function(res){
			$scope.opView = res;
		});
	}
	
	function searchOpPatient(){
		getOpPatientViewByOpId($scope.opId);
		$scope.searchObj.op.id = $scope.opId;
		getOpPatientListByOpId($scope.searchObj);
	}
	
	init();
	//sort both date and status
	function sort(defaultStatusSort){
		$scope.defaultStatusSort = defaultStatusSort;
		if($scope.defaultStatusSort === true){
			var list = $scope.opPatientList;
			if(enableStatusSort === true){
				for(var i = 0; i < list.length; i++){
					for(var j = i + 1; j < list.length; j++){
						if(list[j].status.toLowerCase() === 'new'){
							var temp = list[i];
							list[i] = list[j];
							list[j] = temp;
						}
					}
				}
				$scope.opPatientList = list;
				enableStatusSort = false;
			}else{
				for(var i = 0; i < list.length; i++){
					for(var j = i + 1; j < list.length; j++){
						if(list[j].status.toLowerCase() === 'consulted'){
							var temp = list[i];
							list[i] = list[j];
							list[j] = temp;
						}
					}
				}
				$scope.opPatientList = list;
				enableStatusSort = true;
			}
			$scope.defaultStatusSort = false;
		}else{
			var list = $scope.opPatientList;
			if(enableDateSort === true){
				list.sort(function(a,b){
					var c = new Date(a.createdOn);
					var d = new Date(b.createdOn);
					return c - d;
				});
				$scope.opPatientList = list;
				enableDateSort = false;
			}else{
				list.sort(function(a,b){
					var c = new Date(a.createdOn);
					var d = new Date(b.createdOn);
					return d - c;
				});
				$scope.opPatientList = list;
				enableDateSort = true;
			}
			$scope.defaultStatusSort = true;
		}
	}
	
	function getLabtests(opId){
		$scope.labTestsInprogressList = [];
		$scope.labTestsCompletedList = []; 
		labPatientService.search({opId:opId}).then(function(res){
			if(res.length){
				$scope.data = res.map(function(labPatientReport){
					var labReport = JSON.parse($parse('labReport')(labPatientReport));
					labReport['opLabPatient'] = labPatientReport.opLabPatient;
					labReport['id'] = labPatientReport.id;
					labReport['isLabClosed'] = labPatientReport.isLabClosed;
					labReport['isReportEdit'] = labPatientReport.isReportEdit;
					labReport['reportedOn'] = labPatientReport.reportedOn;
					labReport['testedBy'] = labPatientReport.testedBy;
					if(labReport.labs){
						var prescCount = 0, paidCount = 0;
						for(var i = 0; i < labReport.labs.length; i++){
							if(labReport.labs[i].tests){
								for(var j = 0; j < labReport.labs[i].tests.length; j++){
									if(labReport.labs[i].tests[j].isFeePaid){
										labReport['paidTests'] = ++paidCount;
									}
									labReport['prescribedTests'] = ++prescCount;
								}
							}
						}
					}
					if(labReport.reportedOn && $parse('opLabPatient.opPatient')(labReport) && $parse('opLabPatient.opPatient.status')(labReport) == 'Consulted' ){
						$scope.labTestsCompletedList.push(labReport.opLabPatient);
					}else if(!labReport.reportedOn && $parse('opLabPatient.opPatient')(labReport) && $parse('opLabPatient.opPatient.status')(labReport)){
						$scope.labTestsInprogressList.push(labReport.opLabPatient);
					}
					return labReport;
				});
				$scope.formLoader = false;
			}else{
				$scope.formLoader = false;
			}
		}, function(e){
			console.log('Error: ', e);
			$scope.formLoader = false;
		});
	}
	
	function print(printPage,printObj){
		$scope.printPage = printPage;
		$scope.printOpPatient = printObj;
		window.setTimeout(function() {
			window.print();
		}, 40);
	};
}]);
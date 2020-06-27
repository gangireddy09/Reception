angular.module("receptionModule").controller("opPatientFormCtrl",['$scope','$stateParams','$state', function($scope,$stateParams, $state){
	
	$scope.saveOpPatient = saveOpPatient;
	function init(){
		$scope.opId = $stateParams.opId;
	}
	function saveOpPatient(opId){
		$state.go('opPatientSearch',{opId: $scope.op.id});
	}
	init();
}]);

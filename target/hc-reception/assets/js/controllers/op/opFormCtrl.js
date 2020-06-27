angular.module("receptionModule").controller("opFormCtrl", ['$scope', 'opService', 'ngDialog', function($scope, opService, ngDialog) {
	$scope.createOp = createOp;
	$scope.setIsFutureDate = setIsFutureDate;
	$scope.opTypes = [ "Morning OP", "Afternoon OP", "Evening OP" ];
	$scope.op = {};
	$scope.errorMsg = false;
	$scope.opAddForm = {};
	function createOp() {
		opService.search($scope.op).then(function(res) {
			if(!res.length){
				opService.create($scope.op).then(function(res) {
					ngDialog.close();
					$scope.getOpList();
				});
			}else{
				$scope.opAddForm.$setPristine();
				$scope.errorMsg = true;
			}
		});
	}
	function setIsFutureDate() {
		var newDate = new Date();
		if ($scope.op.isFuture) {
			newDate.setDate(newDate.getDate() + 1);
		}
		$scope.op.opDate = removeTime(newDate);
	}

	function init() {
		setIsFutureDate();
		$scope.dateOptions={
				minDate:new Date()
		};
	}
	init();
}]);
angular.module("receptionModule").controller("opListCtrl",['$scope','opService','commonService','ngDialog',function($scope,opService,commonService,ngDialog){
	
    $scope.getOpList = getOpList;
    $scope.openOpForm = openOpForm;
    $scope.getDoctorList = getDoctorList;
    
    function getOpList(){
    	$scope.formLoader = true;
    	opService.statusList(dateToStr($scope.opDate)).then(function(res){
    		if(res.length){
    			$scope.opList = res;
    			$scope.formLoader = false;
    		}else{
    			$scope.opList = [];
    			$scope.formLoader = false;
    		}
    	});
    }
    function getDoctorList(){
    	commonService.getDoctors().then(function(res){
    		$scope.doctorList = res;
    	});
    }
    function openOpForm(){
    	ngDialog.open({
    		template:'./views/op/opForm.html',
    		className: 'ngdialog-theme-default',
    		controller:'opFormCtrl',
    		closeByDocument : false,
    		scope : $scope
    	});
    }
    function init(){
    	$scope.formLoader = false;
		getDoctorList();
		$scope.opDate = new Date();
		 getOpList();
	}
    init();
}]);
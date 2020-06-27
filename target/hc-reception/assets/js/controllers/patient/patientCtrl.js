angular.module("receptionModule").controller("patientCtrl",['$scope','httpService','$http', function($scope,httpService,$http){

	$scope.getPatientVilageList = getPatientVilageList;
	$scope.selectVillage = selectVillage;
	$scope.unSelectVillage = unSelectVillage;
	$scope.updateVillage = updateVillage;
	$scope.villageList = [];
	$scope.selectedVillageList = [];
	$scope.villageName='';
	function init(){
		$scope.formLoader = false;
		getPatientVilageList();
		$scope.opPatientList = [];
	}
	
init();
	
	function getPatientVilageList(){
		$scope.formLoader=true;
		httpService.get("patient/villageList").then(function(res){
			$scope.formLoader=false;
			$scope.villageList = res;
		});
	}
	
	function selectVillage(villageName){
		$scope.selectedVillageList.push(villageName);
		var index = $scope.villageList.indexOf(villageName);
		$scope.villageList.splice(index,1);
	}
	
	function unSelectVillage(villageName){
		$scope.villageList.push(villageName);
		var index = $scope.selectedVillageList.indexOf(villageName);
		$scope.selectedVillageList.splice(index,1);
	}
	
	function updateVillage(){
		$scope.formLoader=true;
		var updatevillageObj ={
				list : $scope.selectedVillageList,
				village : $scope.villageName
		}
			httpService.post("patient/updateVillage" , updatevillageObj).then(function(res){
			$scope.selectedVillageList = [];
			$scope.villageName='';
			getPatientVilageList();
		});
	}
	

}]);
angular.module("receptionModule").controller("loginCtrl",['$scope','loginService','$state','$rootScope', function($scope,loginService,$state, $rootScope){
	
	$scope.submit = submit;
	function init(){
		$scope.invalidLogin = false;
		$scope.loginForm = {};
	}
	
	function submit(){
		loginService.login($scope.user).then(function(res){
			if(res){
				if(res.userRole.roleName.toLowerCase() === "reception"){
					$rootScope.sessionUserName = res.userId;
					$state.go('opList');
				}else{
					$scope.invalidLogin = true;
					$scope.user = {};
					$scope.loginForm.$setPristine();
				}
			}else{
				$scope.invalidLogin = true;
				$scope.user = {};
				$scope.loginForm.$setPristine();
			}
		});
	}
	$scope.$watch("window.history.go(+1)",function(){
		window.history.forward();
		window.history.go(+1);
	});
	/*$scope.$watch("window.onload",function(){
		window.onload = disableBack();
		window.history.go(+1);
	});
	function disableBack() { 
		window.history.forward(); 
		window.onpageshow = function(evt) { if (evt.persisted) disableBack(); };
	}*/
	init();
}]);
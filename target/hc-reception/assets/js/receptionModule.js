var app =angular.module("receptionModule",['ui.router','ngDialog','ui.bootstrap','ngSanitize', 'ngMessages', 'tcLib','hcLib']);
app.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider,$httpProvider){
	$httpProvider.interceptors.push('APIInterceptor');
	$stateProvider.state({
		name:'login',
		url:'/login',
		templateUrl:"views/common/auth/login.html",
		controller : "loginCtrl"
	}).state({
		name:'reception',
		url:'/reception',
		templateUrl:"views/reception.html",
	}).state({
		name:'opList',
		parent:'reception',
		url:'/op',
		templateUrl:"views/op/opList.html",
		controller : "opListCtrl"
	}).state({
		name:'opPatientSearch',
		parent:'reception',
		url:'/op-patient/{opId}',
		params: {
			opId: null
		},
		templateUrl:"views/opPatient/opPatientList.html",
		controller:"opPatientListCtrl"
	}).state({
		name:'addOpPatient',
		parent:'reception',
		url:'/op-patient/add/{opId}',
		params: {
			opId: null
		},
		templateUrl:"views/opPatient/opPatientForm.html",
		controller:"opPatientFormCtrl"
	}).state({
		name:'patientList',
		parent:'reception',
		url:'/patients',
		template:'<patient-search on-select="onSelectPatient(patientObj)" on-save="onPatientAdd(patient)" edit="Edit"></patient-search>'
	}).state({
		name:'addPatient',
		parent:'reception',
		url:'/patients/add',
		params: {
			opId: null
		},
		template:'<patient-form on-submit="patientObj"></patient-form>',
	}).state({
		name:'patientVillageUpdate',
		parent:'reception',
		url:'/patientVillageUpdate',
		templateUrl:'views/patient/villageUpdate.html',
		controller :'patientCtrl'
	});
	$urlRouterProvider.otherwise('/login');
}]).controller('receptionCtrl', ['$scope', function($scope) {
	$scope.menuExpanded = true;
	$scope.toggleMenuExpansion = function() {
		$scope.menuExpanded = !$scope.menuExpanded;
	};
}]);
app.service('APIInterceptor',function(){
	this.request = function(config){
		config.headers.token = 'XYZ';
		return config;
	};
});
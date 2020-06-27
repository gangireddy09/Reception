<!DOCTYPE html>
<html ng-app="receptionModule">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>Reception</title>

		<link rel="shortcut icon" type="text/png" href="<%=request.getContextPath()%>/assets/images/hospital-logo.png"/> 

		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/ngDialog.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/open-sans.css" />

	    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/login.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/hospital.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/theme.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/print.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/components.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/css/responsive.css" />
	</head>
	<body ng-controller="receptionCtrl">
		<ui-view></ui-view>
	</body>
	<!-- Libs -->
	<script type="text/javascript" src="./assets/js/common/util.js"></script>
	<script type="text/javascript" src="./assets/js/lib/webcam.js"></script>

	<script type="text/javaScript" src="./assets/js/lib/angular.min.js"></script>
	<script type="text/javaScript" src="./assets/js/lib/jquery.min.js"></script>
	<script type="text/javaScript" src="./assets/js/lib/angular-messages.min.js"></script>
	<script type="text/javaScript" src="./assets/js/lib/angular-ui-router.min.js"></script>
	<script type="text/javaScript" src="./assets/js/lib/angular-sanitize.min.js"></script>
	<script type="text/javaScript" src="./assets/js/lib/ngDialog.min.js"></script>
	<script type="text/javaScript" src="./assets/js/lib/ui-bootstrap-tpls-2.2.0.min.js"></script>
	<script type="text/javascript" src="./assets/js/lib/webcam-directive.js"></script>
	<script type="text/javascript" src="./assets/js/lib/tc-lib.min.js"></script>
	<script type="text/javascript" src="./assets/js/lib/hc-lib.min.js"></script>

	
		<!-- Module -->
	<script type="text/javascript" src="./assets/js/receptionModule.js"></script>
	
		<!-- Services -->
	
		<!-- Directives -->
	<!-- <script type="text/javascript" src="./assets/js/controllers/patient/directive/patientSearch.js"></script> -->
	<script type="text/javascript" src="./assets/js/controllers/patient/directive/patientAutoSuggest.js"></script>
	
		<!-- Controllers -->
	<script type="text/javascript" src="./assets/js/controllers/loginCtrl.js"></script>
	<script type="text/javascript" src="./assets/js/controllers/opPatient/opPatientFormCtrl.js"></script>
	<script type="text/javascript" src="./assets/js/controllers/opPatient/opPatientListCtrl.js"></script>
	<script type="text/javascript" src="./assets/js/controllers/op/opListCtrl.js"></script>
	<script type="text/javascript" src="./assets/js/controllers/op/opFormCtrl.js"></script>
	<script type="text/javascript" src="./assets/js/controllers/patient/patientCtrl.js"></script>
</html>
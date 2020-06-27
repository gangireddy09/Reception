angular.module('utility', ['camera', 'ngDialog', 'ui.bootstrap'])
.directive('tcCamera', ['ngDialog', function(ngDialog) {
	return {
		restrict: 'E',
		scope: {
			model: "=ngModel",
			onCapture: '&',
			confirmText: '@'
		},
		template: '<button class="btn btn-info"ng-click="capturePhoto()">Photo</button>',
		link: function(scope, ele, attr) {
			scope.autoClose = !scope.confirmText;
			scope.setModel = function(snap) {
				scope.tempModel = snap;
			};
			scope.setConfirmed = function(confirmed) {
				scope.confirmed = confirmed;
			};
			scope.capturePhoto = function() {
				ngDialog.open({
		    		template:'capturPhotoTemplate.html',
		    		className: 'ngdialog-theme-default ngdialog-lg',
		    		controller: 'cameraModelCtrl',
		    		scope: scope
		    	}).closePromise.then(function() {
		    		if (typeof scope.onCapture === 'function') {
		    			if (scope.confirmed) {
		    				scope.model = scope.tempModel;
		    			}
		    			scope.onCapture({$snap: scope.tempModel});
		    		}
		    	});
			};	
		}
	};
}])
.controller('cameraModelCtrl', ['$scope', 'ngDialog', function($scope, ngDialog) {
	$scope.onCamCapture = function(snap) {
		$scope.setModel(snap);
		if ($scope.autoClose) {
			$scope.confirm();
		}
	};
	
	$scope.confirm = function() {
		$scope.setConfirmed(true);
	};

	$scope.cancel = function() {
		$scope.setConfirmed(false);
	};
}])

.run(['$templateCache', function($templateCache) {
	$templateCache.put('capturPhotoTemplate.html', '<div class="camera-wrapper row">'
				+ '<ng-camera capture-message="Done!" class="grid-md-5"'
				+ 'countdown="3"'
				+ 'output-height="240"'
				+ 'output-width="320"'
				+ 'viewer-height="315"'
				+ 'viewer-width="420"'
				+ 'image-format="jpeg"'
				+ 'jpeg-quality="100"'
				+ 'action-message="Take picture"'
				+ 'snapshot="model"'
				+ 'overlay-url="./assets/images/overlay.png"'
				+ 'shutter-url="./assets/sounds/camera-click.mp3"'
				+ 'on-capture="onCamCapture($snap)">'
			+ '</ng-camera>'
			+ '<div class="preview-wrapper grid-md-5" ng-if="model">'
				+ '<img ng-src="{{model}}" alt="Click capture to see preview"/>'
					+ '<div class="grid-md-12 ngdialog-buttons">'
						+ '<button class="btn btn-md btn-green" ng-if="confirmText && model" ng-click="confirm();closeThisDialog(0)">{{confirmText}}</button>'
						+ '<button class="btn btn-md btn-grey" ng-if="confirmText" ng-click="cancel();closeThisDialog(0);">Cancel</button>'
					+ '</div>'
			+ '</div>');
	$templateCache.put('dateInputTemplate.html', '{{showWeeks}}<input type="text" placeholder="{{placeholder}}" class="form-field grid-md-12" ng-attr-name="{{name}}"'
			+ 'uib-datepicker-popup ng-model="model"' 
				+ 'is-open="calendarPanel.opened" datepicker-options="dateOptions"'
				+ 'ng-required="true" close-text="Close" />'
			+ '<span class="form-field-icon">'
				+ '<button type="button" class="btn btn-sm btn-sky-blue"'
					+ 'ng-click="openCalendar()">'
					+ '<i class="fa fa-calendar"></i>'
				+ '</button>'
			+ '</span>');
}]).filter('tcCamelCase', function() {
	return function(input) {
		input = input || ''; 
		return input.replace(/\w\S*/g, function(txt){
			var str = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			for (var i=0;i<str.length;i++) {
				if(str[i]==='.') {
					str = str.replace(str.charAt(i+1),function(a){return a.toUpperCase();});
				}
			}
			return str;
		});
	};
});

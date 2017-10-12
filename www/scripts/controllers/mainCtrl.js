
function MainCtrl ($scope, $window, $cookies, $location, HOME, LOGIN) {
	
	$scope.userProfile = {
		userName: '',
		userId: '',
		userToken: '',
		userRole: ''
	}

	if(!angular.isUndefined($cookies.getObject('name')) && 
		!angular.isUndefined($cookies.getObject('uid')) && 
		!angular.isUndefined($cookies.getObject('token'))  
		){
		
		$scope.userProfile.userName = $cookies.getObject('name');
		$scope.userProfile.userId = $cookies.getObject('uid');
		$scope.userProfile.userToken = $cookies.getObject('token');
		$scope.userProfile.userRole = $cookies.getObject('idp');
	}
	
	// TOOLBAR
 	$scope.btnLogOut = function (){
 		$scope.$emit('logout');
	}

 	$scope.$on('logout', function (){
 		$cookies.remove('name',{path: '/mvss/mvssweb'});
 		$cookies.remove('uid',{path: '/mvss/mvssweb'});
 		$cookies.remove('token',{path: '/mvss/mvssweb'});
 		$cookies.remove('idp',{path: '/mvss/mvssweb'});
 		//Produccion
 		// $cookies.remove('name',{path: '/elyweb'});
 		// $cookies.remove('uid',{path: '/elyweb'});
 		// $cookies.remove('token',{path: '/elyweb'});
 		// $cookies.remove('scpl1',{path: '/elyweb'});
 		// $cookies.remove('clgtt',{path: '/elyweb'});

 		// $window.localStorage.removeItem('lchng');
 		$window.location.href = LOGIN;
 	});
 	// TOOLBAR

 	$scope.btnBack = function (){ $window.history.back();}

}

angular.module('mainapp').controller('mainCtrl', MainCtrl);


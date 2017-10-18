
angular.module('loginapp').factory('UserService', UserService);

function LoginCtrl ($scope, $window, $cookies, $location, UserService, HOME) {
	$scope.user = {
		userName: '',
		userPassword: ''
	}
	$scope.showMessage = false;
	$scope.showMessageTxt = 'Usuario o Clave Invalidos.';
	$scope.showLoading = false;
 	
 	$scope.btnLogin = function (){
		$scope.showLoading = true;
		if(validateForm()){
			
			// UserService.setAuth($scope.user).success(function(response){
			// 	$scope.showMessage = false;
			// 	if(response.code == 200){
			// 		var expireDate = new Date(Date.now()+1*24*60*60*1000);
			// 		$cookies.putObject('token', response.user.token, {'expires': expireDate});
			// 		$cookies.putObject('uid', response.user.id, {'expires': expireDate});
			// 		$cookies.putObject('name', response.user.user, {'expires': expireDate});
			// 		$cookies.putObject('idp', response.user.idprofiles, {'expires': expireDate});
			// 		if(response.user.firstlogin != 0){
			// 			$window.location.href = HOME;
			// 		}else{
			// 			$location.path('/cambiar-clave');
			// 		}
					
			// 	}else{
			// 		$scope.showMessage = true;
			// 		$scope.showMessageTxt = 'Usuario o Clave Invalidos.';
			// 	}
			// 	$scope.showLoading = false;
			// })
			$window.location.href = HOME;
			$scope.showLoading = false;
		}else{
			$scope.showMessage = true;
			$scope.showMessageTxt = 'Usuario o Clave Incompletos.';
			$scope.showLoading = false;
		}
	}

	function validateForm (){
		var rta = true;

		if($scope.user.userName == '' || angular.isUndefined($scope.user.userName)){
			rta = false;
		}

		if($scope.user.userPassword == '' || angular.isUndefined($scope.user.userPassword)){
			rta = false;
		}

		return rta;

	}

}

angular.module('loginapp').controller('loginCtrl', LoginCtrl);
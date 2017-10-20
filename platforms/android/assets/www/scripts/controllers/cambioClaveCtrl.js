
angular.module('loginapp').factory('UserService', UserService);

function CambioClaveCtrl ($scope, $window, $cookies, $location, UserService) {
	$scope.pass = {
		// actualPassword: '',
		newPassword: '',
		newPassword2: ''
	}

	$scope.messege = {
		show: false,
		text: ''
	};

	$scope.showLoading = false;
 	
 	$scope.btnChange = function (){
		$scope.showLoading = true;
		if(validarMandatorios()){
			if($scope.pass.newPassword == $scope.pass.newPassword2 ){
				UserService.setChangedPassword($scope.pass.newPassword ).success(function (response){
					if(response.code == 200){
						// $window.location.href = '/elyapp/views/index.html';
						$window.location.href = '/mvss/mvssweb/views/';
					}else{
						$scope.messege.text = 'Usuario no valido.';
						$scope.messege.show = true;
					}
					console.log(respnse);
				})
			}else{
				$scope.messege.text = 'Las calves no coinciden.';
				$scope.messege.show = true;
			}

		}else{
			$scope.messege.text = 'Ingrese las ambas claves.';
			$scope.messege.show = true;
		}
		$scope.showLoading = false;
		
	}

	function validarMandatorios (){
		var ok = true;

		// if($scope.pass.actualPassword == '' || angular.isUndefined($scope.pass.actualPassword) ){
		// 	ok = false;
		// }

		if($scope.pass.newPassword == '' || angular.isUndefined($scope.pass.newPassword) ){
			ok = false;
		}

		if($scope.pass.newPassword2 == '' || angular.isUndefined($scope.pass.newPassword2) ){
			ok = false;
		}

		return ok ;
	}

}

angular.module('loginapp').controller('cambioClaveCtrl', CambioClaveCtrl);
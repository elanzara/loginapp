
angular.module('mainapp').factory('UserService', UserService);
angular.module('mainapp').factory('ListService', ListService);

function UsersCtrl ($scope, $window, $cookies, $location, UserService) {
	
	if(angular.isUndefined($cookies.getObject('name')) || 
		angular.isUndefined($cookies.getObject('uid')) || 
		angular.isUndefined($cookies.getObject('token'))  
		){
		$scope.$emit('logout');
	}

	var selectedIdx = '';

	UserService.getUsers().success(function(response){
		if(response.code == 200){
			$scope.usersCollection = response.data;
		}else if(response.code == 205){
			$scope.profilesCollection = '';
		}else if(response.code == 403){
			$scope.$emit('logout');
		}
	});
	
	$scope.btnEdit = function (idx){
		$location.path('/usuario-editar/'+$scope.usersCollection[idx].id);
	}

	$scope.btnDelete = function (idx){
		selectedIdx = idx;
		$('#deleteModal').modal('show');
	}		

	$scope.btnRenew = function (idx){
		selectedIdx = idx;
		$('#passModal').modal('show');
	}	

	$scope.btnConfirmDelete = function (){
		UserService.deleteUser($scope.usersCollection[selectedIdx].id).success(function(response){
			if(response.code == 200){
				$scope.usersCollection.splice(selectedIdx,1);
				$('#deleteModal').modal('hide');
				$window.location.reload();
			}else if(response.code == 403){
				$scope.$emit('logout');
			}
		});
	}		

	$scope.btnConfirmRenew = function (){
		UserService.renewPassword($scope.usersCollection[selectedIdx].id).success(function(response){
			if(response.code == 200){
				$scope.usersCollection.splice(selectedIdx,1);
				$('#deleteModal').modal('hide');
				$window.location.reload();
			}else if(response.code == 403){
				$scope.$emit('logout');
			}
		});
	}	

	$scope.btnNew = function (){
		$location.path('/usuario-nuevo');
	}

}


function UserEditCtrl ($scope, $window, $cookies, $location, $routeParams, UserService, ListService) {
	
	$scope.newModel = {
		id: '',	
		username: '',
		name: '',
		mail: '',
		idprofiles :'',
		profileCode: '',
		profileDescription: '',
	}

	$scope.profileSelected = '';


	ListService.getProfiles().success(function(response){
		if(response.code == 200){
			$scope.profileList = response.data;
		}
	})

	UserService.getUserxId($routeParams.userId).success(function(response){
		if(response.code == 200){
			userCollection = response.data[0];
			$scope.newModel = userCollection;
			$scope.profileSelected = {
				idprofiles: userCollection.idprofiles, 
				profileCode: userCollection.profileCode, 
				profileDescription: userCollection.profileDescription
			}
		}else if(response.code == 205){
			$scope.profilesCollection = '';
		}else if(response.code == 403){
			$scope.$emit('logout');
		}
	});

	$scope.showMandatory = false;
	$scope.showLoading = false;

	$scope.btnSave = function (){

		$scope.showMandatory = false;
		$scope.showLoading = true;
		if(validateForm()){
			$scope.newModel.idprofiles = $scope.profileSelected.idprofiles;
			$scope.newModel.profileCode = $scope.profileSelected.profileCode;
			$scope.newModel.profileDescription = $scope.profileSelected.profileDescription;
			UserService.putUser($routeParams.userId, $scope.newModel).success(function(response){
				if(response.code == 200){
					$location.path('/usuarios');
				}else if(response.code == 403){
					$scope.$emit('logout');
				}
			})
		}else{
			$scope.showMandatory = true;
			$scope.showLoading = false;
		}
	}

	function validateForm(){
		var rta = true;

		if($scope.newModel.name == '' || angular.isUndefined($scope.newModel.name)){ rta = false; }
		if($scope.newModel.mail == '' || angular.isUndefined($scope.newModel.mail)){ rta = false; }

		return rta;
	}

}

function UserNewCtrl ($scope, $window, $cookies, $location, UserService, ListService) {
	
	$scope.newModel = {
		id: '',	
		username: '',
		name: '',
		mail: '',
		idprofiles :'',
		profileCode: '',
		profileDescription: '',
	}

	$scope.profileSelected = '';

	ListService.getProfiles().success(function(response){
		if(response.code == 200){
			$scope.profileList = response.data;
		}
	})

	$scope.showMandatory = false;
	$scope.showLoading = false;

	$scope.btnSave = function (){
		$scope.showMandatory = false;
		$scope.showLoading = true;
		if(validateForm()){
			$scope.newModel.idprofiles = $scope.profileSelected.idprofiles;
			UserService.setNewUser($scope.newModel).success(function(response){
				if(response.code == 200){
					$location.path('/usuarios');
				}else if(response.code == 403){
					$scope.$emit('logout');
				}
			})
		}else{
			$scope.showMandatory = true;
			$scope.showLoading = false;
		}
	}

	function validateForm(){
		var rta = true;

		if($scope.newModel.username == '' || angular.isUndefined($scope.newModel.username)){ rta = false; }
		if($scope.newModel.name == '' || angular.isUndefined($scope.newModel.name)){ rta = false; }
		if($scope.newModel.mail == '' || angular.isUndefined($scope.newModel.mail)){ rta = false; }
		if($scope.profileSelected == '' || angular.isUndefined($scope.profileSelected)){ rta = false; }

		return rta;
	}

}

angular.module('mainapp').controller('usersCtrl', UsersCtrl);
angular.module('mainapp').controller('userEditCtrl', UserEditCtrl);
angular.module('mainapp').controller('userNewCtrl', UserNewCtrl);


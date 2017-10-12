

angular.module('mainapp').factory('ProfilesService', ProfilesService);

function ProfilesCtrl ($scope, $window, $cookies, $location, HOME, LOGIN, ProfilesService) {

	if(angular.isUndefined($cookies.getObject('name')) || 
		angular.isUndefined($cookies.getObject('uid')) || 
		angular.isUndefined($cookies.getObject('token'))  
		){
		$scope.$emit('logout');
	}

	var selectedIdx = '';

	ProfilesService.getProfiles().success(function(response){
		if(response.code == 200){
			$scope.profilesCollection = response.data;
		}else if(response.code == 205){
			$scope.profilesCollection = '';
		}else if(response.code == 403){
			$scope.$emit('logout');
		}
	});
	
	$scope.btnEdit = function (idx){
		$location.path('/perfil-editar/'+$scope.profilesCollection[idx].idprofiles);
	}

	$scope.btnDelete = function (idx){
		selectedIdx = idx;
		$('#deleteModal').modal('show');
	}	

	$scope.btnConfirmDelete = function (){
		ProfilesService.deleteProfile($scope.profilesCollection[selectedIdx].idprofiles).success(function(response){
			if(response.code == 200){
				$scope.profilesCollection.splice(selectedIdx,1);
				$('#deleteModal').modal('hide');
				$window.location.reload();
			}else if(response.code == 403){
				$scope.$emit('logout');
			}
		});
	}	

	$scope.btnNew = function (){
		$location.path('/perfil-nuevo');
	}

}


function ProfileNewCtrl ($scope, $window, $cookies, $location, ProfilesService) {
	
	$scope.newModel = {
		code :'',
		description: ''
	}
	$scope.showMandatory = false;

	$scope.btnSave = function (){
		$scope.showMandatory = false;
		if(validateForm()){
			ProfilesService.setProfile($scope.newModel).success(function(response){
				if(response.code == 200){
					$location.path('/perfiles');
				}else if(response.code == 403){
					$scope.$emit('logout');
				}
			})
		}else{
			$scope.showMandatory = true;
		}
	}

	function validateForm(){
		var rta = true;

		if($scope.newModel.code == '' || angular.isUndefined($scope.newModel.code)){ rta = false; }
		if($scope.newModel.description == '' || angular.isUndefined($scope.newModel.description)){ rta = false; }

		return rta;
	}

}

function ProfileEditCtrl ($scope, $window, $cookies, $location, $routeParams, ProfilesService) {
	
	$scope.newModel = {
		id: '',	
		code :'',
		description: ''
	}
	ProfilesService.getProfilesxId($routeParams.profileId).success(function(response){
		if(response.code == 200){
			profileCollection = response.data[0];
			$scope.newModel.id = profileCollection.idprofiles;
			$scope.newModel.code = profileCollection.profileCode;
			$scope.newModel.description = profileCollection.profileDescription;
		}else if(response.code == 205){
			$scope.profilesCollection = '';
		}else if(response.code == 403){
			$scope.$emit('logout');
		}
	});

	$scope.showMandatory = false;

	$scope.btnSave = function (){
		$scope.showMandatory = false;
		if(validateForm()){
			ProfilesService.putProfile($routeParams.profileId, $scope.newModel).success(function(response){
				if(response.code == 200){
					$location.path('/perfiles');
				}else if(response.code == 403){
					$scope.$emit('logout');
				}
			})
		}else{
			$scope.showMandatory = true;
		}
	}

	function validateForm(){
		var rta = true;

		if($scope.newModel.code == '' || angular.isUndefined($scope.newModel.code)){ rta = false; }
		if($scope.newModel.description == '' || angular.isUndefined($scope.newModel.description)){ rta = false; }

		return rta;
	}

}

angular.module('mainapp').controller('profilesCtrl', ProfilesCtrl);
angular.module('mainapp').controller('profileNewCtrl', ProfileNewCtrl);
angular.module('mainapp').controller('profileEditCtrl', ProfileEditCtrl);


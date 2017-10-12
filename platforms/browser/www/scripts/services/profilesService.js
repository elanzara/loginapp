function ProfilesService($http, $location, $cookies) {

	var profileResponse = {};
	var apiUrl = 'http://'+$location.host()+'/mvss/mvssapi/v1/profiles/';
	var config = {
		headers:  {'Authorization': $cookies.getObject('token'), 'SID': $cookies.getObject('uid')}
	};

	profileResponse.getProfiles = function () {
		return $http.get(apiUrl, config);
	};

	profileResponse.setProfile = function (options) {
		return $http.post(apiUrl, options, config);
	};

	profileResponse.putProfile = function (pId, options) {
		return $http.post(apiUrl+pId, options, config);
	};

	profileResponse.deleteProfile = function (options) {
		return $http.delete(apiUrl+options, config);
	};

	profileResponse.getProfilesxId = function (options) {
		return $http.get(apiUrl+options, config);
	};


	return profileResponse;
}
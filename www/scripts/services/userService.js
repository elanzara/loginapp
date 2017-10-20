function UserService($http, $location, $cookies) {

	var userResponse = {};
	var apiUrl = 'http://192.168.1.47/mvss/mvssapi/v1/users/';/*'http://'+$location.host()+*/
	//   var apiUrl = 'http://m4000521.ferozo.com/mvssapi/v1/users/';/*'http://'+$location.host()+*/
	var config = {
		headers:  {'Authorization': $cookies.getObject('token'), 'SID': $cookies.getObject('uid')}
	};
	
	userResponse.setAuth = function (user) {
		alert (apiUrl+'Auth/');
		return $http.post(apiUrl+'Auth/', user);
	};

	userResponse.getAuth = function () {
		var config = {
			headers:  {'Authorization': $cookies.getObject('token')}
		};
		return $http.get(apiUrl+'Auth/'+$cookies.getObject('uid'), config);
	};

	userResponse.setNewUser = function (user) {
		return $http.post(apiUrl, user);
	};

	userResponse.setChangedPassword = function (pass) {
		var config = {
			headers:  {'Authorization': $cookies.getObject('token'), 'SID': $cookies.getObject('uid')}
		};
		return $http.post(apiUrl+'firstlogin/', {password: pass}, config);
	};

	userResponse.getUserActivation = function (model) {
		//return $http.post('http://www.ely.com.ar/ely-api/sendMail.php', model);
		 return $http.post(apiUrl+'validateMail/', model);
	};

	userResponse.getUsers = function () {
		return $http.get(apiUrl, config);
	};

	userResponse.getUserxId = function (uid) {
		return $http.get(apiUrl + uid, config);
	};	

	userResponse.putUser = function (uid, options) {
		return $http.post(apiUrl + uid, options, config);
	};

	userResponse.deleteUser = function (options) {
		return $http.delete(apiUrl+options, config);
	};

	userResponse.renewPassword = function (uid) {
		return $http.get(apiUrl+'renew/'+uid, config);
	};

	return userResponse;
}
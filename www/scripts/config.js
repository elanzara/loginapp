//LOGIN APP
angular.module('loginapp',['ngRoute', 'ngResource', 'ngCookies']);
//angular.module('loginapp').constant('HOME', '/loginapp/views/');
angular.module('loginapp').constant('HOME', 'assets/www/views/');


// RESOURCE FOR API REST
angular.module('loginapp').config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

angular.module('loginapp').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/cambiar-clave', {
        templateUrl: 'views/cambiar-clave.html',
        controller: 'cambioClaveCtrl'
      })./*
      when('/registrar', {
        templateUrl: 'views/registrar.html',
        controller: 'registrationCtrl'
      }).*/
      otherwise({
        templateUrl: 'views/login.html'
    });

}]);

//MAIN APP
angular.module('mainapp',['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap']);
angular.module('mainapp').constant('HOME', '/views/');
angular.module('mainapp').constant('LOGIN', '/mvssweb/');


// RESOURCE FOR API REST
angular.module('mainapp').config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

angular.module('mainapp').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/usuarios', {
        templateUrl: 'usuarios.html',
        controller: 'usersCtrl'
      }).
      when('/usuario-editar/:userId', {
        templateUrl: 'usuario-editar.html',
        controller: 'userEditCtrl'
      }).
      when('/usuario-nuevo', {
        templateUrl: 'usuario-nuevo.html',
        controller: 'userNewCtrl'
      }).
      when('/perfiles', {
        templateUrl: 'perfiles.html',
        controller: 'profilesCtrl'
      }).
      when('/perfil-nuevo', {
        templateUrl: 'perfil-nuevo.html',
        controller: 'profileNewCtrl'
      }).
      when('/perfil-editar/:profileId', {
        templateUrl: 'perfil-editar.html',
        controller: 'profileEditCtrl'
      }).
      when('/clientes', {
        templateUrl: 'clientes.html',
        controller: 'clientesCtrl'
      }).
      when('/cliente-nuevo', {
        templateUrl: 'cliente-nuevo.html',
        controller: 'clientesNewCtrl'
      }).
      when('/cliente-editar/:clienteId', {
        templateUrl: 'cliente-editar.html',
        controller: 'clientesEditCtrl'
      }).
      when('/objetivos', {
        templateUrl: 'objetivos.html',
        controller: 'objetivosCtrl'
      }).
      when('/objetivo-nuevo', {
        templateUrl: 'objetivo-nuevo.html',
        controller: 'objetivoNewCtrl'
      }).
      when('/objetivo-editar/:objetivoId', {
        templateUrl: 'objetivo-editar.html',
        controller: 'objetivoEditCtrl'
      }).
      when('/tiposnovedades', {
        templateUrl: 'tiposnovedades.html',
        controller: 'tiposnovedadesCtrl'
      }).
      when('/tiposnovedades-nuevo', {
        templateUrl: 'tiposnovedades-nuevo.html',
        controller: 'TiponovedadNewCtrl'
      }).
      when('/tiposnovedades-editar/:idtiponovedad', {
        templateUrl: 'tiposnovedades-editar.html',
        controller: 'TiponovedadEditCtrl'
      }).
      when('/legajos', {
        templateUrl: 'legajos.html',
        controller: 'legajosCtrl'
      }).
      when('/legajo-nuevo', {
        templateUrl: 'legajo-nuevo.html',
        controller: 'legajoNewCtrl'
      }).
      when('/legajo-editar/:idlegajo', {
        templateUrl: 'legajo-editar.html',
        controller: 'legajoEditCtrl'
      }).
      when('/campanias', {
        templateUrl: 'campanias.html',
        controller: 'campaniasCtrl'
      }).
      when('/campania-nuevo', {
        templateUrl: 'campania-nuevo.html',
        controller: 'campaniaNewCtrl'
      }).
      when('/campania-editar/:idcampania', {
        templateUrl: 'campania-editar.html',
        controller: 'campaniaEditCtrl'
      }).
      when('/horas/', {
        templateUrl: 'horas.html',
        controller: 'horasCtrl'
      }).
      when('/hora-editar/', {
        templateUrl: 'hora-editar.html',
        controller: 'horasEditCtrl'
      }).
      when('/reportehoras/', {
        templateUrl: 'reportehoras.html',
        controller: 'horasReporteCtrl'
      }).
      when('/grupofamiliar/:idlegajo', {
        templateUrl: 'grupofamiliar.html',
        controller: 'grupofamiliarCtrl'
      }).
      when('/grupofamiliar-nuevo/:idlegajo', {
        templateUrl: 'grupofamiliar-nuevo.html',
        controller: 'grupofamiliarNewCtrl'
      }).
      when('/grupofamiliar-editar/:idgrupofamiliar', {
        templateUrl: 'grupofamiliar-editar.html',
        controller: 'grupofamiliarEditCtrl'
      }).
      otherwise({
        templateUrl: 'home.html'
    });

}]);
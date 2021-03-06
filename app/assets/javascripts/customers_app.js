// Declare a variable which points to our Angular app.
// Declare Angular app's dependencies (Modules => ngRoute, templates)
var app = angular.module('customers',['ngRoute','templates']);


app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/", {
      controller: "CustomerSearchController",
      templateUrl: "customer_search.html"
    }).when('/:id',{
      controller: 'CustomerDetailController',
      templateUrl: 'customer_detail.html'
    });
  }
]);


app.controller('CustomerSearchController', [
  '$scope','$http','$location',
  function($scope , $http, $location) {
    //$scope.search = function(searchTerm) {
    //  $scope.searchedFor = searchTerm;
    //}
    var page = 0;
    $scope.customers = [];

    // Start sending trips to the server after user has typed in more than three characters.
    $scope.search = function(searchTerm) {
      if (searchTerm.length < 3) {
        return;
      }

      $http.get('/customers.json', { 'params': { 'keywords': searchTerm, "page": page } }
      ).success(
        function(data,status,headers,config) {
          $scope.customers = data;
        }).error(
        function(data,status,headers,config) {
          alert('There was a problem: '+status);
        });
      //$scope.customers = [
      //  {
      //    "first_name":"Schuyler",
      //    "last_name":"Cremin",
      //    "email":"giles0@macgyver.net",
      //    "username":"jillian0",
      //    "created_at":"2015-03-04",
      //  },
      //  {
      //    "first_name":"Derick",
      //    "last_name":"Ebert",
      //    "email":"lupe1@rennerfisher.org",
      //    "username":"ubaldo_kaulke1",
      //    "created_at":"2015-03-04",
      //  },
      //  {
      //    "first_name":"Derick",
      //    "last_name":"Johnsons",
      //    "email":"dj@somewhere.org",
      //    "username":"djj",
      //    "created_at":"2015-03-04",
      //  }
      //]
    }; // END $scope.search = function(searchTerm) {

    $scope.previousPage = function() {
      if (page > 0) {
        page = page - 1;
        $scope.search($scope.keywords);
      }
    }; // END $scope.previousPage = function()

    $scope.nextPage = function() {
      page = page + 1;
      $scope.search($scope.keywords);
    }; // END $scope.nextPage = function()

    // viewDetails will create URL using customer's ID
    $scope.viewDetails = function(customer) {
      $location.path('/' + customer.id);
    }
  } // END function($scope , $http, $location) {
]); // END app.controller('CustomerSearchController', [


app.controller("CustomerDetailController", [
  "$scope","$http","$routeParams",
  function($scope , $http , $routeParams) {

    // Make the AJAX call and set $scope.customer...
    //   a) $routeParams provides access to the specific ID from the Angular route.
    //   b) inside the "success" callback, we set $scope.customer to the value we get via
    //      $scope.customer = data;
    //
    var customerId = $routeParams.id;
    $scope.customer = {};

    $http.get(
      "/customers/" + customerId + ".json"
    ).success(function(data,status,headers,config) {
      $scope.customer = data;
    }).error(function(data,status,headers,config) {
      alert("There was a problem: " + status);
    });
  }
]); // END app.controller("CustomerDetailController", [
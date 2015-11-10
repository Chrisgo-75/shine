var app = angular.module('customers',[]);

app.controller('CustomerSearchController', [
  '$scope','$http',
  function($scope , $http) {
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
  } // END function($scope , $http) {
]);
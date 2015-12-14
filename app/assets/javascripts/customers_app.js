// Declare a variable which points to our Angular app.
// Declare Angular app's dependencies (Modules => ngRoute, templates)
var app = angular.module('customers',['ngRoute','ngResource','ngMessages','templates']);


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
  "$scope","$routeParams","$resource",
  function($scope , $routeParams , $resource) {

    // Below was used when using $http
    // Make the AJAX call and set $scope.customer...
    //   a) $routeParams provides access to the specific ID from the Angular route.
    //   b) inside the "success" callback, we set $scope.customer to the value we get via
    //      $scope.customer = data;
    //
    //var customerId = $routeParams.id;
    //$scope.customer = {};
    //
    //$http.get(
    //  "/customers/" + customerId + ".json"
    //).success(function(data,status,headers,config) {
    //  $scope.customer = data;
    //}).error(function(data,status,headers,config) {
    //  alert("There was a problem: " + status);
    //});

    // Below being used when angular-resource was enabled
    // var customerId = $routeParams.id;
    // Changed the above local variable to a "$scope" variable so that the View can access the variable.
    $scope.customerId = $routeParams.id;
    // (below) Explicitly indicating which HTTP request to use ... PUT.
    // (below) So {"customerId": "@customer_id"} instructs Angular to fill in :customerId
    //         with whatever the value of customer_id is on the object on which we
    //         are calling $save().
    // (below) So when we call $save() on $scope.customer, angular will look in $scope.customer.customer_id to
    //         create the URL to send back to the server, using the PUT HTTP method.
    var Customer = $resource('/customers/:customerId.json',
                             {"customerId": "@customer_id"},
                             {"save": { "method": "PUT" }});

    // Below is a asynchronous call.
    // The object we get back from 'Customer.get' is a "promise" that, when resolved, will set properties on itself
    //   based on the results of the call.
    $scope.customer = Customer.get({ "customerId": $scope.customerId });
    // An alert is sent to user to notify of AJAX call was just sent and if you click "ok" quick enough will show
    // blank page which demonstrates AJAX isn't completed quite yet b/c of "sleep 5" in Controller action.
    alert("AJAX Call Initiated!");


    // Keep ...
    //$scope.save = function() {
    //  alert($scope.form.$valid);
    //  //window.blah = $scope.form;
    //  if ($scope.form.email.$valid) {
    //    alert("Email is valid");
    //  } else if ($scope.form.email.$error.required) {
    //    alert("Email is required");
    //  } else if ($scope.form.email.$error.email) {
    //    alert("Email must look like an email");
    //  }
    //} // END $scope.save = function() {
    $scope.save = function() {
      if ($scope.form.$valid) {
        $scope.customer.$save(
          function() {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            alert("Save Successful!");
          },
          function() {
            alert("Save Failed :(");
          }
        );
      }
    }

  } // END function($scope , $routeParams , $resource) {
]); // END app.controller("CustomerDetailController", [


app.controller("CustomerCreditCardController", [
  "$scope","$resource",
  function($scope , $resource) {
    var CreditCardInfo = $resource('/fake_billing.json')
    // Hard coded customerid: $scope.creditCard = CreditCardInfo.get({ "cardholder_id": 1234})
    $scope.setCardholderId = function(cardholderId) {
      $scope.creditCard = CreditCardInfo.get(
        {"cardholder_id": cardholderId}
      )
    }
  } // END function($scope , $resource) {
]); // END app.controller("CustomerCreditCardController", [
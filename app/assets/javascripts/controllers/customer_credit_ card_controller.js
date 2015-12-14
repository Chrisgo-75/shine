// Look up our Angular app via "angular.module"
var app = angular.module('customers');

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
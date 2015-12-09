describe("CustomerSearchController", function() {

  // Q: Where to call, our call to inject so that it will work as described?
  // A: 1- Jasmine provides a function named "beforeEach" that works like "before" in RSpec.
  //    2- Need to call "module('customers') in a "beforeEach" block, so our app is always loaded.
  //    3- Lastly, need to hold a reference to our scope and controller so we can use them in our tests. To do that,
  //       we declare "scope" and "controller" outside our "beforeEach" functions.
  //
  describe("Initialization", function() {

    var scope      = null,
        controller = null;

    // The Angular function "module" can be used to "load" our app. Which is different from "starting" our app.
    beforeEach(module("customers"));

    // To create an instance of our controller, Angular provides a service function named "$controller".
    //   a) $controller function accepts two arguments("name of controller to instantiate",
    //                                                 "object of variables to be injected into controller's constructor function").
    //   a1) We don't want to pass in any object for $scope but the same sort of object that Angular would use.
    //       In order to pass in a REAL scope, we need access to $rootScope which exposes a function $new. When we
    //       call $new, we'll get back a new $rootScope.Scope WHICH is the same type that Angular passes in at runtime.
    //       Below "scope = $rootScope.$new();" is how this is implemented.
    //
    // Question: How do we get access to the $controler and $rootScope functions?
    // Answer:   Our controller-declared arguments, along with the array of strings naming them, allow Angular to find
    //           those registered objects and pass them into our controller function. We can use this mechanism ourselves
    //           via the inject function. The inject function can be used to ask Angular to call a function with any
    //           objects in its internal registry. So, we’ll ask Angular to pass both $controller and $rootScope into a
    //           function in which we’ll set up our controller as outlined below.
    // A catch:  Inject function is an alias to angular.mock.inject, which is provided by the angular-mocks module.
    beforeEach(inject(function ($controller, $rootScope) {
      scope      = $rootScope.$new();
      controller = $controller("CustomerSearchController", {
        $scope: scope
      });
    }));

    // tests go here...

    it("defaults to an empty customer list", function() {
      // "toEqualData" is a Jasmine Custom Matcher stored in /spec/javascripts/spec_helper.js
      expect(scope.customers).toEqualData([]);
    });

  }); // describe("Initialization", function() {


  describe("Fetching Search Results", function() {
    var scope       = null,
        controller  = null,
        httpBackend = null,
        serverResults = [
        {
          id: 123,
          first_name: "Bob",
          last_name: "Jones",
          email: "bjones@foo.net",
          username: "jonesy"
        },
        {
          id: 456,
          first_name: "Bob",
          last_name: "Johnsons",
          email: "johnboy@bar.info",
          username: "bobbyj"
        }
      ];

    beforeEach(module("customers"));

    // $httpBackend
    // #3- Like towards the top of this file, we need Angular to "inject" $httpBackend into our test code so we can
    //     grab a reference to it. We can do this by adding $httpBackend to our call to "inject" when we set up our controller.
    //     We'll also create a variable "serverResults" (above) that holds the *simulated* results passed-back from the server.
    //
    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
      scope       = $rootScope.$new(); // $rootScope is defined towards top of this file.
      httpBackend = $httpBackend;
      controller  = $controller("CustomerSearchController", {
        $scope: scope
      });
    }));

    // httpBackend
    // #1- Angular-mocks module provides a test version of $http called $httpBackend which is what $http uses
    //     under the covers.
    // #2- angular-mock version of $httpBackend allows us to specify:
    //     a) What AJAX requests might get made, and to control what gets returned.
    //     b) The function "when" can be used to configure an HTTP call, and the function "respond" controls the response.
    //
    beforeEach(function() {
      httpBackend.when('GET','/customers.json?keywords=bob&page=0').
      respond(serverResults);
    });

    // previous setup code

    it("populates the customer list with the results", function() {
      scope.search("bob");
      httpBackend.flush(); // ".flush" tells $httpBackend to call our callback functions registered in our controller.
      //                      Q: Why the need to call callback function?
      //                      A: HTTP calls in Javascript are asynchronous. Therefore, need a way to call the
      //                         callback functions in controller.
      expect(scope.customers).toEqualData(serverResults);
    });
  }); // END describe("Fetching Search Results", function() {


  describe("Error Handling", function() {

    // same setup as previous test...

    var scope       = null,
      controller  = null,
      httpBackend = null;

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope       = $rootScope.$new();
        httpBackend = $httpBackend;
        controller  = $controller("CustomerSearchController", {
          $scope: scope
        });
      }
    ));

    beforeEach(function() {
      httpBackend.when('GET','/customers.json?keywords=bob&page=0').
      respond(500,'Internal Server Error');
      spyOn(window, "alert");
    });

    it("alerts the user on an error", function() {
      scope.search("bob");
      httpBackend.flush();
      expect(scope.customers).toEqualData([]);
      expect(window.alert).toHaveBeenCalledWith(
        "There was a problem: 500");
    });
  }); // END describe("Error Handling", function() {

});
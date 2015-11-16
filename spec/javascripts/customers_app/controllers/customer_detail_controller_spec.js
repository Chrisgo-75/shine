describe("CustomerDetailController", function() {

  // Declaring variables we'll need in the test as well as creating a test customer that
  // we'll pretend is being sent to our Controller from the back-end.
  describe("Initialization", function() {
    var scope       = null,
      controller  = null,
      id          = 42,
      httpBackend = null,
      customer    = {
        id: id,
        first_name: "Bob",
        last_name: "Jones",
        username: "bob.jones",
        email: "bobbyj@somewhere.net",
        created_at: "2014-01-03T11:12:34"
      };

    beforeEach(module("customers"));

    // Setting up the Controller
    //   a) injecting "$routeParams into our setup. This allows our Controller to access the dynamic
    //      parts of the route.
    //   b) set expectation on httpBackend BEFORE we call $controller. This is b/c calling $controller will
    //      execute the Controller function, and we want that function to make the AJAX call automatically.
    //      So we need to configure what call we're expecting and how it should respond first.
    beforeEach(inject(function ($controller,
                                $rootScope,
                                $routeParams,
                                $httpBackend) {
      scope       = $rootScope.$new();
      httpBackend = $httpBackend;

      $routeParams.id = id;

      httpBackend.when('GET','/customers/' + id + '.json').
      respond(customer);

      controller  = $controller("CustomerDetailController", {
        $scope: scope
      });
    }));

    // Conduct Test
    // Our test is that our controller has set $scope.customer to have the same
    // data as the customer we configured as a response to the AJAX call.
    //
    it("fetches the customer from the back-end", function() {
      httpBackend.flush();
      expect(scope.customer).toEqualData(customer);
    });

  });
});
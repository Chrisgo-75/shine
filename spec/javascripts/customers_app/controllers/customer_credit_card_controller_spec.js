describe("CustomerCreditCardController", function() {
  describe("Initialization", function() {
    var scope = null,
      cardholderId = 42,
      cardInfo = {
        lastFour: '4321',
        cardType: 'visa',
        expirationMonth: 3,
        expirationYear: 2018,
        detailsLink: 'http://billing.example.com/foo'
      };

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller,
                                $rootScope,
                                $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      httpBackend.when(
        'GET',
        '/fake_billing.json?cardholder_id=' + cardholderId
      ).respond(cardInfo);
      controller = $controller("CustomerCreditCardController", {
        $scope: scope
      });
    }));

    // tests will go here...

    // This test will fail ANY AJAX calls are made during initialization of the controller.
    it('does not hit the backend initially', function() {
      expect(scope.creditCard).not.toBeDefined();
    });


    // Description of test
    // #1 -
    //     Here we simulate what’s going on in ng-init by calling the public function
    //     setCardholderId directly. After this call the AJAX call would be in-flight and
    //     the promise underlying $scope.creditCard would not be resolved.
    //
    // #2 -
    //     Although we wouldn’t normally test Angular’s underlying promise system,
    //     we can see it in action in our tests. Here we see scope.creditCard is defined.
    //
    // #3 -
    //     Here, we can see that although scope.creditCard is defined, it doesn’t have
    //     any properties set on it. Again, you probably wouldn’t test this for real,
    //     but it does demonstrate the order of operations.
    //
    // #4 -
    //     This line simulates the completion of the AJAX call by using httpBackend.
    //     flush() as we’ve seen before. At this point the promise is resolved, and
    //     we’d expect $scope.creditCard to have data in it.
    //
    // #5 -
    //     Finally, we can assert that we got data back from the server. scope.creditCard
    //     is now populate with all of the data we expect.
    //
    it("when setCardholderId is called, hits back-end", function() {
      scope.setCardholderId(cardholderId); // #1
      expect(scope.creditCard).toBeDefined(); // #2
      expect(scope.creditCard.lastFour).not.toBeDefined(); // #3
      httpBackend.flush(); // #4
      expect(scope.creditCard).toEqualData(cardInfo); // #5
    });

    // END implementation of tests...

  });
});
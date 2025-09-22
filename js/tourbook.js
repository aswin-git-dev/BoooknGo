// Tour Booking Module - extends the main travelApp module
angular.module('travelApp')

  .service('TourService', function() {
    this.calculateTotal = function(booking) {
      let base = (booking.adults * 500) + (booking.youth * 300) + (booking.children * 150);
      if (booking.meal) base += 100;
      if (booking.guide) base += 200;
      return base;
    };
  })

  .controller('TourBookingController', function(TourService, AnimationService) {
    var vm = this;

    vm.tour = {
      name: "Taj Mahal Sunrise Tour",
      location: "Agra, Uttar Pradesh",
      description: "Enjoy the enchanting beauty of the Taj Mahal at sunrise with expert guides and optional amenities."
    };

    vm.booking = {
      adults: 0,
      youth: 0,
      children: 0,
      meal: false,
      guide: false
    };

    vm.total = 0;

    vm.updateTotal = function() {
      vm.total = TourService.calculateTotal(vm.booking);
    };
  })

  .directive('priceBox', function() {
    return {
      restrict: 'E',
      scope: {
        amount: '='
      },
      template: `
        <div class="alert alert-success fw-bold">
          Total Price: ₹{{ amount }}
        </div>
      `
    };
  });


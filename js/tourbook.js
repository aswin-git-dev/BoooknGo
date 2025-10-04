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

  .controller('TourBookingController', function($http, TourService, $window) {
    var vm = this;
    // Sample tour packages
    vm.tours = [
      {
        _id: 't1',
        name: "Taj Mahal Sunrise Tour",
        location: "Agra, Uttar Pradesh",
        description: "Enchanting beauty of the Taj Mahal at sunrise.",
        room: { name: "Deluxe Room", price: 1200 },
        transport: { mode: "Train", price: 800 }
      },
      {
        _id: 't2',
        name: "Goa Beach Adventure",
        location: "Goa",
        description: "Beach fun, water sports, and nightlife.",
        room: { name: "Beach Hut", price: 2000 },
        transport: { mode: "Bus", price: 1000 }
      },
      {
        _id: 't3',
        name: "Kerala Backwater Retreat",
        location: "Alleppey, Kerala",
        description: "Houseboat stay and scenic backwater cruise.",
        room: { name: "Houseboat Suite", price: 3500 },
        transport: { mode: "Private Car", price: 1800 }
      },
      {
        _id: 't4',
        name: "Rajasthan Royal Heritage",
        location: "Jaipur, Rajasthan",
        description: "Palace tour, folk shows, and desert safari.",
        room: { name: "Heritage Palace Room", price: 4000 },
        transport: { mode: "Train", price: 1200 }
      },
      {
        _id: 't5',
        name: "Himalayan Trekking Adventure",
        location: "Manali, Himachal Pradesh",
        description: "Guided trek, camping, and bonfire nights.",
        room: { name: "Mountain Camp", price: 2200 },
        transport: { mode: "Bus", price: 900 }
      }
    ];
    vm.filters = { location: '', minPrice: '', maxPrice: '' };
    vm.filteredTours = vm.tours.slice();
    vm.applyFilter = function() {
      vm.filteredTours = vm.tours.filter(function(tour) {
        var locMatch = !vm.filters.location || tour.location.includes(vm.filters.location);
        var minMatch = !vm.filters.minPrice || (tour.room.price + tour.transport.price) >= vm.filters.minPrice;
        var maxMatch = !vm.filters.maxPrice || (tour.room.price + tour.transport.price) <= vm.filters.maxPrice;
        return locMatch && minMatch && maxMatch;
      });
    };
    vm.clearFilter = function() {
      vm.filters = { location: '', minPrice: '', maxPrice: '' };
      vm.filteredTours = vm.tours.slice();
    };
    vm.bookTour = function(tour) {
      // Calculate total cost from mock data
      var total = (tour.room ? tour.room.price : 0) + (tour.transport ? tour.transport.price : 0);
      var selectedTour = Object.assign({}, tour, { total: total });
      localStorage.setItem('selectedTour', JSON.stringify(selectedTour));
      $window.location.href = 'booktour.html';
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


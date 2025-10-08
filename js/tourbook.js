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
    vm.selectedTour = {};
    vm.booking = {};
    vm.selectedTransport = {};
    // Realistic tour packages from Madurai
    vm.tours = [
      {
        _id: 't1',
        name: "Chennai City Tour",
        location: "Chennai",
        description: "Explore Marina Beach, Fort St. George, and more.",
        room: { name: "Deluxe Room", price: 1800 },
        transports: [
          { mode: "Bus", price: 550 },
          { mode: "Train", price: 800 },
          { mode: "Flight", price: 2500 }
        ]
      },
      {
        _id: 't2',
        name: "Bangalore Adventure",
        location: "Bangalore",
        description: "Visit Lalbagh, Cubbon Park, and IT hubs.",
        room: { name: "Executive Suite", price: 2200 },
        transports: [
          { mode: "Bus", price: 900 },
          { mode: "Train", price: 1200 },
          { mode: "Flight", price: 3200 }
        ]
      },
      {
        _id: 't3',
        name: "Hyderabad Heritage",
        location: "Hyderabad",
        description: "Charminar, Golconda Fort, and biryani delights.",
        room: { name: "Heritage Room", price: 2000 },
        transports: [
          { mode: "Train", price: 1200 },
          { mode: "Flight", price: 4100 }
        ]
      },
      {
        _id: 't4',
        name: "Coimbatore Nature Escape",
        location: "Coimbatore",
        description: "Isha Yoga, Siruvani Falls, and more.",
        room: { name: "Nature Suite", price: 1500 },
        transports: [
          { mode: "Bus", price: 400 },
          { mode: "Train", price: 600 }
        ]
      },
      {
        _id: 't5',
        name: "Trichy Temple Trail",
        location: "Trichy",
        description: "Rockfort, Srirangam, and river views.",
        room: { name: "Temple View Room", price: 1300 },
        transports: [
          { mode: "Bus", price: 350 },
          { mode: "Train", price: 350 }
        ]
      }
    ];
    vm.filters = { location: '', minPrice: '', maxPrice: '' };
    vm.filteredTours = vm.tours.slice();
    vm.applyFilter = function() {
      vm.filteredTours = vm.tours.filter(function(tour) {
        var locMatch = !vm.filters.location || tour.location.toLowerCase().includes(vm.filters.location.toLowerCase());
        // Use first transport for price filter if none selected
        var transportPrice = (tour.transports && tour.transports.length > 0) ? tour.transports[0].price : 0;
        var minMatch = !vm.filters.minPrice || (tour.room.price + transportPrice) >= vm.filters.minPrice;
        var maxMatch = !vm.filters.maxPrice || (tour.room.price + transportPrice) <= vm.filters.maxPrice;
        return locMatch && minMatch && maxMatch;
      });
    };
    vm.clearFilter = function() {
      vm.filters = { location: '', minPrice: '', maxPrice: '' };
      vm.filteredTours = vm.tours.slice();
    };
    vm.openBookingModal = function(tour) {
      if (vm.selectedTransport[tour._id] === undefined) {
        alert('Please select a transport option.');
        return;
      }
      var transport = tour.transports[vm.selectedTransport[tour._id]];
      var total = tour.room.price + transport.price;
      var discount = Math.round(total * 0.1);
      var finalTotal = total - discount;
      vm.selectedTour = tour;
      vm.booking = {
        name: '',
        phone: '',
        address: '',
        city: '',
        transport: transport.mode + ' (₹' + transport.price + ')',
        finalTotal: finalTotal
      };
      setTimeout(function() {
        var modal = new bootstrap.Modal(document.getElementById('tourBookingModal'));
        modal.show();
      }, 0);
    };
    vm.submitBooking = function() {
      if (!vm.booking.name || !vm.booking.phone || !vm.booking.address || !vm.booking.city) {
        alert('Please fill all details.');
        return;
      }
      var bookingData = {
        name: vm.booking.name,
        phone: vm.booking.phone,
        address: vm.booking.address,
        city: vm.booking.city,
        tourName: vm.selectedTour.name,
        location: vm.selectedTour.location,
        roomName: vm.selectedTour.room.name,
        transport: vm.booking.transport,
        total: vm.booking.finalTotal
      };
      $http.post('http://localhost:5000/api/bookedtours', bookingData)
        .then(function() {
          alert('Tour booked successfully!');
          var modal = bootstrap.Modal.getInstance(document.getElementById('tourBookingModal'));
          modal.hide();
        })
        .catch(function() {
          alert('Booking failed. Please try again.');
        });
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


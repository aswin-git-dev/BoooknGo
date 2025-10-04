// BookHotelController for bookhotel-form.html
angular.module('travelApp')
  .controller('BookHotelController', function($http) {
    var vm = this;
    var hotel = JSON.parse(localStorage.getItem('selectedHotel')) || {};
    var userid = localStorage.getItem('userid');
    vm.form = {
      hotelName: hotel.name,
      city: hotel.city,
      price: hotel.price,
      userid: userid
    };
    vm.bookHotel = function() {
      if (!vm.form.name || !vm.form.email || !vm.form.phone) {
        vm.errorMessage = 'All fields are required.';
        return;
      }
      $http.post('http://localhost:5000/api/bookedhotels', vm.form)
        .then(function(res) {
          vm.successMessage = 'Hotel booked successfully!';
          vm.errorMessage = '';
        })
        .catch(function() {
          vm.errorMessage = 'Booking failed. Try again.';
          vm.successMessage = '';
        });
    };
  });

// BookTourController for booktour.html
angular.module('travelApp')
  .controller('BookTourController', function($http) {
    var vm = this;
    var tour = JSON.parse(localStorage.getItem('selectedTour')) || {};
    var userid = localStorage.getItem('userid');
    vm.form = {
      tourName: tour.name,
      roomName: tour.room ? tour.room.name : '',
      transportMode: tour.transport ? tour.transport.mode : '',
      total: tour.total,
      userid: userid
    };
    vm.bookTour = function() {
      if (!vm.form.name || !vm.form.email || !vm.form.phone) {
        vm.errorMessage = 'All fields are required.';
        return;
      }
      $http.post('http://localhost:5000/api/bookedtours', vm.form)
        .then(function(res) {
          vm.successMessage = 'Tour booked successfully!';
          vm.errorMessage = '';
        })
        .catch(function() {
          vm.errorMessage = 'Booking failed. Try again.';
          vm.successMessage = '';
        });
    };
  });

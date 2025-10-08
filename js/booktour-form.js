// BookTourFormController for booktour-form.html
angular.module('travelApp')
  .controller('BookTourFormController', function($http, $window) {
    var vm = this;
    var tour = JSON.parse(localStorage.getItem('selectedTour')) || {};
    var userid = localStorage.getItem('userid');
    vm.form = {
      tourName: tour.tourName || tour.name,
      roomName: tour.roomName || (tour.room ? tour.room.name : ''),
      transportMode: tour.transportMode || (tour.transport ? tour.transport.mode : ''),
      total: tour.total,
      userid: userid
    };
    vm.bookTour = function() {
      if (!vm.form.name || !vm.form.email || !vm.form.phone) {
        vm.errorMessage = 'All fields are required.';
        vm.successMessage = '';
        return;
      }
      var emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      var phonePattern = /^\d{10}$/;
      if (!emailPattern.test(vm.form.email)) {
        vm.errorMessage = 'Enter a valid email address.';
        vm.successMessage = '';
        return;
      }
      if (!phonePattern.test(vm.form.phone)) {
        vm.errorMessage = 'Enter a valid 10-digit phone number.';
        vm.successMessage = '';
        return;
      }
      $http.post('http://localhost:5000/api/bookedtours', vm.form)
        .then(function(res) {
          vm.successMessage = 'Tour booked successfully! Redirecting...';
          vm.errorMessage = '';
          setTimeout(function() {
            $window.location.href = 'tourbook.html';
          }, 1200);
        })
        .catch(function() {
          vm.errorMessage = 'Booking failed. Try again.';
          vm.successMessage = '';
        });
    };
  });

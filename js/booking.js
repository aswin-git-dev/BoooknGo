// Booking Module - extends the main travelApp module

angular.module('travelApp')

  .controller('HotelController', function($http, AnimationService) {
    var vm = this;

    vm.bookings = [];
    vm.form = {};
    vm.editId = null;
    vm.successMessage = '';
    vm.errorMessage = '';

    // Fetch all bookings
    vm.loadBookings = function() {
      $http.get('http://localhost:5000/api/bookings')
        .then(function(res) {
          vm.bookings = res.data;
        });
    };
    vm.loadBookings();

    // Create or update booking
    vm.submitBooking = function() {
      if (vm.editId) {
        // Update
        $http.put('http://localhost:5000/api/bookings/' + vm.editId, vm.form)
          .then(function(res) {
            vm.successMessage = 'Booking updated!';
            vm.errorMessage = '';
            vm.form = {};
            vm.editId = null;
            vm.loadBookings();
          })
          .catch(function() {
            vm.errorMessage = 'Update failed.';
            vm.successMessage = '';
          });
      } else {
        // Create
        $http.post('http://localhost:5000/api/bookings', vm.form)
          .then(function(res) {
            vm.successMessage = 'Booking created!';
            vm.errorMessage = '';
            vm.form = {};
            vm.loadBookings();
          })
          .catch(function() {
            vm.errorMessage = 'Creation failed.';
            vm.successMessage = '';
          });
      }
    };

    // Edit booking
    vm.editBooking = function(b) {
      vm.form = angular.copy(b);
      vm.editId = b._id;
    };

    // Delete booking
    vm.deleteBooking = function(id) {
      if (confirm('Delete this booking?')) {
        $http.delete('http://localhost:5000/api/bookings/' + id)
          .then(function() {
            vm.successMessage = 'Booking deleted!';
            vm.errorMessage = '';
            vm.loadBookings();
          })
          .catch(function() {
            vm.errorMessage = 'Delete failed.';
            vm.successMessage = '';
          });
      }
    };
  })

  .directive('bookingCard', function() {
    return {
      restrict: 'E',
      scope: { data: '=', onEdit: '&', onDelete: '&' },
      template: `
        <div class="card h-100 shadow-sm mb-2 animate__animated animate__fadeInUp">
          <div class="card-body">
            <h5 class="card-title mb-2"><i class="bi bi-building-fill-check text-primary me-1"></i> {{ data.hotel || 'N/A' }}</h5>
            <ul class="list-unstyled mb-2">
              <li><i class="bi bi-person-circle text-secondary"></i> <strong>Name:</strong> {{ data.name || 'N/A' }}</li>
              <li><i class="bi bi-envelope-at text-secondary"></i> <strong>Email:</strong> {{ data.email || 'N/A' }}</li>
              <li><i class="bi bi-telephone text-secondary"></i> <strong>Phone:</strong> {{ data.phone || 'N/A' }}</li>
              <li><i class="bi bi-geo-alt text-secondary"></i> <strong>City:</strong> {{ data.city || 'N/A' }}</li>
              <li><i class="bi bi-calendar-event text-secondary"></i> <strong>Date:</strong> {{ data.date ? (data.date | date:'yyyy-MM-dd') : 'N/A' }}</li>
              <li ng-if="data.createdAt"><i class="bi bi-clock-history text-secondary"></i> <strong>Created:</strong> {{ data.createdAt | date:'yyyy-MM-dd HH:mm' }}</li>
            </ul>
            <div class="d-flex gap-2 mt-2">
              <button class="btn btn-sm btn-warning" ng-click="onEdit({b: data})"><i class="bi bi-pencil-square"></i> Edit</button>
              <button class="btn btn-sm btn-danger" ng-click="onDelete({id: data._id})"><i class="bi bi-trash"></i> Delete</button>
            </div>
          </div>
        </div>
      `
    };
  });

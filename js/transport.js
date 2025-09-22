// Transport Module - extends the main travelApp module

angular.module('travelApp')

  .controller('TransportController', function($http, AnimationService) {
    var vm = this;

    vm.search = { from: '', to: '' };
    vm.filterType = '';
    vm.transports = [];
    vm.form = {};
    vm.editId = null;
    vm.successMessage = '';
    vm.errorMessage = '';

    // Fetch all transports
    vm.loadTransports = function() {
      $http.get('http://localhost:5000/api/transports')
        .then(function(res) {
          vm.transports = res.data;
        });
    };
    vm.loadTransports();

    // Create transport booking
    vm.submitTransport = function() {
      if (vm.editId) {
        // Update
        $http.put('http://localhost:5000/api/transports/' + vm.editId, vm.form)
          .then(function(res) {
            vm.successMessage = 'Transport booking updated!';
            vm.errorMessage = '';
            vm.form = {};
            vm.editId = null;
            vm.loadTransports();
          })
          .catch(function() {
            vm.errorMessage = 'Update failed.';
            vm.successMessage = '';
          });
      } else {
        // Create
        $http.post('http://localhost:5000/api/transports', vm.form)
          .then(function(res) {
            vm.successMessage = 'Transport booking created!';
            vm.errorMessage = '';
            vm.form = {};
            vm.loadTransports();
          })
          .catch(function() {
            vm.errorMessage = 'Creation failed.';
            vm.successMessage = '';
          });
      }
    };

    // Edit transport booking
    vm.editTransport = function(t) {
      vm.form = angular.copy(t);
      vm.editId = t._id;
    };

    // Delete transport booking
    vm.deleteTransport = function(id) {
      if (confirm('Delete this transport booking?')) {
        $http.delete('http://localhost:5000/api/transports/' + id)
          .then(function() {
            vm.successMessage = 'Transport booking deleted!';
            vm.errorMessage = '';
            vm.loadTransports();
          })
          .catch(function() {
            vm.errorMessage = 'Delete failed.';
            vm.successMessage = '';
          });
      }
    };
  })

  .directive('transportCard', function() {
    return {
      restrict: 'E',
      scope: { data: '=', onEdit: '&', onDelete: '&' },
      template: `
        <div class="card h-100 shadow-sm mb-2">
          <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <p class="card-text mb-1"><strong>From:</strong> {{ data.from }}</p>
            <p class="card-text mb-1"><strong>To:</strong> {{ data.to }}</p>
            <p class="card-text mb-1"><strong>Time:</strong> {{ data.time }}</p>
            <p class="badge bg-info text-dark">{{ data.type | uppercase }}</p>
            <button class="btn btn-sm btn-warning me-2 mt-2" ng-click="onEdit({t: data})">Edit</button>
            <button class="btn btn-sm btn-danger mt-2" ng-click="onDelete({id: data._id})">Delete</button>
          </div>
        </div>
      `
    };
  });


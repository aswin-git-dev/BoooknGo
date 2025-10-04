// Transport Module - extends the main travelApp module

angular.module('travelApp')

  .controller('TransportController', function($http) {
    var vm = this;

    // Tab state for AngularJS navigation
    vm.activeTab = 'local';
    // Local transport mock data
    vm.localTransports = [
      { name: 'City Bus 101', src: 'Central', dest: 'North', mode: 'bus', price: 20 },
      { name: 'Metro Express', src: 'East', dest: 'West', mode: 'train', price: 35 },
      { name: 'Bus 202', src: 'South', dest: 'Central', mode: 'bus', price: 25 },
      { name: 'Rapid Train', src: 'North', dest: 'South', mode: 'train', price: 40 },
      { name: 'Mini Bus', src: 'West', dest: 'East', mode: 'bus', price: 18 }
    ];
    // Outskirt: city to city
    vm.outskirtTransports = [
      { name: 'Intercity Bus', src: 'Chennai', dest: 'Pondicherry', mode: 'bus', price: 150 },
      { name: 'Regional Train', src: 'Madurai', dest: 'Trichy', mode: 'train', price: 120 },
      { name: 'Express Bus', src: 'Coimbatore', dest: 'Salem', mode: 'bus', price: 170 },
      { name: 'Superfast Train', src: 'Erode', dest: 'Bangalore', mode: 'train', price: 200 }
    ];
    // Rental: scooty / two-wheeler / car rental with cost/hr
    vm.rentalTransports = [
      { name: 'Scooty', type: 'two-wheeler', price: 60 },
      { name: 'Bike', type: 'two-wheeler', price: 80 },
      { name: 'Sedan Car', type: 'car', price: 200 },
      { name: 'SUV Car', type: 'car', price: 300 },
      { name: 'Mini Van', type: 'van', price: 250 }
    ];
    vm.localFilter = { src: '', dest: '', mode: '' };
    vm.outskirtFilter = { src: '', dest: '', mode: '' };

    vm.search = { from: '', to: '' };
    vm.filterType = '';
    vm.transports = [];
    vm.form = {};
    vm.editId = null;
    vm.successMessage = '';
    vm.errorMessage = '';

    // Fetch all transports (for backend, not used in mock display)
    vm.loadTransports = function() {
      $http.get('http://localhost:5000/api/transports')
        .then(function(res) {
          vm.transports = res.data;
        });
    };
    // vm.loadTransports(); // Only needed for backend, not mock data

    // Create transport booking
    vm.submitTransport = function() {
      // Basic input validation
      if (!vm.form.name || !vm.form.type || !vm.form.from || !vm.form.to || !vm.form.time) {
        vm.errorMessage = 'All fields are required.';
        vm.successMessage = '';
        return;
      }
      // Simple time format check (e.g., HH:MM AM/PM)
      var timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?([AaPp][Mm])$/;
      if (!timeRegex.test(vm.form.time)) {
        vm.errorMessage = 'Invalid time format. Use HH:MM AM/PM.';
        vm.successMessage = '';
        return;
      }
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
          // Tab state for AngularJS navigation
          vm.activeTab = 'local';
          // Local transport mock data
            // Local: part of city to part of city
            vm.localTransports = [
              { name: 'City Bus 101', src: 'Central', dest: 'North', mode: 'bus', price: 20 },
              { name: 'Metro Express', src: 'East', dest: 'West', mode: 'train', price: 35 },
              { name: 'Bus 202', src: 'South', dest: 'Central', mode: 'bus', price: 25 },
              { name: 'Rapid Train', src: 'North', dest: 'South', mode: 'train', price: 40 },
              { name: 'Mini Bus', src: 'West', dest: 'East', mode: 'bus', price: 18 }
            ];
            // Outskirt: city to city
            vm.outskirtTransports = [
              { name: 'Intercity Bus', src: 'Chennai', dest: 'Pondicherry', mode: 'bus', price: 150 },
              { name: 'Regional Train', src: 'Madurai', dest: 'Trichy', mode: 'train', price: 120 },
              { name: 'Express Bus', src: 'Coimbatore', dest: 'Salem', mode: 'bus', price: 170 },
              { name: 'Superfast Train', src: 'Erode', dest: 'Bangalore', mode: 'train', price: 200 }
            ];
            // Rental: scooty / two-wheeler / car rental with cost/hr
            vm.rentalTransports = [
              { name: 'Scooty', type: 'two-wheeler', price: 60 },
              { name: 'Bike', type: 'two-wheeler', price: 80 },
              { name: 'Sedan Car', type: 'car', price: 200 },
              { name: 'SUV Car', type: 'car', price: 300 },
              { name: 'Mini Van', type: 'van', price: 250 }
            ];
            vm.localFilter = { src: '', dest: '', mode: '' };
            vm.outskirtFilter = { src: '', dest: '', mode: '' };

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


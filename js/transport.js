// Transport Module - extends the main travelApp module

angular.module('travelApp')

  .controller('TransportController', function($http) {
    var vm = this;

    // Tab state for AngularJS navigation
    vm.activeTab = 'local';
    // For modal booking
    vm.selectedType = '';
    vm.selectedItem = null;
    vm.bookingForm = {};

    // Local transport mock data (Madurai) with coordinates for mapping
    vm.localTransports = [
      // Buses
      { name: 'Madurai City Bus 1', src: 'Periyar', dest: 'Mattuthavani', mode: 'bus', price: 15, stops: [
        { name: 'Periyar', lat: 9.9177, lng: 78.1195 },
        { name: 'Anna Bus Stand', lat: 9.9195, lng: 78.1230 },
        { name: 'Palanganatham', lat: 9.9012, lng: 78.1221 },
        { name: 'Goripalayam', lat: 9.9302, lng: 78.1157 },
        { name: 'Tallakulam', lat: 9.9366, lng: 78.1350 },
        { name: 'Mattuthavani', lat: 9.9391, lng: 78.1217 }
      ] },
      { name: 'Mini Bus 2', src: 'Koodal Nagar', dest: 'Anna Nagar', mode: 'bus', price: 14, stops: [
        { name: 'Koodal Nagar', lat: 9.9123, lng: 78.1481 },
        { name: 'Goripalayam', lat: 9.9302, lng: 78.1157 },
        { name: 'Anna Nagar', lat: 9.9305, lng: 78.1417 },
        { name: 'Simmakkal', lat: 9.9272, lng: 78.1199 },
        { name: 'Yanaikkal', lat: 9.9300, lng: 78.1340 }
      ] },
      { name: 'City Bus 3', src: 'Palanganatham', dest: 'Tallakulam', mode: 'bus', price: 16, stops: [
        { name: 'Palanganatham', lat: 9.9012, lng: 78.1221 },
        { name: 'Periyar', lat: 9.9177, lng: 78.1195 },
        { name: 'Simmakkal', lat: 9.9272, lng: 78.1199 },
        { name: 'Goripalayam', lat: 9.9302, lng: 78.1157 },
        { name: 'Tallakulam', lat: 9.9366, lng: 78.1350 }
      ] },
      // Share Autos
      { name: 'Share Auto 1', src: 'Anna Nagar', dest: 'Goripalayam', mode: 'auto', price: 20, stops: [
        { name: 'Anna Nagar', lat: 9.9305, lng: 78.1417 },
        { name: 'Tallakulam', lat: 9.9366, lng: 78.1350 },
        { name: 'Yanaikkal', lat: 9.9300, lng: 78.1340 },
        { name: 'Goripalayam', lat: 9.9302, lng: 78.1157 }
      ] },
      { name: 'Share Auto 2', src: 'Mattuthavani', dest: 'Koodal Nagar', mode: 'auto', price: 18, stops: [
        { name: 'Mattuthavani', lat: 9.9391, lng: 78.1217 },
        { name: 'Anna Nagar', lat: 9.9305, lng: 78.1417 },
        { name: 'Koodal Nagar', lat: 9.9123, lng: 78.1481 }
      ] },
      { name: 'Share Auto 3', src: 'Periyar', dest: 'Yanaikkal', mode: 'auto', price: 15, stops: [
        { name: 'Periyar', lat: 9.9177, lng: 78.1195 },
        { name: 'Yanaikkal', lat: 9.9300, lng: 78.1340 }
      ] }
    ];
    // Outskirt: Madurai to other cities (bus/train only)
    vm.outskirtTransports = [
      { name: 'Madurai Express', src: 'Madurai', dest: 'Chennai', mode: 'bus', price: 550 },
      { name: 'Vaigai Superfast', src: 'Madurai', dest: 'Chennai', mode: 'train', price: 800 },
      { name: 'Madurai-Coimbatore Bus', src: 'Madurai', dest: 'Coimbatore', mode: 'bus', price: 400 },
      { name: 'Madurai-Trichy Train', src: 'Madurai', dest: 'Trichy', mode: 'train', price: 350 },
      { name: 'Madurai-Bangalore Bus', src: 'Madurai', dest: 'Bangalore', mode: 'bus', price: 900 },
      { name: 'Madurai-Hyderabad Train', src: 'Madurai', dest: 'Hyderabad', mode: 'train', price: 1200 }
    ];
    // Rental: only rental vehicles (no flights, no outskirt/local transport)
    vm.rentalTransports = [
      { name: 'Scooty', type: 'two-wheeler', price: 80 },
      { name: 'Bike', type: 'two-wheeler', price: 120 },
      { name: 'Sedan Car', type: 'car', price: 350 },
      { name: 'SUV Car', type: 'car', price: 500 },
      { name: 'Auto Rickshaw', type: 'auto', price: 60 }
    ];
    // Flights: Madurai to major Indian cities (flights tab only)
    vm.flights = [
      { airline: 'IndiGo', src: 'Madurai', dest: 'Chennai', departure: '09:00', arrival: '10:10', price: 2500 },
      { airline: 'Air India', src: 'Madurai', dest: 'Bangalore', departure: '13:00', arrival: '14:20', price: 3200 },
      { airline: 'SpiceJet', src: 'Madurai', dest: 'Hyderabad', departure: '16:00', arrival: '17:45', price: 4100 },
      { airline: 'IndiGo', src: 'Madurai', dest: 'Mumbai', departure: '18:00', arrival: '20:30', price: 5200 },
      { airline: 'Air India', src: 'Madurai', dest: 'Delhi', departure: '21:00', arrival: '23:45', price: 6700 }
    ];

    // Open booking modal for any type
    vm.openBookingModal = function(item, type) {
      // If called from outside, switch to the correct tab
      if (type && vm.activeTab !== type) {
        vm.activeTab = type;
      }
      vm.selectedType = type || 'transport';
      vm.selectedItem = item;
      // Pre-fill source/destination for flights, rental, etc.
      vm.bookingForm = {
        source: item.src || '',
        destination: item.dest || '',
        date: '',
        name: '',
        mobile: ''
      };
      setTimeout(function() {
        var modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        modal.show();
      }, 0);
    };

    // Utility: programmatically switch tab and open booking
    vm.navigateAndBook = function(item, type) {
      vm.activeTab = type;
      setTimeout(function() {
        vm.openBookingModal(item, type);
      }, 100);
    };

    // Confirm booking (submit form)
    vm.confirmBooking = function() {
      if (!vm.bookingForm.source || !vm.bookingForm.destination || !vm.bookingForm.date || !vm.bookingForm.name || !vm.bookingForm.mobile) {
        alert('Please fill all details.');
        return;
      }
      // Compose booking data
      var bookingData = {
        type: vm.selectedType,
        source: vm.bookingForm.source,
        destination: vm.bookingForm.destination,
        date: vm.bookingForm.date,
        name: vm.bookingForm.name,
        mobile: vm.bookingForm.mobile
      };
      if (vm.selectedType === 'flight' && vm.selectedItem) {
        bookingData.airline = vm.selectedItem.airline;
        bookingData.departure = vm.selectedItem.departure;
        bookingData.arrival = vm.selectedItem.arrival;
        bookingData.price = vm.selectedItem.price;
      } else if (vm.selectedType === 'rental' && vm.selectedItem) {
        bookingData.vehicle = vm.selectedItem.name;
        bookingData.price = vm.selectedItem.price;
      }
      // You can POST this to your backend if needed
      // $http.post('http://localhost:5000/api/transportbookings', bookingData)
      //   .then(function() {
      //     alert('Booking successful!');
      //     var modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
      //     modal.hide();
      //   })
      //   .catch(function() {
      //     alert('Booking failed. Try again.');
      //   });
      alert('Booking successful!\n' + JSON.stringify(bookingData, null, 2));
      var modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
      modal.hide();
    };
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

    // ...existing code...

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


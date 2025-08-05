// Transport Module - extends the main travelApp module
angular.module('travelApp')

  .controller('TransportController', function(TransportService, AnimationService) {
    var vm = this;

    vm.search = { from: '', to: '' };
    vm.filterType = '';
    vm.results = [];

    vm.findTransport = function() {
      vm.results = TransportService.search(vm.search.from, vm.search.to);
    };
  })

  .factory('TransportService', function() {
    const allData = [
      { name: "Zingbus Plus", type: "bus", from: "Delhi", to: "Jaipur", time: "08:00 AM - 12:00 PM" },
      { name: "Laxmi Holidays", type: "bus", from: "Delhi", to: "Agra", time: "09:30 AM - 01:30 PM" },
      { name: "Shatabdi Express", type: "train", from: "Delhi", to: "Agra", time: "07:00 AM - 09:00 AM" },
      { name: "Rajdhani Express", type: "train", from: "Delhi", to: "Mumbai", time: "04:00 PM - 09:00 AM" },
      { name: "Orange Travels", type: "bus", from: "Chennai", to: "Bangalore", time: "06:00 AM - 10:00 AM" }
    ];

    return {
      search: function(from, to) {
        return allData.filter(item =>
          (!from || item.from.toLowerCase().includes(from.toLowerCase())) &&
          (!to || item.to.toLowerCase().includes(to.toLowerCase()))
        );
      }
    };
  })

  .filter('typeFilter', function() {
    return function(data, type) {
      if (!type) return data;
      return data.filter(item => item.type === type);
    };
  })

  .directive('transportCard', function() {
    return {
      restrict: 'E',
      scope: { data: '=' },
      template: `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <p class="card-text mb-1"><strong>From:</strong> {{ data.from }}</p>
            <p class="card-text mb-1"><strong>To:</strong> {{ data.to }}</p>
            <p class="card-text mb-1"><strong>Time:</strong> {{ data.time }}</p>
            <p class="badge bg-info text-dark">{{ data.type | uppercase }}</p>
          </div>
        </div>
      `
    };
  });


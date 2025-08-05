// Booking Module - extends the main travelApp module
angular.module('travelApp')

  .controller('HotelController', function(HotelService, AnimationService) {
    var vm = this;
    
    vm.search = { city: '', date: '' };
    vm.starFilter = '';
    vm.hotels = [];

    vm.findHotels = function() {
      vm.hotels = HotelService.getHotels(vm.search.city);
    };
  })

  .factory('HotelService', function() {
    const hotels = [
      { name: "The Oberoi", city: "Agra", stars: 5, price: 8000 },
      { name: "Hotel Taj Inn", city: "Agra", stars: 3, price: 2500 },
      { name: "Trident", city: "Jaipur", stars: 4, price: 4000 },
      { name: "Rambagh Palace", city: "Jaipur", stars: 5, price: 12000 },
      { name: "Lords Inn", city: "Delhi", stars: 3, price: 2200 },
      { name: "ITC Grand", city: "Delhi", stars: 5, price: 9500 }
    ];

    return {
      getHotels: function(city) {
        return hotels.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
      }
    };
  })

  .filter('starFilter', function() {
    return function(hotels, selectedStar) {
      if (!selectedStar) return hotels;
      return hotels.filter(h => h.stars == selectedStar);
    };
  })

  .directive('hotelCard', function() {
    return {
      restrict: 'E',
      scope: { data: '=' },
      template: `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <p class="card-text mb-1"><strong>City:</strong> {{ data.city }}</p>
            <p class="card-text mb-1"><strong>Stars:</strong> {{ data.stars }}</p>
            <p class="card-text text-success"><strong>Price:</strong> ₹{{ data.price }}/night</p>
          </div>
        </div>
      `
    };
  });


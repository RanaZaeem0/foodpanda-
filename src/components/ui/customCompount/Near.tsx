import { getDistance } from "@/lib/lib";

const userLatitude = 24.8840192; // Replace with actual user's latitude
const userLongitude = 67.1350784; // Replace with actual user's longitude

// API response (example)
const restaurants = [
  {
    name: "Top Spice",
    latitude: 24.9131829,
    longitude: 67.1259437,
    rating: 4.9,
    review_number: 1918,
    address_line2: "",
  },
  {
    name: "Tandoori House",
    latitude: 24.865456,
    longitude: 67.020324,
    rating: 4.2,
    review_number: 300,
    address_line2: "",
  },
  // Add more restaurants...
];

// Filter and sort restaurants by distance
const nearbyRestaurants = restaurants
  .map((restaurant) => ({
    ...restaurant,
    distance: getDistance(
      userLatitude,
      userLongitude,
      restaurant.latitude,
      restaurant.longitude
    ),
  }))
  .filter((restaurant) => restaurant.distance <= 5) // Restaurants within 5 km
  .sort((a, b) => a.distance - b.distance); // Sort by distance

console.log(nearbyRestaurants);


function NearbyRestaurants() {
    return (
      <div>
        <h1>Nearby Restaurants</h1>
        <ul>
          {nearbyRestaurants.map((restaurant, index) => (
            <li key={index}>
              <h2>{restaurant.name}</h2>
              <p>Rating: {restaurant.rating} ⭐</p>
              <p>Reviews: {restaurant.review_number}</p>
              <p>Distance: {restaurant.distance.toFixed(2)} km</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default NearbyRestaurants;
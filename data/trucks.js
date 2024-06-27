// Function to fetch and parse CSV data
function fetchFoodTrucks() {
$.ajax({
  url: 'http://localhost:8000/Mobile_Food_Facility_Permit.csv',
  dataType: 'text',
  success: function(data) {
    const parsedData = Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        window.foodTrucks = results.data;
        console.log('Data fetched and parsed:', window.foodTrucks);
        displayTrucks();
      }
    });
  },
  error: function(error) {
    console.error('Error fetching CSV data:', error);
  }
});
}

// Filter and display trucks based on address and food item input
function displayTrucks() {
  const address = $('#addressInput').val().toLowerCase();
  const foodItem = $('#foodInput').val().toLowerCase();

  const filteredTrucks = window.foodTrucks.filter(truck => {
    const addressMatch = truck.Address && truck.Address.toLowerCase().includes(address);
    const foodMatch = truck.FoodItems && truck.FoodItems.toLowerCase().includes(foodItem);
    const statusMatch = truck.Status && truck.Status === 'APPROVED';
    return addressMatch && foodMatch && statusMatch;
  });

  const tbody = $('#foodTruckTable tbody');
  tbody.empty(); // Clear existing rows

  filteredTrucks.forEach(truck => {
    const row = `<tr>
                    <td>${truck.Applicant}</td>
                    <td>${truck.FoodItems}</td>
                    <td>${truck.Address}</td>
                  </tr>`;
    tbody.append(row);
  });
}

// Event listener for input changes
$('#addressInput, #foodInput').on('input', displayTrucks);

// Fetch food trucks data when the page loads
$(document).ready(function() {
  fetchFoodTrucks();
});
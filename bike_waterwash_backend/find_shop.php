<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find Bike Wash Shops</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #007bff;
        }
        p {
            color: #333;
            font-size: 16px;
        }
        a {
            color: #28a745;
            font-weight: bold;
        }
        .shop {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
        }
        .error {
            color: red;
            font-weight: bold;
        }
        .success {
            color: green;
            font-weight: bold;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<div class="container">
    <?php
    if (isset($_POST['username']) && isset($_POST['phone']) && isset($_POST['address'])) {
        $username = htmlspecialchars(trim($_POST['username']));
        $phone = htmlspecialchars(trim($_POST['phone']));
        $address = htmlspecialchars(trim($_POST['address']));

        echo "<h2>Customer Details</h2>";
        echo "<p><strong>Name:</strong> $username</p>";
        echo "<p><strong>Phone:</strong> $phone</p>";

        function fetch_data($url) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_USERAGENT, "BikeWashFinder/1.0 (your-email@example.com)");

            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                echo "<p class='error'>Error fetching data: " . curl_error($ch) . "</p>";
                curl_close($ch);
                return false;
            }
            curl_close($ch);
            return $response;
        }

        // Step 1: Get Latitude & Longitude from Address
        $geoUrl = "https://nominatim.openstreetmap.org/search?q=" . urlencode($address) . "&format=json&limit=1&addressdetails=1";
        $geoResponse = fetch_data($geoUrl);
        $geoData = json_decode($geoResponse, true);

        if (!empty($geoData) && isset($geoData[0]['lat']) && isset($geoData[0]['lon'])) {
            $latitude = $geoData[0]['lat'];
            $longitude = $geoData[0]['lon'];
            $full_address = $geoData[0]['display_name'];

            echo "<h2 class='success'>Location Found:</h2>";
            echo "<p><strong>$full_address</strong></p>";
            echo "<p>Latitude: $latitude, Longitude: $longitude</p>";

            // Step 2: Find Nearby Bike Wash Shops
            $overpassQuery = urlencode("[out:json];node[\"amenity\"=\"car_wash\"](around:5000, $latitude, $longitude);out;");
            $overpassUrl = "https://overpass-api.de/api/interpreter?data={$overpassQuery}";

            $placesResponse = fetch_data($overpassUrl);
            $placesData = json_decode($placesResponse, true);

            echo "<h2>Nearest Bike Wash Shops</h2>";
            if (!empty($placesData['elements'])) {
                foreach ($placesData['elements'] as $place) {
                    $name = isset($place['tags']['name']) ? $place['tags']['name'] : "Unnamed Bike Wash";
                    $shop_lat = $place['lat'];
                    $shop_lon = $place['lon'];

                    echo "<div class='shop'>";
                    echo "<p><strong style='color: #dc3545;'>$name</strong><br>";
                    echo "Location: <a href='https://www.google.com/maps?q=$shop_lat,$shop_lon' target='_blank'>View on Google Maps</a></p>";

                    echo "<form action='book.php' method='POST'>
                        <input type='hidden' name='shop_name' value='$name'>
                        <input type='hidden' name='shop_lat' value='$shop_lat'>
                        <input type='hidden' name='shop_lon' value='$shop_lon'>
                        <input type='hidden' name='customer_name' value='$username'>
                        <input type='hidden' name='customer_phone' value='$phone'>
                        <button type='submit'>Book Now</button>
                    </form>";

                    echo "</div>";
                }
            } else {
                echo "<p class='error'>No bike wash shops found nearby. Try a different location.</p>";
            }
        } else {
            echo "<p class='error'>Invalid address or no location found. Please enter a valid address.</p>";
        }
    } else {
        echo "<p class='error'>Invalid request. Please enter all required details.</p>";
    }
    ?>
</div>

</body>
</html>

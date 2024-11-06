<?php include('../src/assets/header.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Found Items Dashboard</title>
    <link rel="stylesheet" href="../src/css/webDesign.css"> <!-- Correct link to CSS file -->
</head>
<body>
    <div class="dashboard-container">
        <h1>Found Items Dashboard</h1>
        <div class="item-grid">
            <?php
            // Include the database connection file
            include('../src/php/db_connect.php');

            // Check if the connection was successful
            if ($conn) {
                $result = mysqli_query($conn, "SELECT * FROM item");

                while ($row = mysqli_fetch_assoc($result)) {
                    echo "
                    <div class='item-card'>
                        <img src='" . $row['Item_Image'] . "' alt='" . $row['Description'] . "' class='item-img'>
                        <div class='item-details'>
                            <h3>" . $row['Description'] . "</h3>
                            <p>Date: " . $row['Date'] . "</p>
                            <p>Location: " . $row['Location'] . "</p>
                            <button class='view-btn' data-id='" . $row['Item_ID'] . "'>View Details</button>
                        </div>
                    </div>
                    ";
                }
            } else {
                echo "<p>Database connection failed.</p>";
            }
            ?>
        </div>
    </div>

    <div id="modal" class="modal">
        <div class="modal-content">
            <span id="close-modal" class="close">&times;</span>
            <h2 id="modal-title"></h2>
            <div id="modal-body"></div>
        </div>
    </div>

    <?php include('../src/assets/footer.php'); ?>
</body>
</html>

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2024 at 05:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `found_item` (
  `item_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `date_found` date NOT NULL,
  `time_found` time NOT NULL,
  `location_found` varchar(255) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `status` enum('Unclaimed','Claimed','Resolved') DEFAULT 'Unclaimed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `item_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `found_item` (`item_id`, `user_id`, `title`, `description`, `date_found`, `time_found`, `location_found`, `category`, `status`, `created_at`, `updated_at`, `item_img`) VALUES
(1, 1, 'Blue Tumbler', 'A blue tumbler with a sticker on it', '2024-07-08', '12:05:00', 'Bunzel Canteen', 'Tumbler', 'Unclaimed', '2024-11-08 12:31:04', '2024-11-09 12:57:58', 'src/assets/user_uploads/Blue_Tumbler.png'),
(2, 2, 'Apple AirPods', 'White AirPods in a case', '2024-06-18', '13:05:00', 'Library', 'Electronics', 'Claimed', '2024-11-08 12:31:04', '2024-11-09 12:57:58', 'src/assets/user_uploads/Apple_AirPods.png'),
(3, 3, 'Black Wallet', 'A leather wallet with some cards', '2024-07-09', '14:10:00', 'Bus Stop', 'Wallet', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Black_Wallet.png'),
(4, 4, 'Red Notebook', 'Spiral notebook with notes', '2024-07-11', '09:15:00', 'Classroom B1', 'Stationery', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Red_Notebook.png'),
(5, 5, 'Water Bottle', 'Transparent plastic bottle', '2024-07-12', '11:00:00', 'Gym', 'Bottle', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/waterbottle.jpg'),
(6, 6, 'Laptop Charger', 'Dell laptop charger', '2024-07-13', '15:30:00', 'Computer Lab', 'Electronics', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/laptopcharger.jpg'),
(7, 7, 'Sunglasses', 'Black Ray-Ban sunglasses', '2024-07-15', '13:20:00', 'Cafeteria', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Sunglasses.png'),
(8, 8, 'Umbrella', 'Red umbrella with logo', '2024-07-17', '08:45:00', 'Library Entrance', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Umbrella.png'),
(9, 9, 'Calculator', 'Casio scientific calculator', '2024-07-18', '10:30:00', 'Exam Hall', 'Electronics', 'Resolved', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Calculator.png'),
(10, 10, 'Set of Keys', 'Three keys on a metal keychain', '2024-07-20', '16:10:00', 'Locker Room', 'Keys', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Set_of_Keys.png'),
(11, 11, 'Earphones', 'Wired earphones', '2024-07-21', '17:50:00', 'Library', 'Electronics', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Earphones.png'),
(12, 12, 'Textbook', 'Math textbook - Calculus 101', '2024-07-23', '12:25:00', 'Classroom A3', 'Books', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Textbook.png'),
(13, 13, 'Jacket', 'Blue hoodie', '2024-07-24', '13:15:00', 'Cafeteria', 'Clothing', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Jacket.png'),
(14, 14, 'Smartphone', 'Black iPhone with a cracked screen', '2024-07-26', '19:00:00', 'Lecture Hall', 'Electronics', 'Resolved', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Smartphone.png'),
(15, 15, 'Pencil Case', 'Black pencil case with markers', '2024-07-28', '11:30:00', 'Library', 'Stationery', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/pencilcase.jpg'),
(16, 16, 'Watch', 'Silver wristwatch', '2024-07-29', '14:00:00', 'Gym Locker', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Watch.png'),
(17, 17, 'Badge', 'ID badge with no name', '2024-07-30', '09:20:00', 'Library Desk', 'Identification', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/badge.jpg'),
(18, 18, 'Sketchbook', 'Large sketchbook', '2024-08-01', '15:45:00', 'Art Room', 'Books', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Sketchbook.png'),
(19, 19, 'Laptop', 'HP laptop in a black case', '2024-08-02', '16:50:00', 'Library', 'Electronics', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Laptop.png'),
(20, 20, 'Backpack', 'Black backpack with a laptop compartment', '2024-08-04', '08:30:00', 'Bus Station', 'Bags', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Backpack.png'),
(21, 21, 'Bike Helmet', 'White helmet', '2024-08-05', '17:30:00', 'Gym Entrance', 'Sports', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Bike_Helmet.png'),
(22, 22, 'Notebook', 'Physics notebook', '2024-08-06', '12:40:00', 'Classroom B2', 'Stationery', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/notebook.jpg'),
(23, 23, 'Camera', 'Canon DSLR camera', '2024-08-08', '10:15:00', 'Library', 'Electronics', 'Resolved', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Camera.png'),
(24, 24, 'Water Bottle', 'Green bottle with stickers', '2024-08-09', '18:15:00', 'Cafeteria', 'Bottle', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/waterbottle.jpg'),
(25, 25, 'Tablet', 'Samsung tablet with a cracked screen', '2024-08-11', '13:00:00', 'Classroom C3', 'Electronics', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Tablet.png'),
(26, 26, 'Gym Bag', 'Blue duffel bag', '2024-08-12', '08:20:00', 'Gym', 'Bags', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Gym_Bag.png'),
(27, 27, 'Notebook', 'Spiral notebook with blue cover', '2024-08-14', '09:00:00', 'Lecture Hall', 'Stationery', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/notebook.jpg'),
(28, 28, 'Calculator', 'TI-84 Plus calculator', '2024-08-15', '10:30:00', 'Exam Hall', 'Electronics', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Calculator.png'),
(29, 29, 'Laptop Charger', 'MacBook charger', '2024-08-17', '15:20:00', 'Library', 'Electronics', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/laptopcharger.jpg'),
(30, 30, 'Phone Charger', 'Android USB-C charger', '2024-08-18', '16:00:00', 'Cafeteria', 'Electronics', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Phone_Charger.png'),
(31, 31, 'Headphones', 'Over-ear Bluetooth headphones', '2024-08-20', '18:30:00', 'Gym', 'Electronics', 'Resolved', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Headphones.png'),
(32, 32, 'Cap', 'Red baseball cap', '2024-08-21', '11:10:00', 'Library', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Cap.png'),
(33, 33, 'Textbook', 'Biology textbook', '2024-08-23', '14:00:00', 'Classroom B3', 'Books', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Textbook.png'),
(34, 34, 'Bracelet', 'Silver bracelet', '2024-08-24', '13:45:00', 'Gym', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Bracelet.png'),
(35, 35, 'Umbrella', 'Black umbrella with a floral pattern', '2024-08-25', '09:30:00', 'Library Entrance', 'Accessories', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Umbrella.png'),
(36, 36, 'Jacket', 'Green rain jacket', '2024-08-27', '08:10:00', 'Cafeteria', 'Clothing', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Jacket.png'),
(37, 37, 'Keys', 'Bunch of keys with keychain', '2024-08-28', '12:25:00', 'Library', 'Keys', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Keys.png'),
(38, 38, 'Phone Case', 'Blue silicone phone case', '2024-08-30', '11:45:00', 'Lecture Hall', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Phone_Case.png'),
(39, 39, 'Laptop', 'Lenovo laptop in a gray case', '2024-09-01', '15:00:00', 'Library', 'Electronics', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Laptop.png'),
(40, 40, 'Gloves', 'Pair of black gloves', '2024-09-03', '10:20:00', 'Gym', 'Clothing', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 12:57:58', 'src/assets/user_uploads/Gloves.png'),
(41, 41, 'Thermos', 'Gray thermos with initials', '2024-09-04', '12:50:00', 'Cafeteria', 'Bottle', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/thermos.jpg'),
(42, 42, 'Purse', 'Small leather purse', '2024-09-05', '16:00:00', 'Library', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/purse.jpg'),
(43, 43, 'Laptop Charger', 'Asus laptop charger', '2024-09-07', '14:35:00', 'Library', 'Electronics', 'Claimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/laptopcharger.jpg'),
(44, 44, 'Pencil Case', 'Pink pencil case', '2024-09-09', '13:45:00', 'Library', 'Stationery', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/pencilcase.jpg'),
(45, 45, 'Bike Lock', 'Cable bike lock', '2024-09-11', '08:00:00', 'Gym', 'Accessories', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/bikelock.jpg'),
(46, 46, 'Socks', 'Pair of striped socks', '2024-09-13', '15:30:00', 'Gym Locker', 'Clothing', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/socks.jpg'),
(47, 47, 'Badge', 'Student ID badge', '2024-09-15', '10:00:00', 'Library Desk', 'Identification', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/badge.jpg'),
(48, 48, 'Phone', 'White Android phone with a pink case', '2024-09-16', '17:30:00', 'Library', 'Electronics', 'Resolved', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/phone.jpg'),
(49, 49, 'Notebook', 'Red notebook with college logo', '2024-09-18', '12:20:00', 'Lecture Hall', 'Stationery', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/notebook.jpg'),
(50, 50, 'Water Bottle', 'Blue water bottle with stickers', '2024-09-20', '11:15:00', 'Gym', 'Bottle', 'Unclaimed', '2024-11-09 07:27:31', '2024-11-09 13:07:28', 'src/assets/user_uploads/waterbottle.jpg');


CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `created_at`, `updated_at`) VALUES
(1, 'user1', 'hashed_password1', 'user1@example.com', '2024-11-08 12:30:57', '2024-11-08 12:30:57'),
(2, 'user2', 'hashed_password2', 'user2@example.com', '2024-11-08 12:30:57', '2024-11-08 12:30:57'),
(3, 'user3', 'hashed_password3', 'user3@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(4, 'user4', 'hashed_password4', 'user4@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(5, 'user5', 'hashed_password5', 'user5@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(6, 'user6', 'hashed_password6', 'user6@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(7, 'user7', 'hashed_password7', 'user7@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(8, 'user8', 'hashed_password8', 'user8@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(9, 'user9', 'hashed_password9', 'user9@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(10, 'user10', 'hashed_password10', 'user10@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(11, 'user11', 'hashed_password11', 'user11@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(12, 'user12', 'hashed_password12', 'user12@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(13, 'user13', 'hashed_password13', 'user13@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(14, 'user14', 'hashed_password14', 'user14@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(15, 'user15', 'hashed_password15', 'user15@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(16, 'user16', 'hashed_password16', 'user16@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(17, 'user17', 'hashed_password17', 'user17@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(18, 'user18', 'hashed_password18', 'user18@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(19, 'user19', 'hashed_password19', 'user19@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(20, 'user20', 'hashed_password20', 'user20@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(21, 'user21', 'hashed_password21', 'user21@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(22, 'user22', 'hashed_password22', 'user22@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(23, 'user23', 'hashed_password23', 'user23@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(24, 'user24', 'hashed_password24', 'user24@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(25, 'user25', 'hashed_password25', 'user25@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(26, 'user26', 'hashed_password26', 'user26@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(27, 'user27', 'hashed_password27', 'user27@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(28, 'user28', 'hashed_password28', 'user28@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(29, 'user29', 'hashed_password29', 'user29@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(30, 'user30', 'hashed_password30', 'user30@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(31, 'user31', 'hashed_password31', 'user31@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(32, 'user32', 'hashed_password32', 'user32@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(33, 'user33', 'hashed_password33', 'user33@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(34, 'user34', 'hashed_password34', 'user34@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(35, 'user35', 'hashed_password35', 'user35@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(36, 'user36', 'hashed_password36', 'user36@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(37, 'user37', 'hashed_password37', 'user37@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(38, 'user38', 'hashed_password38', 'user38@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(39, 'user39', 'hashed_password39', 'user39@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(40, 'user40', 'hashed_password40', 'user40@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(41, 'user41', 'hashed_password41', 'user41@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(42, 'user42', 'hashed_password42', 'user42@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(43, 'user43', 'hashed_password43', 'user43@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(44, 'user44', 'hashed_password44', 'user44@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(45, 'user45', 'hashed_password45', 'user45@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(46, 'user46', 'hashed_password46', 'user46@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(47, 'user47', 'hashed_password47', 'user47@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(48, 'user48', 'hashed_password48', 'user48@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(49, 'user49', 'hashed_password49', 'user49@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31'),
(50, 'user50', 'hashed_password50', 'user50@example.com', '2024-11-09 07:27:31', '2024-11-09 07:27:31');


ALTER TABLE `found_item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `user_id` (`user_id`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `found_item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;


ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;


ALTER TABLE `found_item`
  ADD CONSTRAINT `found_item_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;
COMMIT;



DROP DATABASE IF EXISTS lostbutfound;
CREATE DATABASE lostbutfound;


CREATE TABLE `claim_requests` (
  `request_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved') DEFAULT 'pending',
  `processed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `claim_requests` (`request_id`, `item_id`, `user_id`, `request_date`, `status`, `processed_by`) VALUES
(19, 47, 4, '2024-12-15 18:56:44', 'approved', 1),
(20, 50, 5, '2024-12-15 18:56:44', 'approved', 1),
(21, 49, 4, '2024-12-15 18:56:48', 'approved', 1),
(22, 48, 5, '2024-12-15 18:56:49', 'approved', 1),
(23, 46, 4, '2024-12-15 18:56:54', 'approved', 1),
(24, 45, 5, '2024-12-15 18:56:54', 'approved', 1),
(25, 44, 4, '2024-12-15 18:57:00', 'approved', 1),
(26, 43, 5, '2024-12-15 18:57:01', 'approved', 1),
(27, 42, 4, '2024-12-15 18:57:06', 'approved', 1),
(28, 41, 5, '2024-12-15 18:57:07', 'approved', 1),
(29, 40, 4, '2024-12-15 18:58:33', 'approved', 1),
(30, 39, 5, '2024-12-15 18:58:34', 'approved', 1),
(31, 38, 4, '2024-12-15 18:58:38', 'approved', 1),
(32, 37, 5, '2024-12-15 18:58:38', 'approved', 1),
(33, 36, 4, '2024-12-15 18:58:45', 'approved', 1),
(34, 35, 5, '2024-12-15 18:58:46', 'approved', 1),
(35, 33, 5, '2024-12-15 18:58:52', 'approved', 1),
(36, 34, 4, '2024-12-15 18:58:53', 'approved', 1),
(37, 31, 5, '2024-12-15 18:58:58', 'approved', 1),
(38, 32, 4, '2024-12-15 18:58:59', 'approved', 1),
(39, 30, 4, '2024-12-15 19:00:29', 'approved', 1),
(40, 29, 5, '2024-12-15 19:00:31', 'approved', 1),
(41, 28, 4, '2024-12-15 19:00:34', 'approved', 1),
(42, 27, 5, '2024-12-15 19:00:36', 'approved', 1),
(43, 26, 4, '2024-12-15 19:00:45', 'approved', 1);

CREATE TABLE `found_item` (
  `item_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `date_found` date NOT NULL,
  `time_found` time NOT NULL,
  `location_found` varchar(255) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `status` enum('Unclaimed','Claimed','Removed') DEFAULT 'Unclaimed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `item_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `found_item` (`item_id`, `user_id`, `title`, `description`, `date_found`, `time_found`, `location_found`, `category`, `status`, `created_at`, `updated_at`, `item_img`) VALUES
(1, 3, 'A blue tumbler with a Nirvana sticker', 'A blue tumbler with a sticker on it', '2024-07-08', '12:05:00', 'Bunzel Canteen', 'Tumblers', 'Unclaimed', '2024-11-08 04:31:04', '2024-12-15 19:21:21', 'src/assets/user_uploads/il_340x270.5228441392_ajuv.jpg'),
(2, 2, 'White Apple AirPods in sleek case', 'White AirPods in a case', '2024-06-18', '13:05:00', 'Library', 'Electronics', 'Unclaimed', '2024-11-08 04:31:04', '2024-12-15 19:21:27', 'src/assets/user_uploads/ULTRAIMPACTCASEFORAPPLEAIRPODS3_COLOR-MATTECHARCOAL_700x700.jpg'),
(3, 3, 'Black leather wallet with essential cards', 'A leather wallet with some cards', '2024-07-09', '14:10:00', 'Bus Stop', 'Wallets & Purses', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:21:11', 'src/assets/user_uploads/s_wp_6467d12cdbb0e7fc02a63344.jpg'),
(4, 2, 'Red spiral notebook with class notes', 'Spiral notebook with notes', '2024-07-11', '09:15:00', 'Classroom B1', 'Papers & Documents', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:20:59', 'src/assets/user_uploads/The-Art-of-War-by-Sun-Tzu-Book.jpg'),
(5, 3, 'Transparent gym water bottle', 'Transparent plastic bottle', '2024-07-12', '11:00:00', 'Gym', 'Tumblers', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 18:53:52', 'src/assets/user_uploads/waterbottle.jpg'),
(6, 2, 'Dell laptop charger with 3-pin plug', 'Dell laptop charger', '2024-07-13', '15:30:00', 'Computer Lab', 'Electronics', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 18:53:52', 'src/assets/user_uploads/laptopcharger.jpg'),
(7, 3, 'Ray-Ban sunglasses with black frame', 'Black Ray-Ban sunglasses', '2024-07-15', '13:20:00', 'Cafeteria', 'Accessories', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:18:56', 'src/assets/user_uploads/images (2).jpg'),
(8, 2, 'Red umbrella with university logo', 'Red umbrella with logo', '2024-07-17', '08:45:00', 'Library Entrance', 'Accessories', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:18:49', 'src/assets/user_uploads/red-umbrella-anime-in-rain.png'),
(9, 3, 'Casio FX-991ES scientific calculator', 'Casio scientific calculator', '2024-07-18', '10:30:00', 'Exam Hall', 'Electronics', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:17:18', 'src/assets/user_uploads/107265244_800x.jpg'),
(10, 2, 'Keychain with locker and home keys', 'Three keys on a metal keychain', '2024-07-20', '16:10:00', 'Locker Room', 'Keys', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:17:11', 'src/assets/user_uploads/51ZVu8yyBpL._AC_UF1000,1000_QL80_.jpg'),
(11, 3, 'White wired earphones with pristine sound', 'Wired earphones', '2024-07-21', '17:50:00', 'Library', 'Electronics', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:16:59', 'src/assets/user_uploads/Baseus-Encok-H17-3.5mm-lateral-in-Ear-Wired-Earphone-White-Pakistan.jpg'),
(12, 2, 'Calculus 101 textbook', 'Math textbook - Calculus 101', '2024-07-23', '12:25:00', 'Classroom A3', 'Others', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:16:50', 'src/assets/user_uploads/4846.jpg'),
(13, 3, 'Blue hoodie jacket for cool weather', 'Blue hoodie', '2024-07-24', '13:15:00', 'Cafeteria', 'Clothing', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:16:21', 'src/assets/user_uploads/images (1).jpg'),
(14, 2, 'Black iPhone with cracked screen', 'Black iPhone with a cracked screen', '2024-07-26', '19:00:00', 'Lecture Hall', 'Electronics', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:16:09', 'src/assets/user_uploads/images.jpg'),
(15, 3, 'Black pencil case filled with markers', 'Black pencil case with markers', '2024-07-28', '11:30:00', 'Library', 'Others', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 18:53:52', 'src/assets/user_uploads/pencilcase.jpg'),
(16, 2, 'Silver wristwatch with quartz mechanism', 'Silver wristwatch', '2024-07-29', '14:00:00', 'Gym Locker', 'Accessories', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:10:35', 'src/assets/user_uploads/5cuxcqi3fb091.jpg'),
(17, 3, 'ID badge with missing owner details', 'ID badge with no name', '2024-07-30', '09:20:00', 'Library Desk', 'IDs & Cards', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:21:47', 'src/assets/user_uploads/badge.jpg'),
(18, 2, 'Large sketchbook for creative drawing', 'Large sketchbook', '2024-08-01', '15:45:00', 'Art Room', 'Papers & Documents', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:10:27', 'src/assets/user_uploads/Journal-Sketchbook-Orra-Large-Portrait-Peg-And-Awl-01_960x960.jpg'),
(19, 3, 'HP laptop with black carrying case', 'HP laptop in a black case', '2024-08-02', '16:50:00', 'Library', 'Electronics', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:10:04', 'src/assets/user_uploads/7c653dcf-6c3e-47b1-9f28-b08bbf1d197e.jpg'),
(20, 2, 'Black backpack with laptop compartment', 'Black backpack with a laptop compartment', '2024-08-04', '08:30:00', 'Bus Station', 'Bags & Backpacks', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:09:54', 'src/assets/user_uploads/WBLBACKPACK01BLACK_1.jpg'),
(21, 3, 'White gym bike helmet for safety', 'White helmet', '2024-08-05', '17:30:00', 'Gym Entrance', 'Others', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:09:33', 'src/assets/user_uploads/CSKidsActiveHelmetWhite4_530x@2x.jpg'),
(22, 2, 'Physics notebook with key equations', 'Physics notebook', '2024-08-06', '12:40:00', 'Classroom B2', 'Papers & Documents', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:21:58', 'src/assets/user_uploads/notebook.jpg'),
(23, 3, 'Canon DSLR camera for photography', 'Canon DSLR camera', '2024-08-08', '10:15:00', 'Library', 'Electronics', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:08:49', 'src/assets/user_uploads/best-dslr-cameras-for-beginners-20230912-medium.jpg'),
(24, 2, 'Green water bottle with unique stickers', 'Green bottle with stickers', '2024-08-09', '18:15:00', 'Cafeteria', 'Tumblers', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:23:18', 'src/assets/user_uploads/hqdefault.jpg'),
(25, 3, 'Samsung tablet with cracked screen', 'Samsung tablet with a cracked screen', '2024-08-11', '13:00:00', 'Classroom C3', 'Mobile Devices', 'Unclaimed', '2024-11-08 23:27:31', '2024-12-15 19:08:34', 'src/assets/user_uploads/image.jpg'),
(26, 2, 'Blue duffel gym bag', 'Blue duffel bag', '2024-08-12', '08:20:00', 'Gym', 'Others', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 19:00:52', 'src/assets/user_uploads/Gym_Bag.png'),
(27, 3, 'Spiral notebook with blue cover', 'Spiral notebook with blue cover', '2024-08-14', '09:00:00', 'Lecture Hall', 'Stationery', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 19:00:55', 'src/assets/user_uploads/notebook.jpg'),
(28, 2, 'TI-84 Plus graphing calculator', 'TI-84 Plus calculator', '2024-08-15', '10:30:00', 'Exam Hall', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 19:00:58', 'src/assets/user_uploads/Calculator.png'),
(29, 3, 'MacBook charger with USB-C connector', 'MacBook charger', '2024-08-17', '15:20:00', 'Library', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 19:01:01', 'src/assets/user_uploads/laptopcharger.jpg'),
(30, 2, 'Android USB-C phone charger', 'Android USB-C charger', '2024-08-18', '16:00:00', 'Cafeteria', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 19:01:04', 'src/assets/user_uploads/Phone_Charger.png'),
(31, 3, 'Over-ear Bluetooth headphones', 'Over-ear Bluetooth headphones', '2024-08-20', '18:30:00', 'Gym', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:13', 'src/assets/user_uploads/Headphones.png'),
(32, 2, 'Red baseball cap with embroidered logo', 'Red baseball cap', '2024-08-21', '11:10:00', 'Library', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:09', 'src/assets/user_uploads/Cap.png'),
(33, 3, 'Biology 101 course textbook', 'Biology textbook', '2024-08-23', '14:00:00', 'Classroom B3', 'Others', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:19', 'src/assets/user_uploads/Textbook.png'),
(34, 2, 'Silver bracelet with intricate details', 'Silver bracelet', '2024-08-24', '13:45:00', 'Gym', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:16', 'src/assets/user_uploads/Bracelet.png'),
(35, 3, 'Black umbrella with floral pattern', 'Black umbrella with a floral pattern', '2024-08-25', '09:30:00', 'Library Entrance', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:22', 'src/assets/user_uploads/Umbrella.png'),
(36, 2, 'Green rain jacket for wet days', 'Green rain jacket', '2024-08-27', '08:10:00', 'Cafeteria', 'Clothing', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:37', 'src/assets/user_uploads/Jacket.png'),
(37, 3, 'Bunch of keys with decorative keychain', 'Bunch of keys with keychain', '2024-08-28', '12:25:00', 'Library', 'Keys', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:31', 'src/assets/user_uploads/Keys.png'),
(38, 2, 'Blue silicone phone case for protection', 'Blue silicone phone case', '2024-08-30', '11:45:00', 'Lecture Hall', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:34', 'src/assets/user_uploads/Phone_Case.png'),
(39, 3, 'Lenovo laptop with gray carrying bag', 'Lenovo laptop in a gray case', '2024-09-01', '15:00:00', 'Library', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:28', 'src/assets/user_uploads/Laptop.png'),
(40, 2, 'Pair of black winter gloves', 'Pair of black gloves', '2024-09-03', '10:20:00', 'Gym', 'Clothing', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:59:25', 'src/assets/user_uploads/Gloves.png'),
(41, 3, 'Gray thermos with engraved initials', 'Gray thermos with initials', '2024-09-04', '12:50:00', 'Cafeteria', 'Tumblers', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:36', 'src/assets/user_uploads/thermos.jpg'),
(42, 2, 'Small leather purse with zipper', 'Small leather purse', '2024-09-05', '16:00:00', 'Library', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:41', 'src/assets/user_uploads/purse.jpg'),
(43, 3, 'Asus laptop charger with black cord', 'Asus laptop charger', '2024-09-07', '14:35:00', 'Library', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:42', 'src/assets/user_uploads/laptopcharger.jpg'),
(44, 2, 'Pink pencil case with polka dots', 'Pink pencil case', '2024-09-09', '13:45:00', 'Library', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:45', 'src/assets/user_uploads/pencilcase.jpg'),
(45, 3, 'Cable bike lock for added security', 'Cable bike lock', '2024-09-11', '08:00:00', 'Gym', 'Accessories', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:53', 'src/assets/user_uploads/bikelock.jpg'),
(46, 2, 'Striped socks in bright colors', 'Pair of striped socks', '2024-09-13', '15:30:00', 'Gym Locker', 'Clothing', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:58:05', 'src/assets/user_uploads/socks.jpg'),
(47, 3, 'Patrick’s worker ID found near Talamban', 'Worker\'s ID idk he might be fired atp', '2024-09-21', '10:02:00', 'Talamban', 'Others', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:44', 'src/assets/user_uploads/badge.jpg'),
(48, 2, 'White Android phone with pink case', 'White Android phone with a pink case', '2024-09-16', '17:30:00', 'Library', 'Electronics', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:58:02', 'src/assets/user_uploads/phone.jpg'),
(49, 3, 'Red notebook with college logo', 'Red notebook with college logo', '2024-09-18', '12:20:00', 'Lecture Hall', 'Stationery', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:58', 'src/assets/user_uploads/notebook.jpg'),
(50, 2, 'Blue water bottle with stickers', 'Blue water bottle with stickers', '2024-09-20', '11:15:00', 'Gym', 'Tumblers', 'Claimed', '2024-11-08 23:27:31', '2024-12-15 18:57:49', 'src/assets/user_uploads/waterbottle.jpg');

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phone_number` varchar(15) NOT NULL,
  `role` enum('admin','student','staff') NOT NULL DEFAULT 'student',
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `yr_course` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`user_id`, `password`, `email`, `created_at`, `updated_at`, `phone_number`, `role`, `first_name`, `last_name`, `yr_course`) VALUES
(1, '$2y$10$QJ.OR6Ol0NzG.NqeZLThBO23sqdPtmsxsXkmweuunbuJ7d.gQAU2i', 'admin@gmail.com', '2024-12-14 08:07:15', '2024-12-15 18:06:58', '1234567891', 'admin', 'Rene', 'Requiestas', 'Bachelor of Arts in Comedy'),
(2, '$2y$10$2l9i5iEjzd6vLFNBIkEZBen3cucanvYbXzZUfx5zu7lW1QxwtDcyG', 'staff1@gmail.com', '2024-12-14 08:07:15', '2024-12-15 18:05:16', '09475638463', 'staff', 'Moon', 'Ito', 'BS IS 2'),
(3, '$2y$10$2l9i5iEjzd6vLFNBIkEZBen3cucanvYbXzZUfx5zu7lW1QxwtDcyG', 'staff2@gmail.com', '2024-12-14 08:07:15', '2024-12-15 18:05:49', '09384657384', 'staff', 'Edouard', 'Ybanez', 'BS CS 2'),
(4, '$2y$10$5nr/5T8ebWj9dpCTklq5meBVOOB0CiPa2wnwX9YzGuysjoXCs3jim', 'student1@gmail.com', '2024-12-14 08:07:15', '2024-12-15 18:03:25', '09983746573', 'student', 'Hestia', 'Tibon', 'BS CS 4'),
(5, '$2y$10$2l9i5iEjzd6vLFNBIkEZBen3cucanvYbXzZUfx5zu7lW1QxwtDcyG', 'student2@gmail.com', '2024-12-14 08:07:15', '2024-12-15 18:06:15', '09475836493', 'student', 'Raiken Lee', 'Ladrera', 'BS CE 2'),
(61, '$2y$10$nNrYleNHp/niJ/.8E.Wnxekusd.a5j7rEk28bNhI30sZfd7gBX89W', 'asdasd@gmail.com', '2024-12-14 14:22:23', '2024-12-14 14:22:23', '1234567891', 'student', 'asdasd', 'asdasda', NULL);

ALTER TABLE `claim_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `claim_requests_ibfk_1` (`item_id`),
  ADD KEY `claim_requests_ibfk_2` (`user_id`),
  ADD KEY `claim_requests_ibfk_3` (`processed_by`);

ALTER TABLE `found_item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `claim_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

ALTER TABLE `found_item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

ALTER TABLE `claim_requests`
  ADD CONSTRAINT `claim_requests_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `found_item` (`item_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `claim_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `claim_requests_ibfk_3` FOREIGN KEY (`processed_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

ALTER TABLE `found_item`
  ADD CONSTRAINT `found_item_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;
COMMIT;


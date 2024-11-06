-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2024 at 03:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lostandfound`
--

-- --------------------------------------------------------

--
-- Table structure for table `claims_request`
--

CREATE TABLE `claims_request` (
  `Claim_ID` int(11) NOT NULL,
  `USC_ID` int(11) DEFAULT NULL,
  `Item_ID` int(11) DEFAULT NULL,
  `Claim_Date` date NOT NULL,
  `Status` enum('Pending','Approved','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `claims_request`
--

INSERT INTO `claims_request` (`Claim_ID`, `USC_ID`, `Item_ID`, `Claim_Date`, `Status`) VALUES
(1, 21101042, 1, '2024-10-22', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Item_ID` int(11) NOT NULL,
  `Item_Image` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Item_ID`, `Item_Image`, `Date`, `Description`, `Location`) VALUES
(1, 'Image location', '2024-10-01', 'A blue aqua flask', 'Lost in LB486');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `USC_ID` int(11) NOT NULL,
  `FName` varchar(100) NOT NULL,
  `LName` varchar(100) NOT NULL,
  `Age` int(11) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` enum('admin','staff','user') NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`USC_ID`, `FName`, `LName`, `Age`, `Password`, `Role`, `Email`) VALUES
(101, 'Staff Profile', '', 0, 'staff', 'staff', ''),
(202, 'user profile', '', 0, 'user', 'user', ''),
(21101042, 'Edouard Ybanez', '', 0, 'password', 'admin', ''),
(21101043, 'java', 'test', 18, 'pass', 'staff', 'email'),
(21101044, 'another', 'javatest', 22, 'password', 'admin', 'email');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `claims_request`
--
ALTER TABLE `claims_request`
  ADD PRIMARY KEY (`Claim_ID`),
  ADD KEY `USC_ID` (`USC_ID`),
  ADD KEY `Item_ID` (`Item_ID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`Item_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`USC_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `claims_request`
--
ALTER TABLE `claims_request`
  MODIFY `Claim_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `Item_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21101045;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `claims_request`
--
ALTER TABLE `claims_request`
  ADD CONSTRAINT `claims_request_ibfk_1` FOREIGN KEY (`USC_ID`) REFERENCES `users` (`USC_ID`),
  ADD CONSTRAINT `claims_request_ibfk_2` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

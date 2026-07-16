-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2026 at 01:08 PM
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
-- Database: `language_island`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_progress`
--

CREATE TABLE `game_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `language_code` varchar(5) NOT NULL,
  `game_type` varchar(20) NOT NULL,
  `games_played` int(11) DEFAULT 0,
  `games_won` int(11) DEFAULT 0,
  `total_score` int(11) DEFAULT 0,
  `stars_earned` int(11) DEFAULT 0,
  `last_played` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_progress`
--

INSERT INTO `game_progress` (`id`, `user_id`, `language_code`, `game_type`, `games_played`, `games_won`, `total_score`, `stars_earned`, `last_played`) VALUES
(1, 3, 'en', 'memory', 7, 7, 39, 9, '2026-07-16 05:24:50'),
(4, 3, 'en', 'quiz', 1, 1, 6, 0, '2026-07-13 22:11:31'),
(6, 3, 'en', 'listen', 1, 1, 6, 0, '2026-07-13 22:15:12'),
(7, 3, 'ar', 'quiz', 1, 1, 6, 0, '2026-07-13 22:17:37'),
(8, 3, 'de', 'listen', 1, 1, 6, 0, '2026-07-13 22:19:15'),
(9, 3, 'fr', 'listen', 1, 1, 6, 0, '2026-07-13 22:22:10'),
(12, 3, 'fr', 'memory', 1, 1, 6, 0, '2026-07-14 09:39:09'),
(13, 1, 'en', 'memory', 2, 2, 12, 0, '2026-07-14 17:31:19'),
(15, 1, 'en', 'listen', 1, 1, 6, 6, '2026-07-15 16:27:11'),
(17, 7, 'en', 'memory', 1, 1, 6, 6, '2026-07-16 08:14:39'),
(18, 8, 'en', 'memory', 1, 1, 6, 6, '2026-07-16 10:27:05'),
(19, 8, 'en', 'quiz', 1, 1, 6, 6, '2026-07-16 10:27:23'),
(20, 8, 'en', 'listen', 1, 1, 6, 6, '2026-07-16 10:27:38'),
(21, 8, 'en', 'crush', 1, 1, 150, 150, '2026-07-16 10:27:49');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `language_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `level_number` int(11) NOT NULL,
  `lesson_title` varchar(100) NOT NULL,
  `is_quiz` tinyint(1) DEFAULT 0,
  `reward_amount` int(11) DEFAULT 20
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_items`
--

CREATE TABLE `shop_items` (
  `id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `item_type` varchar(50) NOT NULL,
  `category` varchar(50) DEFAULT 'themes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_items`
--

INSERT INTO `shop_items` (`id`, `item_name`, `price`, `item_type`, `category`) VALUES
(9, 'coloring_book', 150, 'printable', 'prints'),
(10, 'purple-theme', 300, 'theme', 'themes'),
(11, 'sudoku', 150, 'printable', 'prints'),
(12, 'nonogram', 150, 'printable', 'prints'),
(13, 'fantasy-book', 200, 'book', 'books'),
(14, 'doctor-catto', 150, 'skin', 'skins'),
(15, 'wizard-catto', 180, 'skin', 'skins'),
(16, 'pirate-catto', 150, 'skin', 'skins'),
(18, 'king-of-learning', 220, 'skin', 'skins'),
(19, 'astronaut-catto', 200, 'skin', 'skins'),
(20, 'chef-catto', 150, 'skin', 'skins'),
(21, 'artist-catto', 150, 'skin', 'skins'),
(22, 'ocean-explorer', 250, 'skin', 'skins'),
(43, 'night-theme', 300, 'theme', 'themes'),
(44, 'space-theme', 350, 'theme', 'themes'),
(45, 'boys-theme', 300, 'theme', 'themes'),
(46, 'catto-space', 200, 'book', 'books'),
(47, 'catto-fruits', 200, 'book', 'books'),
(48, 'catto-numbers', 200, 'book', 'books');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `coins` int(11) DEFAULT 0,
  `daily_streak` int(11) NOT NULL DEFAULT 0,
  `last_activity_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `equipped_skin` varchar(50) DEFAULT 'default-catto',
  `equipped_skin_id` int(11) DEFAULT NULL,
  `total_stars` int(11) DEFAULT 0,
  `equipped_theme` varchar(50) DEFAULT 'default'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `dob`, `gender`, `coins`, `daily_streak`, `last_activity_date`, `created_at`, `equipped_skin`, `equipped_skin_id`, `total_stars`, `equipped_theme`) VALUES
(1, 'Areej', 'Maher', 'areejmaher57@gmail.com', '$2y$10$1LDJA0nQJNjPd12AiYKZLeTRFOHTySSomxhhx8lzjCmjxwvtMeDsy', '2002-05-07', 'girl', 800, 0, NULL, '2026-07-11 15:47:13', 'chef-catto', NULL, 91, 'purple-theme'),
(2, 'Nour', 'Ahmed', 'nour@gmail.com', '$2y$10$etzSVVeY7.r90b72GapiZOmK7YgbSX51Zus97gaoAucQYZTl9mLMG', '2004-06-08', 'girl', 0, 0, NULL, '2026-07-12 19:20:31', 'default-catto', NULL, 0, 'default'),
(3, 'Yassminnnnnn', 'Ahmed', 'y.ahmed0y@gmail.com', '$2y$10$m9v0I9KmjDkWNj6CzNBChubnQy9AT18YNQRrnSjI0hyk20QNfy9Ay', '2005-09-23', 'girl', 510, 0, NULL, '2026-07-13 20:58:38', 'artist-catto', NULL, 101, 'default'),
(4, 'Mayar', 'Khaled', 'mayar@gmail.com', '$2y$10$SwMRj/XmAGBAiRtliKe9VeKccY/bOzEKutHLonvF8/n8kDBoCTHVK', '2009-03-08', 'girl', 0, 0, NULL, '2026-07-14 00:54:10', 'default-catto', NULL, 0, 'default'),
(5, 'marioo', 'sameh', 'mariosameh118@gmail.com', '$2y$10$wWpkCs5118uOgkh.9XEOZuSlnCUV9aAqO50dsVif80V5vIEE.YWMO', '2012-02-02', 'boy', 0, 0, NULL, '2026-07-15 00:38:18', 'artist-catto', NULL, 0, 'night-theme'),
(6, 'Shaimaa', 'Mohamed', 'sh@gmail.com', '$2y$10$reMa0WDfkgQwBoeAibuAkOs.LOTEGrdS9GEk5HvpDT7PCMqcwD1Vm', '2007-07-07', 'girl', 0, 0, NULL, '2026-07-15 13:17:40', 'default-catto', NULL, 0, 'default'),
(7, 'mohamed', 'Ahmed', 'mo@gmail.com', '$2y$10$89MAjW.Wj2WtDLNgpcdx/.s3eLHNFwru2.OeOTG5EU6LJzzEgDKl6', '2003-02-06', 'boy', 300, 0, NULL, '2026-07-16 06:30:22', 'default-catto', NULL, 41, 'default'),
(8, 'Eng.Marwa', 'Ahmed', 'marwa@gmail.com', '$2y$10$3qqw7HfFXbPmFzxMQyMLnOheBOGgecgeY33IyigtCVEMUONXqSj.W', '2000-05-05', 'girl', 800, 0, NULL, '2026-07-16 08:46:50', 'wizard-catto', NULL, 173, 'boys-theme');

-- --------------------------------------------------------

--
-- Table structure for table `user_activities`
--

CREATE TABLE `user_activities` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_type` varchar(50) NOT NULL,
  `activity_id` varchar(100) NOT NULL,
  `stars_earned` int(11) DEFAULT 5,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_activities`
--

INSERT INTO `user_activities` (`id`, `user_id`, `activity_type`, `activity_id`, `stars_earned`, `completed_at`) VALUES
(1, 3, 'book', 'en_zaza_goes_fishing_en', 5, '2026-07-14 03:56:20'),
(2, 3, 'book', 'en_alphabet_adventure_en_1784001764792', 5, '2026-07-14 04:02:44'),
(3, 3, 'book', 'en_alphabet_adventure_en_1784002196120', 5, '2026-07-14 04:09:56'),
(4, 3, 'book', 'en_alphabet_adventure_en_1784002391248', 5, '2026-07-14 04:13:11'),
(5, 3, 'listening', 'listening_en_1784004911871', 5, '2026-07-14 04:55:11'),
(6, 3, 'listening', 'listening_en_1784005222026', 5, '2026-07-14 05:00:22'),
(7, 3, 'book', 'en_alphabet_adventure_en_1784005691369', 5, '2026-07-14 05:08:11'),
(8, 3, 'listening', 'listening_en_1784007828863', 5, '2026-07-14 05:43:48'),
(9, 3, 'listening', 'listening_ar_1784007874603', 5, '2026-07-14 05:44:34'),
(10, 3, 'video', 'video_es_alphabets_Letra C_1784012936438', 5, '2026-07-14 07:08:56'),
(11, 3, 'video', 'video_es_alphabets_Letra A_1784013096789', 5, '2026-07-14 07:11:36'),
(12, 3, 'video', 'video_en_alphabets_Letter C_1784013814187', 5, '2026-07-14 07:23:34'),
(13, 3, 'video', 'video_en_alphabets_Letter A_1784013837068', 5, '2026-07-14 07:23:57'),
(14, 3, 'book', 'en_alphabet_adventure_en_1784021976197', 5, '2026-07-14 09:39:36'),
(15, 3, 'video', 'video_en_alphabets_Letter B_1784022066008', 5, '2026-07-14 09:41:06'),
(16, 1, 'book', 'en_alphabet_adventure_en_1784039186910', 5, '2026-07-14 14:26:26'),
(17, 1, 'book', 'en_alphabet_adventure_en_1784050300447', 5, '2026-07-14 17:31:40'),
(18, 1, 'video', 'video_en_alphabets_Letter A_1784050333200', 5, '2026-07-14 17:32:13'),
(19, 3, 'book', 'en_alphabet_adventure_en_1784075272336', 5, '2026-07-15 00:27:52'),
(20, 3, 'book', 'en_my_family_en_1784087274211', 5, '2026-07-15 03:47:54'),
(21, 3, 'book', 'en_my_family_en_1784087280711', 5, '2026-07-15 03:48:00'),
(22, 1, 'book', 'en_alphabet_adventure_en_1784132908804', 5, '2026-07-15 16:28:28'),
(23, 1, 'listening', 'listening_en_1784132937554', 5, '2026-07-15 16:28:57'),
(24, 1, 'video', 'video_en_alphabets_Letter B_1784133056032', 5, '2026-07-15 16:30:56'),
(25, 1, 'video', 'video_en_alphabets_Letter A_1784133402507', 5, '2026-07-15 16:36:42'),
(26, 1, 'video', 'video_en_alphabets_Letter A_1784133426150', 5, '2026-07-15 16:37:06'),
(27, 1, 'video', 'video_en_alphabets_Letter A_1784133696841', 5, '2026-07-15 16:41:36'),
(28, 1, 'video', 'video_en_alphabets_Letter A_1784133750866', 5, '2026-07-15 16:42:30'),
(29, 1, 'video', 'video_en_alphabets_Letter A_1784134011913', 5, '2026-07-15 16:46:51'),
(30, 1, 'video', 'video_en_alphabets_Letter A_1784134481387', 5, '2026-07-15 16:54:41'),
(31, 1, 'video', 'video_en_alphabets_Letter A_1784134522190', 5, '2026-07-15 16:55:22'),
(32, 1, 'video', 'video_en_alphabets_Letter A_1784151845973', 5, '2026-07-15 21:44:06'),
(33, 1, 'video', 'video_en_alphabets_Letter A_1784152137783', 5, '2026-07-15 21:48:57'),
(34, 1, 'video', 'video_en_alphabets_Letter A_1784152162468', 5, '2026-07-15 21:49:22'),
(35, 7, 'book', 'en_alphabet_adventure_en_1784183569078', 5, '2026-07-16 06:32:49'),
(36, 7, 'video', 'video_en_alphabets_Letter A_1784183654246', 5, '2026-07-16 06:34:14'),
(37, 7, 'video', 'video_ar_alphabets_حرف أ_1784183707120', 5, '2026-07-16 06:35:07'),
(38, 7, 'listening', 'listening_en_1784185735491', 5, '2026-07-16 07:08:55'),
(39, 7, 'listening', 'listening_en_1784189253026', 5, '2026-07-16 08:07:33'),
(40, 7, 'listening', 'listening_ar_1784189587840', 5, '2026-07-16 08:13:07'),
(41, 7, 'listening', 'listening_en_1784189622867', 5, '2026-07-16 08:13:42'),
(42, 8, 'video', 'video_en_alphabets_Letter A_1784197583883', 5, '2026-07-16 10:26:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_inventory`
--

CREATE TABLE `user_inventory` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `purchased_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_equipped` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_inventory`
--

INSERT INTO `user_inventory` (`id`, `user_id`, `item_id`, `purchased_at`, `is_equipped`) VALUES
(2, 1, 14, '2026-07-12 21:39:17', 0),
(3, 1, 15, '2026-07-13 16:51:49', 0),
(4, 1, 10, '2026-07-13 17:12:41', 0),
(7, 1, 11, '2026-07-13 19:24:55', 0),
(8, 1, 9, '2026-07-13 19:25:17', 0),
(9, 3, 15, '2026-07-13 22:59:39', 0),
(10, 3, 21, '2026-07-14 01:16:05', 1),
(11, 3, 18, '2026-07-14 02:06:19', 0),
(12, 3, 19, '2026-07-14 09:42:32', 0),
(13, 1, 19, '2026-07-14 14:56:38', 0),
(14, 1, 20, '2026-07-14 16:08:47', 1),
(15, 5, 10, '2026-07-15 00:42:49', 0),
(16, 5, 21, '2026-07-15 01:02:29', 1),
(17, 5, 44, '2026-07-15 01:29:54', 0),
(18, 5, 43, '2026-07-15 01:37:16', 0),
(19, 5, 13, '2026-07-15 01:46:56', 0),
(20, 5, 45, '2026-07-15 02:09:28', 0),
(21, 3, 13, '2026-07-15 02:23:44', 0),
(22, 3, 9, '2026-07-15 02:29:33', 0),
(23, 3, 12, '2026-07-15 02:58:33', 0),
(24, 3, 47, '2026-07-15 03:22:32', 0),
(25, 1, 21, '2026-07-15 15:51:01', 0),
(26, 1, 43, '2026-07-15 20:27:02', 0),
(27, 1, 45, '2026-07-15 20:27:04', 0),
(28, 1, 44, '2026-07-15 21:10:25', 0),
(29, 7, 13, '2026-07-16 08:40:07', 0),
(30, 1, 13, '2026-07-16 08:44:36', 0),
(31, 8, 15, '2026-07-16 10:29:14', 1),
(32, 8, 19, '2026-07-16 10:29:16', 0),
(33, 8, 18, '2026-07-16 10:29:18', 0),
(34, 8, 9, '2026-07-16 10:29:21', 0),
(35, 8, 13, '2026-07-16 10:29:24', 0),
(36, 8, 10, '2026-07-16 10:29:27', 0),
(37, 8, 43, '2026-07-16 10:29:29', 0),
(38, 8, 44, '2026-07-16 10:29:30', 0),
(39, 8, 45, '2026-07-16 10:29:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `score` int(11) DEFAULT 0,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_progress`
--
ALTER TABLE `game_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_progress` (`user_id`,`language_code`,`game_type`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_id` (`language_id`);

--
-- Indexes for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_equipped_skin` (`equipped_skin_id`);

--
-- Indexes for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_activity` (`user_id`,`activity_type`,`activity_id`);

--
-- Indexes for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_progress`
--
ALTER TABLE `game_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_activities`
--
ALTER TABLE `user_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user_inventory`
--
ALTER TABLE `user_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_progress`
--
ALTER TABLE `game_progress`
  ADD CONSTRAINT `game_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_equipped_skin` FOREIGN KEY (`equipped_skin_id`) REFERENCES `shop_items` (`id`);

--
-- Constraints for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD CONSTRAINT `user_activities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD CONSTRAINT `user_inventory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_inventory_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `shop_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2023 at 10:01 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_gmao`
--

-- --------------------------------------------------------

--
-- Table structure for table `activite`
--

CREATE TABLE `activite` (
  `id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `dure` double DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `technicien_id` int(11) DEFAULT NULL,
  `tache_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activite`
--

INSERT INTO `activite` (`id`, `description`, `date`, `dure`, `etat_id`, `technicien_id`, `tache_id`) VALUES
(9, 'Description Description Description Description Description Description Description Description Desc', '0000-00-00', 10, 1, 1, 35),
(10, 'Description Description Description Description Description Description Description Description Desc', '0000-00-00', 10, 3, 7, 35),
(11, 'Description Description Description Description Description Description Description Description Desc', '0000-00-00', 10, 2, 3, 35),
(12, 'Description Description Description Description Description Description Description Description Desc', '0000-00-00', 10, 4, 1, 35),
(13, 'Description Description Description Description Description Description Description Description Desc', '0000-00-00', 10, 1, 7, 36),
(14, 'Description Description Description Description Description Description Description Description Desc', '0000-00-00', 10, 3, 3, 36),
(15, 'ffggfhg hgjhg gjgjg gjgjgj gjgjgj g jghjg', '0000-00-00', 10, 1, 1, 37),
(16, 'hg hghg jhgjgh jjghjghj hgjgh jgh jgh jghjg ghj h jgj gh jghj', '0000-00-00', 10, 4, 15, 35),
(17, 'new activity for this equipment', '0000-00-00', 10, 4, 3, 42),
(18, 'Planned Planned Planned Planned Planned Planned', '0000-00-00', 10, 4, 1, 44),
(19, 'gdf ffd  h hf', '0000-00-00', 10, 3, 3, 48),
(20, 'fthfgh hfgfh  fg f  j   jhg ', '0000-00-00', 10, 4, 16, 48),
(21, 'hgjgh jghj gjj hgjgj ghj', '0000-00-00', 10, 1, 7, 51);

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `categorie` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id`, `categorie`) VALUES
(1, 'machaine'),
(2, 'mechanique');

-- --------------------------------------------------------

--
-- Table structure for table `equipement`
--

CREATE TABLE `equipement` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `marque` varchar(100) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `piecedeRechange` tinyint(1) DEFAULT NULL,
  `document` varchar(100) DEFAULT NULL,
  `equip_image` varchar(255) NOT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipement`
--

INSERT INTO `equipement` (`id`, `nom`, `description`, `dateDebut`, `prix`, `marque`, `reference`, `piecedeRechange`, `document`, `equip_image`, `categorie_id`, `service_id`) VALUES
(89, '33503-img-t', '', '2023-01-16', 5200, 'Compressor', '6.1981.1 - 619811', 0, '', '33503-img-t.jpg', 1, NULL),
(109, '43681-inside-NXE3400-waferstage-during-exposure', '', '2023-01-16', 140, 'ghg', 'mù', 0, 'ggh', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, NULL),
(111, '43681-inside-NXE3400-waferstage-during-exposure', '', '2023-01-16', 1450, 'KAESER', 'Compressor KAESER', 0, 'C:fakepath	âches (1).pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, NULL),
(113, 'CS805183 - New Industrial machine offering page - UL.com-2400x1600', '', '2023-01-16', 45200, 'KAESER', '6.1981.1 - 619811', 0, 'tâches.pdf', 'CS805183 - New Industrial machine offering page - UL.com-2400x1600.png', 2, NULL),
(115, 'custom_machine_building_2d3a1d6c4660e39955aecb97f54c9b2c', '', '2023-01-16', 65200, 'Compressor', '6.1981.1 - 619811', 0, 'tâches 2.pdf', 'custom_machine_building_2d3a1d6c4660e39955aecb97f54c9b2c.jpg', 1, NULL),
(117, 'Robotics-Production-Line-Belden-2020-07', '', '2023-01-16', 652100, 'Compressor', '6.1981.1 - 619811', 0, 'tâches 3.pdf', 'Robotics-Production-Line-Belden-2020-07.jpg', 2, NULL),
(119, 'waterjetcutting_en_co_rs_w738_h415_image', '', '2023-01-16', 452100, 'KAESER', 'Compressor KAESER', 0, 'tâches 4.pdf', 'waterjetcutting_en_co_rs_w738_h415_image.jpg', 1, NULL),
(121, 'Tebunus-Eigen-werkplaats', '', '2023-01-16', 4519, 'ghg', 'Compressor KAESER', 0, 'tâches 5.pdf', 'Tebunus-Eigen-werkplaats.jpg', 1, NULL),
(123, 'BP73311-1920x1278', '', '2023-01-16', 45199, 'Compressor', '6.1981.1 - 619811', 0, 'tâches 5.pdf', 'BP73311-1920x1278.jpg', 1, NULL),
(125, 'wasteboard_4-1', '', '2023-01-17', 52100, 'Compressor', '10', 0, 'tâches 8.pdf', 'wasteboard_4-1.jpg', 1, NULL),
(137, '-S1200-FWEBP', '', '2023-01-18', 14520, 'Compressor', 'Compressor KAESER', 0, 'techniciens.pdf', '-S1200-FWEBP.png', 1, NULL),
(142, 'BP73311-1920x1278', '', '2023-01-18', 145199, 'Compressor', '6.1981.1 - 619811', 0, 'techniciens.pdf', 'BP73311-1920x1278.jpg', 2, 5),
(145, 'Construction-3D-printers-aspect-ratio-420-216-1', '', '2023-01-18', 45200, 'Compressor', '6.1981.1 - 619811', 0, 'techniciens.pdf', 'Construction-3D-printers-aspect-ratio-420-216-1.jpg', 1, 1),
(146, '43681-inside-NXE3400-waferstage-during-exposure', '', '2023-01-18', 1450, 'KAESER', '6.1981.1 - 619811', 0, 'techniciens.pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, 1),
(148, '43681-inside-NXE3400-waferstage-during-exposure 43681-inside-NXE3400-waferstage-during-exposure', 'gfgfg gfhghghfgh ', '2023-01-18', 1449, 'ghg', '6.1981.1 - 619811', 0, 'techniciens.pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, 4),
(150, 'CS805183 - New Industrial machine offering page - UL.com-2400x1600', '', '2023-01-18', 45800, 'Compressor', '6.1981.1 - 619811', 0, 'techniciens.pdf', 'CS805183 - New Industrial machine offering page - UL.com-2400x1600.png', 1, 1),
(152, 'Robotics-Production-Line-Belden-2020-07', '', '2023-01-18', 8521, 'Compressor', '6.1981.1 - 619811', 0, 'techniciens.pdf', 'Robotics-Production-Line-Belden-2020-07.jpg', 1, 4),
(154, '43681-inside-NXE3400-waferstage-during-exposure 43681-inside-NXE3400-waferstage-during-exposure 4368', '', '2023-01-18', 7856, 'Compressor', '6.1981.1 - 619811', 0, 'tâches (1).pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, 4),
(156, '43681-inside-NXE3400-waferstage-during-exposure', '', '2023-01-18', 68538, 'Compressor', '6.1981.1 - 619811', 0, 'techniciens.pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, 3),
(158, 'Terry', '', '2023-01-18', 7853, 'Compressor', '6.1981.1 - 619811', 0, 'techniciens.pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, 4),
(160, '43681-inside-NXE3400-waferstage-during-exposure', '', '2023-01-18', 68500, 'KAESER', '6.1981.1 - 619811', 0, 'techniciens.pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 2, 4),
(162, '43681-inside-NXE3400-waferstage-during-exposure', '43681-inside-NXE3400-waferstage-during-exposure', '2023-01-18', 6500, 'Compressor', 'Compressor KAESER', 0, 'techniciens.pdf', '43681-inside-NXE3400-waferstage-during-exposure.jpg', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `etablissement`
--

CREATE TABLE `etablissement` (
  `id` int(11) NOT NULL,
  `raisonSocial` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `tel` varchar(100) DEFAULT NULL,
  `responsable` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `etablissement`
--

INSERT INTO `etablissement` (`id`, `raisonSocial`, `adresse`, `tel`, `responsable`) VALUES
(1, 'CHU', 'RUE 45 OIHSDF KJSHFIUSDHIA', '05874485488', 'oussama@gmail.com'),
(2, 'reret', 'reter', 'reter', 'reret'),
(3, 'drgdf', 'dfd', '0674091473', 'choussama816@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `etat`
--

CREATE TABLE `etat` (
  `id` int(11) NOT NULL,
  `etat` varchar(100) DEFAULT NULL,
  `couleur` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `etat`
--

INSERT INTO `etat` (`id`, `etat`, `couleur`) VALUES
(1, 'En retard', 'red'),
(2, 'Terminée', 'green'),
(3, 'En cours', 'purple'),
(4, 'En retard et commencé', 'orange');

-- --------------------------------------------------------

--
-- Table structure for table `pieceactivite`
--

CREATE TABLE `pieceactivite` (
  `id` int(11) NOT NULL,
  `activite_id` int(11) DEFAULT NULL,
  `equipement_id` int(11) DEFAULT NULL,
  `qte` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `nomService` varchar(100) DEFAULT NULL,
  `etablissement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `nomService`, `etablissement_id`) VALUES
(1, 'Service 1', 1),
(2, 'Service 2', 1),
(3, 'Service 3', 1),
(4, 'Service 4', 1),
(5, 'Service 5', 1);

-- --------------------------------------------------------

--
-- Table structure for table `specialite`
--

CREATE TABLE `specialite` (
  `id` int(11) NOT NULL,
  `specialite` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `specialite`
--

INSERT INTO `specialite` (`id`, `specialite`) VALUES
(1, 'Mécanique'),
(2, 'Informaticién'),
(3, 'Elécrtique');

-- --------------------------------------------------------

--
-- Table structure for table `tache`
--

CREATE TABLE `tache` (
  `id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `dure` double DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `equipement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tache`
--

INSERT INTO `tache` (`id`, `description`, `date`, `dure`, `etat_id`, `equipement_id`) VALUES
(35, 'Description Description Description Description Description Description Description Description Desc', '2023-01-16', 10, 3, 113),
(36, 'Tache here', '2023-01-16', 10, 1, 117),
(37, 'ffggfhg hgjhg gjgjg gjgjgj gjgjgj g jghjg', '2023-01-17', 10, 1, 113),
(39, 'Tache very important Tache very important Tache very important Tache very important Tache very impor', '2023-01-17', 10, 1, 117),
(42, 'Task for this equipment', '2023-01-18', 10, 4, 137),
(43, 'Construction-3D-printers-aspect-ratio-420-216-1 Construction-3D-printers-aspect-ratio-420-216-1', '2023-01-18', 10, 4, 145),
(44, 'Construction-3D-printers-aspect-ratio-420-216-1 Construction-3D-printers-aspect-ratio-420-216-1', '2023-01-18', 10, 4, 145),
(45, '1s infinite alternate identifier  1s infinite alternate identifier  v', '2023-01-18', 10, 1, 113),
(48, 'fhghhg ghj jj', '2023-01-18', 10, 1, 109),
(49, 'fghfh hfg fgjgf fg jf jj j fjfjghj', '2023-01-18', 10, 1, 113),
(50, 'fdhgdfdg hggfgf jhgjhg jjfjff jj', '2023-01-18', 10, 1, 111),
(51, 'ghg jgj gjghj  jjgh jgghjg', '2023-01-18', 10, 3, 123);

-- --------------------------------------------------------

--
-- Table structure for table `technicien`
--

CREATE TABLE `technicien` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tel` varchar(100) DEFAULT NULL,
  `specialite_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `technicien`
--

INSERT INTO `technicien` (`id`, `nom`, `prenom`, `email`, `tel`, `specialite_id`) VALUES
(1, 'Oussama', 'Chakroun', 'choussama816@gmail.com', '0641254152', 1),
(3, 'Anas', 'Srija', 'anas2540@gmail.com', '0625314125', 3),
(7, 'Ameziane', 'Mohammed', 'ameziane45@gmail.com', '0685412543', 2),
(15, 'Ali', 'Ali', 'ali@gmail.com', '0655620287', 2),
(16, 'Youness', 'Idrissi', 'youness@gmail.com', '0102030410', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activite`
--
ALTER TABLE `activite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activite_ibfk_1` (`etat_id`),
  ADD KEY `activite_ibfk_2` (`technicien_id`),
  ADD KEY `activite_ibfk_3` (`tache_id`);

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipement`
--
ALTER TABLE `equipement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipement_ibfk_1` (`service_id`),
  ADD KEY `equipement_ibfk_4` (`categorie_id`);

--
-- Indexes for table `etablissement`
--
ALTER TABLE `etablissement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `etat`
--
ALTER TABLE `etat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pieceactivite`
--
ALTER TABLE `pieceactivite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pieceactivite_ibfk_1` (`activite_id`),
  ADD KEY `pieceactivite_ibfk_2` (`equipement_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_ibfk_1` (`etablissement_id`);

--
-- Indexes for table `specialite`
--
ALTER TABLE `specialite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tache`
--
ALTER TABLE `tache`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tache_ibfk_1` (`etat_id`),
  ADD KEY `tache_ibfk_2` (`equipement_id`);

--
-- Indexes for table `technicien`
--
ALTER TABLE `technicien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `technicien_ibfk_1` (`specialite_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activite`
--
ALTER TABLE `activite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `etat`
--
ALTER TABLE `etat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pieceactivite`
--
ALTER TABLE `pieceactivite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `specialite`
--
ALTER TABLE `specialite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tache`
--
ALTER TABLE `tache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `technicien`
--
ALTER TABLE `technicien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activite`
--
ALTER TABLE `activite`
  ADD CONSTRAINT `activite_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activite_ibfk_2` FOREIGN KEY (`technicien_id`) REFERENCES `technicien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activite_ibfk_3` FOREIGN KEY (`tache_id`) REFERENCES `tache` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equipement`
--
ALTER TABLE `equipement`
  ADD CONSTRAINT `equipement_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipement_ibfk_4` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pieceactivite`
--
ALTER TABLE `pieceactivite`
  ADD CONSTRAINT `pieceactivite_ibfk_1` FOREIGN KEY (`activite_id`) REFERENCES `activite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pieceactivite_ibfk_2` FOREIGN KEY (`equipement_id`) REFERENCES `equipement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`etablissement_id`) REFERENCES `etablissement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tache`
--
ALTER TABLE `tache`
  ADD CONSTRAINT `tache_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tache_ibfk_2` FOREIGN KEY (`equipement_id`) REFERENCES `equipement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `technicien`
--
ALTER TABLE `technicien`
  ADD CONSTRAINT `technicien_ibfk_1` FOREIGN KEY (`specialite_id`) REFERENCES `specialite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

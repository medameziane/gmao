-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2023 at 09:56 PM
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
  `end_date` date DEFAULT NULL,
  `dure` double DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `technicien_id` int(11) DEFAULT NULL,
  `tache_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activite`
--

INSERT INTO `activite` (`id`, `description`, `date`, `end_date`, `dure`, `etat_id`, `technicien_id`, `tache_id`) VALUES
(67, 'activity 1', '2023-01-30', '2023-01-31', 1, 3, 33, 165),
(68, 'hjgfjg  jhkhkjk', '2023-01-31', '2023-02-02', 2, 1, 36, 165),
(69, 'trhtyujyuyyiyui', '2023-01-30', '2023-02-08', 9, 2, 37, 168);

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
(2, 'mechanique'),
(3, 'Learning'),
(7, 'categorie 10'),
(12, 'categorie 11');

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
  `piecedeRechange` tinyint(1) DEFAULT 0,
  `document` varchar(100) DEFAULT NULL,
  `equip_image` varchar(255) NOT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipement`
--

INSERT INTO `equipement` (`id`, `nom`, `description`, `dateDebut`, `prix`, `marque`, `reference`, `piecedeRechange`, `document`, `equip_image`, `categorie_id`, `service_id`) VALUES
(252, 'Fusce a magna eget dolor laoreet sollicitudin.', 'Praesent accumsan lacinia ligula, sollicitudin sollicitudin mauris tempus eget. Maecenas commodo turpis at enim pulvinar viverra. In ac dignissim magna. Vestibulum facilisis porta fermentum.', '2023-01-24', 14520, 'KAESER', '6.1981.1 - 619811', 0, '2301240301240124tâches.pdf', '2301240301240124CustomMachine2-crop.jpg', 1, 4),
(285, 'equipement editable 1214', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,', '2023-01-26', 65412, 'Compressor', '6.1981.1 - 619811', 0, '23012601011801182301240301120112TD_1 .pdf', '2301260101180118DSC00650-2.jpg', 2, 1),
(289, 'equipement editable 152', 'Mauris porttitor, mauris eget tincidunt aliquet, libero risus pharetra orci, blandit luctus sem eros at nisl. Proin maximus quam nisl, egestas dictum felis laoreet id.', '2023-01-27', 14438, 'Compressor', '6.1981.1 - 619811', 0, '23012706013001302301240301240124tâches.pdf', '2301270601300130Robotics-Production-Line-Belden-2020-07.jpg', 12, 4);

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
(3, 'En cours', 'Orange');

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
  `end_date` date DEFAULT NULL,
  `dure` int(11) DEFAULT 0,
  `etat_id` int(11) DEFAULT NULL,
  `equipement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tache`
--

INSERT INTO `tache` (`id`, `description`, `date`, `end_date`, `dure`, `etat_id`, `equipement_id`) VALUES
(154, 'fgfhgfggj', '2023-01-29', '2023-01-30', 1, 2, 285),
(165, 'TACHE 40', '2023-01-29', '2023-02-09', 11, 1, 285),
(167, 'tache 50', '2023-01-28', '2023-02-11', 14, 3, 289),
(168, 'tache 60', '2023-01-29', '2023-02-04', 6, 1, 285),
(171, 'tacvhe 112', '2023-01-30', '2023-01-31', 1, 2, 252),
(172, 'fd jg hj', '2023-01-28', '2023-01-30', 2, 1, 285),
(173, 'ttvtttggt', '2023-02-01', '2023-03-03', 30, 3, 285),
(174, 'ghjjhk', '2023-01-03', '2023-01-31', 28, 1, 285),
(175, 'tache test', '2023-02-01', '2023-02-01', 0, 3, 289),
(176, 'task test', '2023-01-08', '2023-01-08', 0, 2, 285);

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
(32, 'Oussama', 'Chakroun', 'oussama@gmail.com', '0102034020', 1),
(33, 'Ameziane', 'Mohammed', 'mohamed@gmail.com', '0102030410', 2),
(34, 'Srija', 'Anas', 'anas@gmail.com', '0620010504', 3),
(35, 'Idrissi', 'Youness', 'youness@gmail.com', '0102034020', 2),
(36, 'Kamal', 'Kamli', 'kamal@gmail.com', '0102034020', 2),
(37, 'simo', 'simo', 'simo@gmail.com', '0102030406', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=293;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `technicien`
--
ALTER TABLE `technicien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

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

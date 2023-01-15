-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2023 at 03:32 AM
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
(1, 'Activite 1', '2023-01-14', 10, 3, 7, 4),
(2, 'Activite 2', '2023-01-14', 10, 3, 1, 20),
(3, 'Activite 4', '2023-01-14', 10, 3, 1, 4),
(4, 'Activite 4', '2023-01-14', 10, 4, 3, 4);

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
  `categorie_id` int(11) DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `marque` varchar(100) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `piecedeRechange` tinyint(1) DEFAULT NULL,
  `document` varchar(100) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipement`
--

INSERT INTO `equipement` (`id`, `nom`, `description`, `categorie_id`, `dateDebut`, `prix`, `marque`, `reference`, `piecedeRechange`, `document`, `service_id`) VALUES
(1, '\nCompressor KAESER DSD 238T SIGMA', 'Compressor KAESER - Type ABT 238 - Year:2012 - Refrigerant: R134A - Refrigerant charge: 2.98 kg - Max working pressure 16bars', NULL, '0000-00-00', 2023, 'sdgsdg', 'dssgd', 0, 'fss', NULL),
(2, 'oussama chakroun', 'qskkkjsdbs bkuksdfu giusgduif sgiousgdifg _gsgèy gygsjyfsgyujfj yusguyuyg uyyug uysguyuyg uysguyyu yusyu suygyug yusgyusyusyu yuguyg uysyusuy', NULL, '0000-00-00', 7, 'hiodsfhosdhf', 'soidfhoihsdfoisdh', 0, 'sfhhf fjfjffhff', NULL),
(3, 'Air-conditioner', 'Air-conditioner DAIKIN RYN 60', NULL, '0000-00-00', 665, 'sdssd', 'sdds', 0, 'dsdsgds', NULL),
(4, 'dfsd', 'sdfsd', NULL, '0000-00-00', 444, 'sdfsdds', 'sdfdds', 0, 'sdsdsd', NULL);

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
(4, 'En retard et commencé', 'orange ');

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
(1, 'dfgdfdffg', 1);

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
(1, 'fdffdgfffd');

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
(2, 'dfdfgdf', '2023-01-12', 8, 3, 2),
(3, 'bkbkxkbKQB', '2023-01-12', 41, 4, 4),
(4, 'hfhfgfgfg', '2023-01-12', 8, 3, 3),
(5, 'rjuyujygjuygjgjgh', '2023-01-13', 12, 1, 3),
(15, 'yuuyyuyu', '2023-01-14', 10, 1, 1),
(16, 'gghgh ghgh ghgh', '2023-01-14', 10, 3, 2),
(17, 'fg ghgh h ghghghg ghg ', '2023-01-14', 10, 1, 2),
(18, 'hghg ghgh  ghgh', '2023-01-14', 10, 1, 2),
(19, 'tache 3', '2023-01-14', 10, 1, 2),
(20, 'Tache 4', '2023-01-14', 10, 1, 3),
(21, 'jg jhg j j', '2023-01-14', 10, 4, 2);

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
(1, 'drrgdffg fggffg', 'choussama816@gmail.com', '0674091473', 'choussama816@gmail.com', 1),
(3, 'drrgdffg fggffg', 'choussama816@gmail.com', '0674091473', 'choussama816@gmail.com', 1),
(7, 'ddsdss', 'choussama816@gmail.com', '0674091473', 'choussama816@gmail.com', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `specialite`
--
ALTER TABLE `specialite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tache`
--
ALTER TABLE `tache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `technicien`
--
ALTER TABLE `technicien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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

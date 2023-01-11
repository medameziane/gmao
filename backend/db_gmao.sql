-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2023 at 12:52 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `categorie` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id`, `categorie`) VALUES
(1, 'Achat'),
(2, 'Adl Fabrication'),
(3, 'Adl Réparation'),
(4, 'Administratif'),
(5, 'Amélioratif'),
(6, 'Analyse'),
(8, 'Arrét Technique');

-- --------------------------------------------------------

--
-- Table structure for table `equipement`
--

CREATE TABLE `equipement` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `marque` varchar(100) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `piecedeRechange` tinyint(1) DEFAULT NULL,
  `document` varchar(100) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipement`
--

INSERT INTO `equipement` (`id`, `name`, `description`, `categorie_id`, `dateDebut`, `prix`, `marque`, `reference`, `piecedeRechange`, `document`, `service_id`) VALUES
(16, 'Compressor KAESER DSD 238T SIGMA', 'Compressor KAESER - Type ABT 238 - Year:2012 - Refrigerant: R134A - Refrigerant charge: 2.98 kg - Ma', NULL, '2023-01-11', 1500, 'Compressor', 'Compressor KAESER', 0, 'Non', NULL),
(17, 'FILTRE A HUILE KAESER 6.1981.1 ', 'FILTRE A HUILE Marque : KAESER Référence : 6.1981.1 - 619811', 2, '2023-01-11', 720, 'KAESER', '6.1981.1 - 619811', 0, 'hjh', NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `etat`
--

CREATE TABLE `etat` (
  `id` int(11) NOT NULL,
  `etat` varchar(100) DEFAULT NULL,
  `colour` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `etat`
--

INSERT INTO `etat` (`id`, `etat`, `colour`) VALUES
(3, 'En attente', NULL),
(4, 'Complété', NULL),
(5, 'Échoué', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pieceactivite`
--

CREATE TABLE `pieceactivite` (
  `id` int(11) NOT NULL,
  `activite_id` int(11) DEFAULT NULL,
  `equipement_id` int(11) DEFAULT NULL,
  `qte` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `nomService` varchar(100) DEFAULT NULL,
  `etablissement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `specialite`
--

CREATE TABLE `specialite` (
  `id` int(11) NOT NULL,
  `specialite` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tache`
--

CREATE TABLE `tache` (
  `id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `dure` double DEFAULT NULL,
  `etat_id` int(11) DEFAULT NULL,
  `equipement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tache`
--

INSERT INTO `tache` (`id`, `titre`, `description`, `date`, `dure`, `etat_id`, `equipement_id`) VALUES
(39, '  Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptatum iste consequuntur est c', '2023-01-11', 10, 3, 16);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `etat`
--
ALTER TABLE `etat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tache`
--
ALTER TABLE `tache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `technicien`
--
ALTER TABLE `technicien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activite`
--
ALTER TABLE `activite`
  ADD CONSTRAINT `activite_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `activite_ibfk_2` FOREIGN KEY (`technicien_id`) REFERENCES `technicien` (`id`),
  ADD CONSTRAINT `activite_ibfk_3` FOREIGN KEY (`tache_id`) REFERENCES `tache` (`id`);

--
-- Constraints for table `equipement`
--
ALTER TABLE `equipement`
  ADD CONSTRAINT `equipement_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `equipement_ibfk_4` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);

--
-- Constraints for table `pieceactivite`
--
ALTER TABLE `pieceactivite`
  ADD CONSTRAINT `pieceactivite_ibfk_1` FOREIGN KEY (`activite_id`) REFERENCES `activite` (`id`),
  ADD CONSTRAINT `pieceactivite_ibfk_2` FOREIGN KEY (`equipement_id`) REFERENCES `equipement` (`id`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`etablissement_id`) REFERENCES `etablissement` (`id`);

--
-- Constraints for table `tache`
--
ALTER TABLE `tache`
  ADD CONSTRAINT `tache_ibfk_1` FOREIGN KEY (`etat_id`) REFERENCES `etat` (`id`),
  ADD CONSTRAINT `tache_ibfk_2` FOREIGN KEY (`equipement_id`) REFERENCES `equipement` (`id`);

--
-- Constraints for table `technicien`
--
ALTER TABLE `technicien`
  ADD CONSTRAINT `technicien_ibfk_1` FOREIGN KEY (`specialite_id`) REFERENCES `specialite` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

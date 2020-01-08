-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2020 a las 10:05:46
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jawascript`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `erabiltzailea`
--

CREATE TABLE `erabiltzailea` (
  `Id` int(11) NOT NULL,
  `Izena` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Pasahitza` varchar(18) COLLATE utf8_spanish_ci NOT NULL,
  `Puntuazioa` int(11) NOT NULL,
  `Jolastuta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galdera`
--

CREATE TABLE `galdera` (
  `Id` int(11) NOT NULL,
  `Galdera` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `ErantzunZuzena` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Erantzun1` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Erantzun2` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Erantzun3` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ranking`
--

CREATE TABLE `ranking` (
  `Id` int(11) NOT NULL,
  `Izena` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Puntuazioa` int(11) NOT NULL,
  `ErabiltzaileId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taldea`
--

CREATE TABLE `taldea` (
  `Id` int(11) NOT NULL,
  `Izena` int(11) NOT NULL,
  `Partaideak` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Partaideak`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `erabiltzailea`
--
ALTER TABLE `erabiltzailea`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `galdera`
--
ALTER TABLE `galdera`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `taldea`
--
ALTER TABLE `taldea`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `erabiltzailea`
--
ALTER TABLE `erabiltzailea`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `galdera`
--
ALTER TABLE `galdera`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ranking`
--
ALTER TABLE `ranking`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taldea`
--
ALTER TABLE `taldea`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

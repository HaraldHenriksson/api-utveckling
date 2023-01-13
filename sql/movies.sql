-- MOVIES

-- Avatar
-- Sci-Fi
-- 178
-- 2009-12-18
-- James Cameron


-- Top Gun: Maverick
-- Action
-- 131
-- 2022-05-25
-- Joseph Kosinski


-- Black Panther: Wakanda Forever
-- Action
-- 162
-- 2022-11-09
-- Ryan Coogler


-- Spoiler Alert
-- Comedy
-- 110
-- 2022-12-02
-- Michael Showalter


-- Avatar: The Way of Water
-- Sci-Fi
-- 192
-- 2022-12-14
-- James Cameron

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 13 jan 2023 kl 13:21
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fed22_imdb`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `directors`
--

CREATE TABLE `directors` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `directors`
--

INSERT INTO `directors` (`id`, `name`) VALUES
(1, 'James Cameron'),
(2, 'Joseph Kosinski'),
(3, 'Ryan Coogler'),
(4, 'Michael Showalter');

-- --------------------------------------------------------

--
-- Tabellstruktur `director_movie`
--

CREATE TABLE `director_movie` (
  `director_id` int(11) UNSIGNED NOT NULL,
  `movie_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellstruktur `imdb_movies`
--

CREATE TABLE `imdb_movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `runtime` int(3) UNSIGNED DEFAULT NULL,
  `release_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `imdb_movies`
--

INSERT INTO `imdb_movies` (`id`, `title`, `genre`, `runtime`, `release_date`) VALUES
(1, 'Avatar', 'Sci-Fi', 178, '2009-12-18'),
(2, 'Black Panther: Wakanda Forever', 'Action', 131, '2022-11-09'),
(3, 'Spoiler Alert', 'Comedy', 110, '2022-12-02'),
(4, 'Top Gun: Maverick', 'Action', 131, '2022-05-25'),
(5, 'Avatar: The Way of Water', 'Sci-Fi', 192, '2022-12-14');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `imdb_movies`
--
ALTER TABLE `imdb_movies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `directors`
--
ALTER TABLE `directors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `imdb_movies`
--
ALTER TABLE `imdb_movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

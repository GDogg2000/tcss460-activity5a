-- --------------------------------------------------------
-- TCSS 460
-- Activity 5A - SQL Script (Cloud MySQL on Aiven)
-- WA Population Statistics
-- --------------------------------------------------------
-- Aiven requires every new table to have a primary key.
-- The population table intentionally has none (see the
-- duplicate-record discussion in the activity), so we turn
-- that rule off for this import session only.
SET SESSION sql_require_primary_key = 0;

DROP DATABASE IF EXISTS `activity5-db`;
CREATE DATABASE IF NOT EXISTS `activity5-db`;
USE `activity5-db`;


-- --------------------------------------------------------
-- Table structure for table `population`

CREATE TABLE `population` (
  `city` varchar(256) NOT NULL,
  `population` double NOT NULL,
  `populationRank` double NOT NULL,
  `landArea` double NOT NULL,
  `populationDensity` double NOT NULL,
  `populationDensityRank` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Dumping data for table `population`

INSERT INTO `population` (`city`, `population`, `populationRank`, `landArea`, `populationDensity`, `populationDensityRank`) VALUES
('Auburn', 88820, 14, 29.58, 3003, 60),
('Bothell', 49550, 26, 13.64, 3634, 31),
('Bremerton', 44640, 27, 28.43, 1570.2, 139),
('Des Moines', 33260, 38, 6.41, 5187.5, 6),
('Everett', 114200, 7, 33.6, 3398.8, 40),
('Federal Way', 102000, 10, 22.33, 4568, 15),
('Gig Harbor', 13060, 79, 5.9, 2212.5, 89),
('Issaquah', 41290, 30, 12.13, 3404.1, 39),
('Kent', 139100, 6, 33.75, 4121.5, 19),
('Kirkland', 96920, 12, 17.81, 5443.1, 3),
('Lakewood', 64150, 20, 17.06, 3760.4, 27),
('Lynnwood', 40790, 32, 7.88, 5178.6, 7),
('Puyallup', 43420, 28, 14.36, 3022.9, 57),
('Redmond', 77490, 17, 16.57, 4677.4, 10),
('Renton', 107900, 8, 23.5, 4590.6, 13),
('Sammamish', 68280, 19, 20.42, 3343.3, 45),
('Seattle', 779200, 1, 83.83, 9295, 1),
('Shoreline', 61120, 22, 11.63, 5253.2, 4),
('Spokane', 232700, 2, 68.76, 3384.2, 42),
('Steilacoom', 6825, 113, 2.01, 3393.6, 41),
('Tacoma', 222400, 3, 49.71, 4473.5, 16),
('Tukwila', 22780, 51, 9.18, 2480.2, 82),
('Vancouver', 199600, 4, 48.75, 4094.5, 21),
('Yakima', 98650, 11, 27.86, 3541, 34);


-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Gen 02, 2020 alle 11:46
-- Versione del server: 10.3.17-MariaDB-0+deb10u1
-- Versione PHP: 7.3.11-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Database: `TEMPERATURE`
--

CREATE DATABASE TEMPERATURE;

--
-- Struttura della tabella `HISTORY`
--

CREATE TABLE `HISTORY` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `TIME` datetime NOT NULL DEFAULT current_timestamp(),
  `TEMPERATURE` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Indici per le tabelle `HISTORY`
--
ALTER TABLE `HISTORY`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);


--
-- AUTO_INCREMENT per la tabella `HISTORY`
--
ALTER TABLE `HISTORY`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
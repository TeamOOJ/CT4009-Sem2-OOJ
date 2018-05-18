-- Table structure for table `tbl_user`

DROP TABLE IF EXISTS `tblStolenBikeImages`;
DROP TABLE IF EXISTS `tblStolenBike`;

CREATE TABLE `tblStolenBike` (
`StolenBikeID` int(11) NOT NULL,
`MPN` varchar(20) NOT NULL,
`Brand` varchar(20) NOT NULL,
`Model` varchar(20) NOT NULL,
`Lat` DOUBLE(15, 12) NOT NULL,
`Lng` DOUBLE(15, 12) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tblStolenBikeImages` (
`StolenBikeID` int(11) NOT NULL,
`ImageID` varchar(30) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `tblStolenBike`
ADD PRIMARY KEY (`StolenBikeID`);

ALTER TABLE `tblStolenBike`
MODIFY `StolenBikeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `tblStolenBikeImages`
ADD FOREIGN KEY (StolenBikeID) REFERENCES tblStolenBike(StolenBikeID);

ALTER TABLE `tblStolenBike`
ADD COLUMN `Lat_2` DOUBLE(15, 12) NOT NULL;

ALTER TABLE `tblStolenBike`
ADD COLUMN `Lng_2` DOUBLE(15, 12) NOT NULL;
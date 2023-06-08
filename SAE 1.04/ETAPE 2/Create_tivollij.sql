CREATE TABLE PORT(
PortID char(1) CHECK(PortID IN('C','Q','S')),
PortName varchar,
Country varchar,
PRIMARY KEY (PortID)
);

CREATE TABLE PASSENGER(
PassengerID int PRIMARY KEY,
Name varchar,
Sex varchar,
Age int,
Survived int CHECK(Survived IN ('0','1')),
PClass int CHECK(PClass IN ('1','2','3')),
PortID char(1),
FOREIGN KEY(PortID) REFERENCES PORT(PortID)
);

CREATE TABLE OCCUPATION(
PassengerID int,
CabinCode varchar,
FOREIGN KEY (PassengerID) REFERENCES PASSENGER(PassengerID),
PRIMARY KEY (PassengerID,CabinCode)
);

CREATE TABLE SERVICE(
PassengerID_DOM int,
PassengerID_EMP int,
Role varchar,
FOREIGN KEY (PassengerID_DOM) REFERENCES PASSENGER(PassengerID),
FOREIGN KEY (PassengerID_EMP) REFERENCES PASSENGER(PassengerID),
PRIMARY KEY (PassengerID_DOM)
);

CREATE TABLE CATEGORY(
LifeBoatCat varchar CHECK(LifeBoatCat IN ('standard','secours','radeau')),
Structure varchar CHECK(Structure IN ('bois', 'bois et toile')),
Places int,
PRIMARY KEY (LifeBoatCat)
);

CREATE TABLE LIFEBOAT(
LifeBoatID varchar PRIMARY KEY,
LifeBoatCat varchar,
Side varchar CHECK (Side IN ('babord','tribord')),
Position varchar CHECK(Position IN ('avant','arriere')),
Location varchar DEFAULT 'pont',
Lauching_Time Time,
FOREIGN KEY (LifeBoatCat) REFERENCES CATEGORY(LifeBoatCat)
);

CREATE TABLE RECOVERY(
LifeBoatID varchar,
Recovery_Time Time,
FOREIGN KEY (LifeBoatID) REFERENCES LIFEBOAT(LifeBoatID),
PRIMARY KEY (LifeBoatID)
);

CREATE TABLE RESCUE(
PassengerID int,
LifeBoatID varchar,
FOREIGN KEY (PassengerID) REFERENCES PASSENGER(PassengerID),
FOREIGN KEY (LifeBoatID) REFERENCES LIFEBOAT(LifeBoatID)
);


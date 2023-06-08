/*A.1

(a)*/
SELECT count(Survived) AS Survivants, 323-count(Survived) AS Morts, PClass FROM PASSENGER WHERE PClass=1 AND Survived=1 GROUP BY passenger.PClass, passenger.survived;
SELECT count(Survived) AS Survivants, 323-count(Survived) AS Morts, PClass FROM PASSENGER WHERE PClass=2 AND Survived=1 GROUP BY passenger.PClass, passenger.survived;
SELECT count(Survived) AS Survivants, 709-count(Survived) AS Morts, PClass FROM PASSENGER WHERE PClass=3 AND Survived=1 GROUP BY passenger.PClass, passenger.survived;


/*BILAN => La plupart des survivants étaient en première classe, le nombre de morts est très important dans la troisième classe, conclusion la classe a influencé sur la survie du passager.*/

/*(b)*/
SELECT count(Survived) AS Survivants, 1309-count(Survived) AS Morts, Sex FROM PASSENGER WHERE Sex='male' AND Survived=1 AND Age>=12 GROUP BY  passenger.survived, passenger.sex;
SELECT count(Survived) AS Survivants, 1309-count(Survived) AS Morts, Sex FROM PASSENGER WHERE Sex='female' AND Survived=1 AND Age>=12 GROUP BY  passenger.survived, passenger.sex;
SELECT count(Survived) AS Survivants, 110-count(Survived) AS Morts FROM PASSENGER WHERE Age <12 AND Survived=1;


/*QUESTION:*/
* SELECT count(Survived) AS Survivants, ((SELECT count(Survived)  FROM PASSENGER WHERE Age <12 AND Survived=1) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='male' AND Survived=1 AND Age>=12) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='female' AND Survived=1 AND Age>=12)) AS TotSurvivants FROM PASSENGER WHERE Survived=1;


* SELECT count(Survived) AS Morts, ((SELECT count(Survived)  FROM PASSENGER WHERE Age <12 AND Survived=0) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='male' AND Survived=0 AND Age>=12) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='female' AND Survived=0 AND Age>=12)) AS TotMorts FROM PASSENGER WHERE Survived=0;


/*A.2

(a)*/

SELECT count(Survived) AS Survivants, 323-count(Survived) AS Morts, PClass FROM PASSENGER WHERE PClass=1 AND Survived=1 GROUP BY passenger.PClass, passenger.survived;
SELECT count(Survived) AS Survivants, 323-count(Survived) AS Morts, PClass FROM PASSENGER WHERE PClass=2 AND Survived=1 GROUP BY passenger.PClass, passenger.survived;
SELECT count(Survived) AS Survivants, 709-count(Survived) AS Morts, PClass FROM PASSENGER WHERE PClass=3 AND Survived=1 GROUP BY passenger.PClass, passenger.survived;
/*(b)*/

SELECT count(Survived) AS Survivants, 1309-count(Survived) AS Morts, Sex FROM PASSENGER WHERE Sex='male' AND Survived=1 AND Age>=12 GROUP BY  passenger.survived, passenger.sex;
SELECT count(Survived) AS Survivants, 1309-count(Survived) AS Morts, Sex FROM PASSENGER WHERE Sex='female' AND Survived=1 AND Age>=12 GROUP BY  passenger.survived, passenger.sex;
SELECT count(Survived) AS Survivants, 110-count(Survived) AS Morts FROM PASSENGER WHERE Age <12 AND Survived=1;

/*QUESTION:*/
* SELECT count(Survived) AS Survivants, ((SELECT count(Survived)  FROM PASSENGER WHERE Age <12 AND Survived=1) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='male' AND Survived=1 AND Age>=12) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='female' AND Survived=1 AND Age>=12)) AS TotSurvivants FROM PASSENGER WHERE Survived=1;

* SELECT count(Survived) AS Morts, ((SELECT count(Survived)  FROM PASSENGER WHERE Age <12 AND Survived=0) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='male' AND Survived=0 AND Age>=12) + (SELECT count(Survived) FROM PASSENGER WHERE Sex='female' AND Survived=0 AND Age>=12)) AS TotMorts FROM PASSENGER WHERE Survived=0;






/*A3 Taux de survivants dans les différentes catégories de passagers selon leur classe



------------------------------------------------------------------------------------
A) Taux de survivants par classe, toutes catégories confondues (enfants, femmes ou hommes)*/

/*Class1*/
SELECT Count(PClass)*100/323 AS TauxPassengerClass1,Survived FROM PASSENGER WHERE PClass = 1 AND Survived = 1 GROUP BY Survived;

/*Class2*/
SELECT Count(PClass)*100/277 AS TauxPassengerClass2,Survived FROM PASSENGER WHERE PClass = 2 AND Survived = 1 GROUP BY Survived ;

/*Class3*/
SELECT Count(PClass)*100/709 AS TauxPassengerClass3,Survived FROM PASSENGER WHERE PClass = 3 AND Survived = 1 GROUP BY Survived;

------------------------------------------------------------------------------------
/*B) Taux de survivants par classe dans la catégorie enfants*/

/*Class1*/
SELECT count(Age)*100/5 AS Enfant, PClass, Survived  FROM PASSENGER WHERE Age <=12 AND PClass = 1 AND Survived = 1 GROUP BY Survived, PClass ;

/*Class2*/
SELECT count(Age)*100/24 AS Enfant, PClass, Survived  FROM PASSENGER WHERE Age <=12 AND PClass = 2 AND Survived = 1 GROUP BY Survived, PClass ;

/*Class3*/
SELECT count(Age)*100/81 AS Enfant, PClass, Survived  FROM PASSENGER WHERE Age <=12 AND PClass = 3 AND Survived = 1 GROUP BY Survived, PClass ;

-----------------------------------------------------------------------------------------
/*C) Taux de survivants par classe dans la catégorie femmes*/

/*Class1*/
SELECT count(Age)*100/143 AS femme, PClass, Sex, Survived  FROM PASSENGER WHERE PClass = 1 AND Age >12 AND Sex ='female' AND Survived = 1 GROUP BY PClass, Sex, Survived;

/*Class2*/
SELECT count(Age)*100/5 AS Enfant, PClass, Survived  FROM PASSENGER WHERE Age <=12 AND PClass = 1 AND Survived = 1 GROUP BY Survived, PClass ;

/*CLass3*/
SELECT count(Age)*100/180 AS femme, PClass, Sex, Survived  FROM PASSENGER WHERE PClass = 3 AND Age >12 AND Sex ='female' AND Survived = 1 GROUP BY PClass, Sex, Survived;

-----------------------------------------------------------------------------------------
/*D) Taux de survivants par classe dans la catégorie hommes*/

/*Class1*/
SELECT count(Age)*100/175 AS male, PClass, Sex, Survived  FROM PASSENGER WHERE PClass = 1 AND Age >12 AND Sex ='male' AND Survived = 1 GROUP BY PClass, Sex, Survived;

/*Class2*/
SELECT count(Age)*100/160 AS male, PClass, Sex, Survived  FROM PASSENGER WHERE PClass = 2 AND Age >12 AND Sex ='male' AND Survived = 1 GROUP BY PClass, Sex, Survived;

/*Class3*/
SELECT count(Age)*100/448 AS male, PClass, Sex, Survived  FROM PASSENGER WHERE PClass = 3 AND Age >12 AND Sex ='male' AND Survived = 1 GROUP BY PClass, Sex, Survived;
----------------------------------------------------------------------------------------





/*A4*/




/*(a)*/ 
SELECT count(*) AS rescapés, (SELECT count(*) FROM PASSENGER WHERE Age<12) AS nbEnfants FROM PASSENGER, RESCUE WHERE PASSENGER.PassengerID=RESCUE.PassengerID AND Age<12;

/*(b)*/ 
SELECT count(*) AS rescapés, (SELECT count(*) FROM PASSENGER WHERE Age<12) AS nbEnfants, (SELECT count(Survived) FROM PASSENGER WHERE Age<12 AND Survived=1) AS Survivants FROM PASSENGER, 
/*(c)*/
/*Class 1:*/
SELECT count(*) AS rescapés, (SELECT count(*) FROM PASSENGER WHERE Age<12) AS nbEnfants, (SELECT count(Survived) FROM PASSENGER WHERE Age<12 AND Survived=1) AS Survivants FROM PASSENGER, RESCUE WHERE PASSENGER.PassengerID=RESCUE.PassengerID AND Age<12 AND PClass=1;

/*Class 2:*/
SELECT count(*) AS rescapés, (SELECT count(*) FROM PASSENGER WHERE Age<12) AS nbEnfants, (SELECT count(Survived) FROM PASSENGER WHERE Age<12 AND Survived=1) AS Survivants FROM PASSENGER, RESCUE WHERE PASSENGER.PassengerID=RESCUE.PassengerID AND Age<12 AND PClass=2;


/*Class 3:*/
SELECT count(*) AS rescapés, (SELECT count(*) FROM PASSENGER WHERE Age<12) AS nbEnfants, (SELECT count(Survived) FROM PASSENGER WHERE Age<12 AND Survived=1) AS Survivants FROM PASSENGER, RESCUE WHERE PASSENGER.PassengerID=RESCUE.PassengerID AND Age<12 AND PClass=3;


/*(d)*/
SELECT count(*)*100/1309 AS TauxRescapés FROM PASSENGER, RESCUE WHERE PASSENGER.PassengerID=RESCUE.PassengerID;

/*e)*/

SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Age < 12;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex ='male';
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex ='female';

   

/*f)*/
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Age < 12 And Survived = 1;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex ='male' AND Survived = 1;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex ='female' AND Survived = 1;

/*h)

CLASS1*/
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Age < 12 And Survived = 1 AND PClass = 1;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex ='male' AND Survived = 1 AND PClass = 1;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex ='female' AND Survived = 1 AND PClass = 1;

/*CLASS2*/
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Age < 12  AND Survived = 1 AND PClass = 2;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex='male'  AND Survived = 1 AND PClass = 2;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex='female'  AND Survived = 1 AND PClass = 2;
 
/*CLASS3*/
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Age <12  AND Survived = 1 AND PClass = 3;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex='male' AND Survived = 1 AND PClass = 3;
SELECT count(*) FROM PASSENGER A, RESCUE B WHERE A.PassengerID = B.PassengerID AND Sex='female' AND Survived = 1 AND PClass = 3;

 

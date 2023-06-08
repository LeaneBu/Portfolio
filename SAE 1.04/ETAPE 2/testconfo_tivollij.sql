INSERT INTO PORT VALUES('C','Chambourg','England');
/*insert dans la Table PORT l'id C du port Chambourg en Angleterre*/

INSERT INTO PASSENGER VALUES('999',' Passager1','male','99','1','C');
/*insert dans la table PASSENGER l'id du passger 999 du nom de Passager1 c'est un homme de 99ans qui a survécu (1) et qui a embarqué au port ou est associé l'id C*/

INSERT INTO PASSENGER VALUES('1000','Passager2','female','99','1','C');
/*insert dans la table PASSENGER l'id du passger 1000 du nom de Passager2 c'est une femme de 99ans qui a survécu (1) et qui a embarqué au port ou est associé l'id C*/

INSERT INTO OCCUPATION VALUES('999','B14');
/*insert dans la table OCCUPATION l'id du passager 999 dans la cabine portant le numéros B14*/

INSERT INTO OCCUPATION VALUES('1000','B14');
/*insert dans la table OCCUPATION l'id du passager 1000 dans la cabine portant le numéros B14*/

INSERT INTO SERVICE VALUES('1000','999','Servante');
/*insert dans la table SERVICE l'id du servant 1000 associé à l'id de son maitre 999 et elle à le role de servante*/

INSERT INTO CATEGORY VALUES('standard','bois','45');
/*insert dans la table CATEGORY un bateau standard en bois de 45 places*/

INSERT INTO LIFEBOAT VALUES('32','standard','babord','avant','pont','00:15:00');
/*insert dans la table LIFEBOAT l'id du bateau 32 de catégorie standard situer à babord à l'avant sur le pont lançé a 00h15 */

INSERT INTO RECOVERY VALUES('32','00:30:00');
/*insert dans la table RECOVERY l'id du bateau 32 et son temps pour faire le trajet Titanic terre ferme*/

INSERT INTO RESCUE VALUES('999','32');
/*insert dans la table RESCUES l'id du passger 999 et l'id du bateau sur lequel il a était sauvé 32*/

INSERT INTO RSCUE VALUES('1000','32');
/*insert dans la table RESCUES l'id du passger 1000 et l'id du bateau sur lequel il a était sauvé 32*/


DROP DATABASE IF EXISTS ITEMSDB;

CREATE DATABASE IF NOT EXISTS ITEMSDB;

USE ITEMSDB;

CREATE TABLE IF NOT EXISTS ITEMSTABLE
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	item_name VARCHAR(50) NOT NULL,
	item_type VARCHAR(20) NOT NULL,
	item_description TEXT NOT NULL
);

INSERT INTO ITEMSTABLE (item_name, item_type, item_description) VALUES ('Salt', 'Perservative', 'Salt, also known as table salt or rock salt (halite), is a crystalline mineral that is composed primarily of sodium chloride (NaCl), a chemical compound belonging to the larger class of ionic salts. It is absolutely essential for animal life, but can be harmful to animals and plants in excess. Salt is one of the oldest, most ubiquitous food seasonings and salting is an important method of food preservation. The taste of salt (saltiness) is one of the basic human tastes.');

INSERT INTO ITEMSTABLE (item_name, item_type, item_description) VALUES ('Timber', 'Wood', 'Lumber (also known as timber) is wood in any of its stages from felling to readiness for use as structural material for construction, or wood pulp for paper production.');

INSERT INTO ITEMSTABLE (item_name, item_type, item_description) VALUES ('Rice', 'Food', 'Rice is the seed of the monocot plants Oryza sativa (Asian rice) or Oryza glaberrima (African rice). As a cereal grain, it is the most widely consumed staple food for a large part of the worlds human population, especially in Asia and the West Indies. It is the grain with the second-highest worldwide production, after maize (corn), according to data for 2010.');

INSERT INTO ITEMSTABLE (item_name, item_type, item_description) VALUES ('Mahogany', 'Wood', 'Mahogany is any of many different kinds of tropical hardwood, most of which are reddish-brown wood that is widely used in furniture-making, boat building, and other high specification uses. However, there are only three species of "genuine mahogany", all indigenous to the Americas. These are Swietenia mahagoni (L.) Jacq., S. macrophylla King, and S. humilis Zucc.');

INSERT INTO ITEMSTABLE (item_name, item_type, item_description) VALUES ('Fish', 'Food', 'A fish is any member of a paraphyletic group of organisms that consist of all gill-bearing aquatic craniate animals that lack limbs with digits. Included in this definition are the living hagfish, lampreys, and cartilaginous and bony fish, as well as various extinct related groups. Most fish are ectothermic ("cold-blooded"), allowing their body temperatures to vary as ambient temperatures change, though some of the large active swimmers like white shark and tuna can hold a higher core temperature.');

CREATE TABLE cards (
	id serial PRIMARY KEY,
	email VARCHAR ( 250 ) NOT NULL,
    card_number VARCHAR ( 250 ) NOT NULL,
    cvv VARCHAR ( 10 ) NOT NULL,
    expiration_year VARCHAR ( 10 ) NOT NULL,
    expiration_month VARCHAR ( 10 ) NOT NULL,
    token VARCHAR ( 250 ) NOT NULL,
	completed boolean DEFAULT false
);

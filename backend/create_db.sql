drop table if exists nodes;
drop table if exists current_state;

create table nodes (
	  id                        integer primary key AUTOINCREMENT,
	  name		                varchar(255),
	  lat	                    decimal,
	  lon	                    decimal,
	  heading	                decimal,
	 UNIQUE(name)
);

create table current_state (
	freq		decimal,
	mode		varchar(10),
	gain		decimal
);

insert into current_state VALUES (89.7, "WFM", 0)

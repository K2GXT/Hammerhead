drop table if exists nodes;
drop table if exists current_state;

create table nodes (
	  id                        integer primary key AUTOINCREMENT,
	  name		                varchar(255),
	  lat	                    decimal DEFAULT 0,
	  lon	                    decimal DEFAULT 0,
	  heading	                decimal DEFAULT 0,
	 UNIQUE(name)
);

create table current_state (
	id			integer primary key AUTOINCREMENT,
	freq		decimal,
	mode		varchar(10),
	gain		decimal
);

insert into current_state VALUES (1, 89.7, "WFM", 0)

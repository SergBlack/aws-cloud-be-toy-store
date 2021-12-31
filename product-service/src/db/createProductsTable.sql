CREATE TABLE IF NOT EXISTS products (
	id uuid primary key,
	title text not null,
	description text,
	price int,
	image_src text
)

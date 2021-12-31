CREATE TABLE IF NOT EXISTS products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price int not null,
	image_src text
)

import { middyfy } from '@libs/lambda';
import { Client, ClientConfig } from 'pg';

const dbOptions: ClientConfig = {
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const createEntities = async (event) => {
  const client = new Client(dbOptions);

  try {
    await client.connect();

    const createdTable = await client.query(`
      create table if not exists products (
        id uuid primary key,
        count int,
        description text,
        price int,
        title text,
        image_src text
     )`);

    const createdEntities = await client.query(`
      insert into products (id, count, description, price, title, image_src) values
       ('7567ec4b-b10c-48c5-9345-fc73c77a80aa', 4, 'Nintendo amiibo toys of characters Mario,Luigi, and Peach', 50, 'MarioBros', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
       ('7567ec1b-b10c-48c5-9345-fc73c48a80a0', 6, 'A pre-loved teddy bear in a second hand store', 10, 'Teddy bear', 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
       ('7567ec2b-b10c-48c5-9345-fc73c48a80a2', 7, 'Minion are yellow', 23, 'Minion', 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'),
       ('7567ec3b-b10c-48c5-9345-fc73c48a80a1', 12, 'The Rubiks Cube is a 3-D combination puzzle invented in 1974', 15, 'Rubiks Cube', 'https://images.unsplash.com/photo-1496354265829-17b1c7b7c363?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1154&q=80'),
       ('7567ec5b-b10c-48c5-9345-fc73c48a80a3', 7, 'The best assistant to the programmer', 23, 'Assistant programmer', 'https://images.unsplash.com/photo-1582845512747-e42001c95638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'),
       ('7567ec6b-b10c-48c5-9345-fc73348a80a1', 8, 'Lego Chernobyl People with anti radiation suit or hazmat suit', 15, 'Lego Stalker', 'https://images.unsplash.com/photo-1609741199743-341cf4ee3d02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'),
       ('7567ec7b-b10c-48c5-9445-fc73c48a80a2', 2, 'Funny Monkey', 23, 'Monkey', 'https://images.unsplash.com/photo-1517686748843-bb360cfc62b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
       ('7567ec8b-b10c-45c5-9345-fc73c48a80a1', 3, 'Red metal sport car', 15, 'Sport car', 'https://images.unsplash.com/photo-1630332661797-9abe164a7141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')

    `);

    console.log({
      event,
      createdTable,
      createdEntities,
    });
  } catch (e) {
    console.log(e.stack);
  } finally {
    await client.end();
  }
};

export const main = middyfy(createEntities);

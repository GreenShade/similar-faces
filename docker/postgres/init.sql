CREATE TABLE FACES(
  name VARCHAR(255) PRIMARY KEY,
  representation real[],
  face VARCHAR(64000)
);

CREATE TABLE USERS(
  representation real[],
  face VARCHAR(64000)
)
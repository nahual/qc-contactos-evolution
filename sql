create table contactos (id smallserial, nombre text, email text);
drop table contactos;

select * from contactos;

insert into contactos (nombre, email) values ('Pedro Mauro', 'ppmauro6@gmail.com');
delete from contactos * where id = 2;




-- para crear la tabla de contactos
create table contactos (id smallserial, nombre text, email text);
-- para borrarla ;)
drop table contactos;

-- obtener todos los contactos
select * from contactos;
-- borrar todos los contactos
delete from contactos;
-- agregar contactos
insert into contactos (nombre, email) values ('Pedro Mauro', 'ppmauro6@gmail.com'), ('Jane', 'gatamarmolada@gmail.com');
-- obtener un contacto
select * from contactos where id = 2;
-- borrar un contacto
delete from contactos where id = 2;
-- actualizar un contacto
update contactos SET (nombre, email) = ('pedro', 'altomail') where id = 2;




CREATE DATABASE carteira;

CREATE TABLE IF NOT EXISTS public.saldo
(
    id_saldo integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    login character varying(30) COLLATE pg_catalog."default" NOT NULL,
    saldo double precision NOT NULL,
    id_usuario integer NOT NULL,
    CONSTRAINT saldo_pkey PRIMARY KEY (id_saldo)
)


CREATE TABLE IF NOT EXISTS public.usuario
(
    id_usuario integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    login character varying(30) COLLATE pg_catalog."default" NOT NULL,
    senha character varying(255) COLLATE pg_catalog."default" NOT NULL,
    nome character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
)

CREATE OR REPLACE VIEW public.usuario_saldo_view
 AS
 SELECT usuario.id_usuario,
    usuario.login,
    usuario.nome,
    usuario.senha,
    saldo.saldo
   FROM usuario
     LEFT JOIN saldo ON usuario.id_usuario = saldo.id_usuario;

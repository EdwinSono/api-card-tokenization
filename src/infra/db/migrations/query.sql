-- Table: public.cards

-- DROP TABLE IF EXISTS public.cards;

CREATE TABLE IF NOT EXISTS public.cards
(
    id integer NOT NULL DEFAULT nextval('cards_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    card_number character varying(50) COLLATE pg_catalog."default" NOT NULL,
    cvv character varying(10) COLLATE pg_catalog."default" NOT NULL,
    expiration_year character varying(10) COLLATE pg_catalog."default" NOT NULL,
    expiration_month character varying(10) COLLATE pg_catalog."default" NOT NULL,
    token character varying(100) COLLATE pg_catalog."default" NOT NULL,
    status character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "createdDate" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedDate" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY (id),
    CONSTRAINT "UQ_388db22f1d7d0f93abe68aebb67" UNIQUE (token),
    CONSTRAINT "UQ_7eaa552a6443b09c5033ebce5e6" UNIQUE (card_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cards
    OWNER to admin;

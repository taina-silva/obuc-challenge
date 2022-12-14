DROP SCHEMA if exists obuc cascade;
CREATE SCHEMA obuc;

ALTER SCHEMA obuc OWNER TO postgres;
SET default_tablespace = '';
SET search_path = obuc;

DROP TABLE if exists jobs cascade;
DROP TABLE IF EXISTS "jobs";

CREATE TABLE jobs (
    jobTitle text NOT NULL,
    salary real NOT NULL,
    CONSTRAINT pk_jobs PRIMARY KEY (jobTitle)
);

CREATE TABLE jobs_activities (
    job text NOT NULL,
    activity text NOT NULL,
    CONSTRAINT fk_activities FOREIGN KEY (job) REFERENCES obuc.jobs(jobTitle),
	CONSTRAINT pk_activities PRIMARY KEY (job, activity)
);

CREATE TABLE jobs_benefits (
    job text NOT NULL,
    benefit text NOT NULL,
    CONSTRAINT fk_benefits FOREIGN KEY (job) REFERENCES obuc.jobs(jobTitle),
	CONSTRAINT pk_benefits PRIMARY KEY (job, benefit)
);

CREATE TABLE jobs_process_steps (
    job text NOT NULL,
    step text NOT NULL,
    CONSTRAINT fk_process_steps FOREIGN KEY (job) REFERENCES obuc.jobs(jobTitle),
	CONSTRAINT pk_process_steps PRIMARY KEY (job, step)
);

CREATE TABLE jobs_necessary_skills (
    job text NOT NULL,
    skill text NOT NULL,
    CONSTRAINT fk_necessary_skills FOREIGN KEY (job) REFERENCES obuc.jobs(jobTitle),
	CONSTRAINT pk_necessary_skills PRIMARY KEY (job, skill)
);

CREATE TABLE jobs_experience_needed (
    job text NOT NULL,
    experience text NOT NULL,
    CONSTRAINT fk_experience_needed FOREIGN KEY (job) REFERENCES obuc.jobs(jobTitle),
	CONSTRAINT pk_experience_needed PRIMARY KEY (job, experience)
);

ALTER TABLE jobs OWNER TO postgres;
ALTER TABLE jobs_activities OWNER TO postgres;
ALTER TABLE jobs_benefits OWNER TO postgres;
ALTER TABLE jobs_process_steps OWNER TO postgres;
ALTER TABLE jobs_necessary_skills OWNER TO postgres;
ALTER TABLE jobs_experience_needed OWNER TO postgres;

CREATE OR REPLACE FUNCTION add_job(
	job_title obuc.jobs.jobTitle%TYPE,
	job_salary obuc.jobs.salary%TYPE,
	activities text[],
	benefits text[],
	process_steps text[],
	necessary_skills text[],
	experience_needed text[]
)
RETURNS void AS
$$
DECLARE
   _elem text; 
BEGIN
	INSERT INTO obuc.jobs (jobTitle, salary) 
		VALUES (job_title, job_salary)
		ON CONFLICT (jobTitle) DO 
			UPDATE SET salary = job_salary
				WHERE obuc.jobs.jobTitle = job_title;

	DELETE FROM obuc.jobs_activities ja
			WHERE ja.job = job_title AND
				  ja.activity ::text != all (activities);
	FOREACH _elem IN ARRAY activities
		LOOP 
			IF NOT EXISTS (
				SELECT 1 FROM obuc.jobs_activities 
					WHERE activity = _elem )
			THEN
				INSERT INTO obuc.jobs_activities (job, activity) 
					VALUES (job_title, _elem);
			END IF;
		END LOOP;
		
	DELETE FROM obuc.jobs_benefits jb
			WHERE jb.job = job_title AND
				  jb.benefit ::text != all (benefits);
	FOREACH _elem IN ARRAY benefits
		LOOP 
			IF NOT EXISTS (
				SELECT 1 FROM obuc.jobs_benefits 
					WHERE benefit = _elem )
			THEN
				INSERT INTO obuc.jobs_benefits (job, benefit) 
					VALUES (job_title, _elem);
			END IF;
		END LOOP;
		
	DELETE FROM obuc.jobs_process_steps jp
			WHERE jp.job = job_title AND 
				  jp.step ::text != all (process_steps);		
	FOREACH _elem IN ARRAY process_steps
		LOOP 
			IF NOT EXISTS (
				SELECT 1 FROM obuc.jobs_process_steps 
					WHERE step = _elem )
			THEN
				INSERT INTO obuc.jobs_process_steps (job, step) 
					VALUES (job_title, _elem);
			END IF;
		END LOOP;
	
	DELETE FROM obuc.jobs_necessary_skills jn
			WHERE jn.job = job_title AND
				  jn.skill ::text != all (necessary_skills);		
	FOREACH _elem IN ARRAY necessary_skills
		LOOP 
			IF NOT EXISTS (
				SELECT 1 FROM obuc.jobs_necessary_skills 
					WHERE skill = _elem )
			THEN
				INSERT INTO obuc.jobs_necessary_skills (job, skill) 
					VALUES (job_title, _elem);
			END IF;
		END LOOP;
		
	DELETE FROM obuc.jobs_experience_needed je
			WHERE je.job = job_title AND
				  je.experience ::text != all (experience_needed);	
	FOREACH _elem IN ARRAY experience_needed
		LOOP 
			IF NOT EXISTS (
				SELECT 1 FROM obuc.jobs_experience_needed 
					WHERE experience = _elem )
			THEN
				INSERT INTO obuc.jobs_experience_needed (job, experience) 
					VALUES (job_title, _elem);
			END IF;
		END LOOP;   
END;
$$ language 'plpgsql';

select add_job(
	'Confeitaria',
	2500.00,
	ARRAY['Mistura e preparação de massas', 'Abertura da doceria todas as manhãs', 'Organização da vitrine de forma atraente'],
	ARRAY['Seguro de vida', 'Décimo terceiro', 'Convênio Bradesco Saúde'],
	ARRAY['Enviar currículo', 'Enviar vídeo de apresentação', 'Apresentar execução de trabalho em data marcada']::text[],
	ARRAY['Capacidade de ler e seguir as receitas', 'Boas habilidades organizacionais', 'Deve ser capaz de aderir às normas de saúde e segurança'],
	ARRAY['Necessário ter ao menos 2 anos de experiência na área']
);

select * from obuc.jobs;
select * from obuc.jobs_activities;
select * from obuc.jobs_benefits;
select * from obuc.jobs_process_steps;
select * from obuc.jobs_necessary_skills;
select * from obuc.jobs_experience_needed;
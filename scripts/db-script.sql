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
	jobTitle jobs.jobTitle%TYPE,
	salary jobs.salary%TYPE,
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
	insert into obuc.jobs (jobTitle, salary) values (jobTitle, salary);
	
	FOREACH _elem IN ARRAY activities
	   	LOOP 
		  	insert into obuc.jobs_activities (job, activity) 
				values (jobTitle, _elem);
	   	END LOOP;
	   
	FOREACH _elem IN ARRAY benefits
	   	LOOP 
		  	insert into obuc.jobs_benefits (job, benefit) 
				values (jobTitle, _elem);
	   	END LOOP;
	   
	FOREACH _elem IN ARRAY process_steps
		LOOP 
		  	insert into obuc.jobs_process_steps (job, step) 
				values (jobTitle, _elem);
	   	END LOOP;
	   
	 FOREACH _elem IN ARRAY necessary_skills
	 	LOOP 
		  	insert into obuc.jobs_necessary_skills (job, skill) 
				values (jobTitle, _elem);
	   	END LOOP;
	   
	  FOREACH _elem IN ARRAY experience_needed
	  	LOOP 
		  	insert into obuc.jobs_experience_needed (job, experience) 
				values (jobTitle, _elem);
	   	END LOOP;   
END;
$$ language 'plpgsql';

select add_job(
	'TESTE',
	1000,
	ARRAY['opa'],
	ARRAY['h', 'aaaaa'],
	ARRAY[]::text[],
	ARRAY['lala', 'kakak', 'qwqw'],
	ARRAY['pp']
);

select * from jobs;
select * from jobs_activities;
select * from jobs_benefits;
select * from jobs_process_steps;
select * from jobs_necessary_skills;
select * from jobs_experience_needed;

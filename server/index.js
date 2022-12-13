const express = require("express");
const app = express();
const PORT = 3001;

const jobs_manager = require('./jobs_manager')

app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
    Promise.allSettled([
        jobs_manager.get_all_users(`SELECT * FROM obuc.jobs`),
        jobs_manager.get_all_users(`SELECT * FROM obuc.jobs_activities`),
        jobs_manager.get_all_users(`SELECT * FROM obuc.jobs_benefits`),
        jobs_manager.get_all_users(`SELECT * FROM obuc.jobs_process_steps`),
        jobs_manager.get_all_users(`SELECT * FROM obuc.jobs_necessary_skills`),
        jobs_manager.get_all_users(`SELECT * FROM obuc.jobs_experience_needed`),
    ])
    .then((response) => {
        const jobs_with_specifications = {};
        function getSpecificationsOfJob(index, valueParam, scpecifications) {
            const arrayAux = Array.from([]);
            response[index].value.forEach((value) => {
                arrayAux.push(value[valueParam]);
                jobs_with_specifications[value.job][scpecifications] = arrayAux;
            })
        }

        response[0].value.forEach((job) => {
            jobs_with_specifications[job.jobtitle] = {
                'salary': job.salary,
                'activities': Array.from([]),
                'benefits': Array.from([]),
                'processSteps': Array.from([]),
                'necessarySkills': Array.from([]),
                'experienceNeeded': Array.from([]),
            }            
        });
        getSpecificationsOfJob(1, 'activity', 'activities');
        getSpecificationsOfJob(2, 'benefit', 'benefits');
        getSpecificationsOfJob(3, 'step', 'processSteps');
        getSpecificationsOfJob(4, 'skill', 'necessarySkills');
        getSpecificationsOfJob(5, 'experience', 'experienceNeeded');

        res.status(200).send(jobs_with_specifications);
    }).catch(error => {
        res.status(500).send(error);
    });
})

app.post('/jobs', (req, res) => {
    jobs_manager.add_user(req.body)
    .then(response => {
        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
            body: "Successfully added job",
        };
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`)
})
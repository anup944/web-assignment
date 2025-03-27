/********************************************************************************
 *  WEB322 – Assignment 05
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *  Name: Anup Oli
 *  Student ID: 146858238
 *  Date: March 26,2025
 ********************************************************************************/

const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const projectModule = require('./project');
const { initialize, getAllProjects, getProjectById, getProjectsBySector } = projectModule;
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => res.render('home', { page: '/' }));
app.get('/about', (req, res) => res.render('about', { page: '/about' }));

app.get('/solutions/projects', async (req, res) => {
  try {
    const sector = req.query.sector;
    const projects = sector ? await getProjectsBySector(sector) : await getAllProjects();
    
    if (projects.length === 0) {
      return res.status(404).render('404', { 
        message: `No projects found for sector: ${sector}`,
        page: ''
      });
    }

    res.render('projects', {
      page: '/solutions/projects',
      projects,
      sector
    });
  } catch (err) {
    res.status(404).render('404', { 
      message: err,
      page: ''
    });
  }
});

app.get('/solutions/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  if (isNaN(projectId)) {
    return res.status(400).render('404', {
      message: "Invalid project ID. Please provide a numeric ID.",
      page: ''
    });
  }

  try {
    const project = await getProjectById(parseInt(projectId));
    res.render('project', { 
      project,
      page: ''
    });
  } catch (err) {
    res.status(404).render('404', { 
      message: err,
      page: ''
    });
  }
});

app.use((req, res) => res.status(404).render('404', { 
  message: "Page not found",
  page: ''
}));

initialize()
  .then(() => app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`)))
  .catch(err => console.log(err));
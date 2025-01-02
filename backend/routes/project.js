const express = require('express');
const { createProject, getAllProjects, updateProject, deleteProject, exportProjectsToCSV, importProjectsFromCSV} = require('../controllers/projectController');
const auth = require('../middleware/auth');
const upload = require("../middleware/multer");
const router = express.Router();

router.post('/', auth, createProject);
router.get('/', auth, getAllProjects);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);


router.get('/export/csv', auth, exportProjectsToCSV);
router.post('/import/csv', auth, upload.single('file'), importProjectsFromCSV);

module.exports = router;

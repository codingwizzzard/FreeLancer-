const csv = require('csv-parser');
const fs = require('fs');
const Project = require('../models/Project');
const { Parser } = require('json2csv');


const createProject = async (req, res) => {
    const { name, dueDate, status } = req.body;

    try {
        const project = new Project({ name, dueDate, status });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create project', error });
    }
};

const getAllProjects = async (req, res) => {
    // try {
    //     const projects = await Project.find();
    //     res.status(200).json(projects);
    // } catch (error) {
    //     res.status(500).json({ message: 'Failed to fetch projects', error });
    // }
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query params (default: 1, 10)

    try {
        const totalProjects = await Project.countDocuments(); // Total number of projects
        const projects = await Project.find()
            .skip((page - 1) * limit) // Skip the previous pages
            .limit(Number(limit)); // Limit the number of results per page

        res.status(200).json({
            total: totalProjects,
            page: Number(page),
            pages: Math.ceil(totalProjects / limit),
            projects,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects', error });
    }
};

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, dueDate, status } = req.body;

    try {
        const project = await Project.findByIdAndUpdate(id, { name, dueDate, status }, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project', error });
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error });
    }
};

const importProjectsFromCSV = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'CSV file is required' });

    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                await Project.insertMany(results);
                res.status(201).json({ message: 'Projects imported successfully' });
            });
    } catch (error) {
        res.status(500).json({ message: 'Error importing projects', error });
    }
};


const exportProjectsToCSV = async (req, res) => {
    try {
        const projects = await Project.find();
        const fields = ['name', 'dueDate', 'status'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(projects);

        res.header('Content-Type', 'text/csv');
        res.attachment('projects.csv');
        return res.send(csv);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting projects', error });
    }
};



module.exports = { createProject, getAllProjects, updateProject, deleteProject, importProjectsFromCSV, exportProjectsToCSV };

import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

const AddProject = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ name: '', dueDate: '', status: 'active' });
    const [editMode, setEditMode] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProjects = async (page = 1) => {
        try {
            const { data } = await API.get(`http://localhost:5000/api/projects?page=${page}&limit=10`);
            setProjects(data.projects);
            setPage(data.page);
            setTotalPages(data.pages);
        } catch (error) {
            toast.error('Failed to fetch projects.');
        }
    };

    useEffect(() => {
        fetchProjects(page);
    }, [page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await API.put(`http://localhost:5000/api/projects/${currentProjectId}`, formData);
                toast.success('Project updated successfully!');
            } else {
                const { data } = await API.post('http://localhost:5000/api/projects', formData);
                setProjects([...projects, data]);
                toast.success('Project added successfully!');
            }
            setFormData({ name: '', dueDate: '', status: 'active' });
            setEditMode(false);
        } catch (error) {
            toast.error('Failed to save the project.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`http://localhost:5000/api/projects/${id}`);
            setProjects(projects.filter((project) => project._id !== id));
            toast.success('Project deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete project.');
        }
    };

    const handleEdit = (project) => {
        const formattedDate = project.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : '';
        
        setFormData({ 
            name: project.name, 
            dueDate: formattedDate, 
            status: project.status 
        });
        setEditMode(true);
        setCurrentProjectId(project._id);
    };

    const handleExportCSV = async () => {
        try {
            const response = await API.get('http://localhost:5000/api/projects/export/csv', {
                responseType: 'blob', 
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'projects.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            toast.error('Failed to export projects.');
        }
    };

    const handleImportCSV = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await API.post('http://localhost:5000/api/projects/import/csv', formData);
            toast.success('Projects imported successfully!');
            fetchProjects(); 
        } catch (error) {
            toast.error('Failed to import projects.');
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Projects</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Project Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        className="form-control"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select id="status" className="form-control" value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editMode ? 'Update Project' : 'Add Project'}
                </button>
            </form>

            <div className="mt-5">
                <div className="d-flex align-items-center justify-content-between">
                    <h3>Project List</h3>
                    <div className='d-flex gap-3'>
                    <button onClick={handleExportCSV} className="btn btn-primary mb-3">Export Projects</button>
                    <div className="mb-3 d-flex align-items-center gap-2">
                        <label htmlFor="csvUpload" className="form-label w-25 fw-bold">Import CSV</label>
                        <input type="file" id="csvUpload" className="form-control" accept=".csv" onChange={handleImportCSV} />
                    </div>
                    </div>

                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.name}</td>
                                <td>{new Date(project.dueDate).toLocaleDateString()}</td>
                                <td>{project.status}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(project)}>Edit</button>
                                    <button className="btn  btn-sm" onClick={() => handleDelete(project._id)}  style={{backgroundColor: 'red', color: 'white'}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between py-3 ">
                    <button className="btn btn-outline-primary"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button className="btn btn-outline-primary"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProject
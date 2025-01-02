# Freelancer Project Management System

This project is a full-stack Freelancer Project Management System designed to help freelancers manage their projects, tasks, and payments efficiently. It combines a user-friendly frontend with a robust backend to offer essential functionalities such as project tracking, payment management, and data import/export.

## Key Features

### Frontend
1. **Dashboard UI**:
   - A simple dashboard displaying project cards with project names, due dates, and statuses (active or completed).
   - Basic earnings overview section with a summary of total earnings and a bar chart (mock data) for the last few months.

2. **Project & Task Management**:
   - Form for adding new projects with fields like project name, due date, and status.
   - Update and delete projects directly from the dashboard.

3. **Payment Tracking UI**:
   - Payments section listing details such as amount and status (paid/unpaid).
   - Option to mark payments as paid.

### Backend
1. **User Authentication**:
   - JWT-based authentication for secure backend access.

2. **Project & Payment Management APIs**:
   - CRUD endpoints for managing projects and payments.
   - Bulk data export feature for projects to CSV.
   - Endpoint for CSV file import to upload bulk project data.

3. **Basic Payment Integration**:
   - Payment simulation endpoint to mock marking payments as paid (simulating a payment gateway like Stripe).

### Full-Stack Integration
1. **Dashboard Data Integration**:
   - Fetch and display project data from the backend on the frontend dashboard.
   - Integrate payment tracking to show real-time payment statuses.

2. **CSV Export & Import Integration**:
   - Export project data to CSV directly from the dashboard.
   - File upload feature for importing projects via CSV with user feedback for success or errors.

3. **Payment Simulation Integration**:
   - Mark payments as paid on the frontend.
   - Real-time updates to payment statuses when changes are made.

## Tech Stack

### Frontend
- Framework: React
- Styling: Basic CSS for a clean and simple UI

### Backend
- Framework: Node.js with Express
- Database: MongoDB
- Authentication: JSON Web Token (JWT)

### Tools
- CSV handling: CSV import/export functionality
- Payment simulation: Mocked payment gateway integration

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/codingwizzzard/FreeLancer-.git
   cd FreeLancer-
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Environment Variables**:
   - Configure `.env` file in the backend with:
     - `MONGO_URL`: MongoDB connection string
     - `JWT_SECRET`: Secret key for JWT
     - `PORT`:5000

5. **Run the Application**:
   - Ensure both frontend and backend servers are running.
   - Access the application at `http://localhost:3000`.

## Usage

1. **Dashboard**:
   - View and manage projects and tasks.
   - Track earnings and payment statuses.

2. **Project Management**:
   - Add, update, and delete projects.

3. **Payments**:
   - View payment details and mark payments as paid.

4. **Data Import/Export**:
   - Export project data to CSV.
   - Import projects via CSV files.


## License
This project is licensed under the MIT License. See the LICENSE file for details.



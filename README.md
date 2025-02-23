## Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (with the default port 5432)
- [npm](https://www.npmjs.com/)

## Database Setup

1. **Install PostgreSQL:**
If you haven’t installed PostgreSQL, use your system package manager or Homebrew (on macOS):
   ```bash
   brew install postgresql@14
   ```
2. **Start PostgreSQL:**   
   ```bash
   brew services start postgresql@14
   ```
3. **Create a database:**  
  Open a terminal and run:  
   ```bash
   createdb taskdb
   ```
4. **Run migration to create tables:**  
   Connect to your database
   ```bash
   psql taskdb
   ```
   then you want to execute these SQL commands
   ```sql
   CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL);

   CREATE TABLE tasks (
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description TEXT,
   "isComplete" BOOLEAN DEFAULT false,
   "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE);
   ```
   then you can exit the psql by `\q`
## Environment Variables
   Create a `.env` file in both your frontend and backend folders.   
   **Backend**
   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/taskdb
   JWT_SECRET=your_key_here
   ```   
   **Frontend**
   ```env
   REACT_APP_API_URL=http://localhost:1000
   ```
   ## Running the Backend
   1. Navigate to the backend folder
   ```bash
   cd backend
   ```
   2. Install dependencies
   ```bash
   npm install
   ```
   3. Run the backend server in dev mode
   ```bash
   npm run dev
   ```

## Running the Frontend
1. Navigate to the frontend folder
```bash
cd frontend
```
2. Install dependencies
```bash
npm install
```
3. Run the backend server in dev mode
```bash
npm start
```
This will launch in your browser at http://localhost:3000

## Testing
**Backend Testing**
This is manually testable by looking at the database after registering an account and tasks.  
**Check Registered Users**
```bash
SELECT * FROM users;
```

This will display all entries in the users table.
Note: Passwords are stored as hashed values
**Check Tasks**
```bash
SELECT * FROM tasks;
```
If you must, you can delete all data from tables by running
```sql
TRUNCATE TABLE tasks, users RESTART IDENTITY CASCADE;
```
## Frontend Testing
**UI Testing**
* You can test this by registering a new user.
* Logging in with the registered user.
* Creating, updating, and deleting tasks.
## Notes
I expect the salary to be $4,333.33 per month.
Thank you for this opportunity!

## Video
https://imgur.com/0u3Bo9T

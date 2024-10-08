// src/pages/api/tasks.js
import openDb from '../../lib/db'; // Assuming you have your db connection set up in lib/db.js

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { userId, taskID, task, date, time, location, lat, lon, weatherRestrictions, details, requiredTemperature, idealHumidity } = req.body;

    try {
      // Insert a new task into the database
      await db.run('INSERT INTO tasks (userId, taskID, task, date, time, location, lat, lon, weatherRestrictions, details, requiredTemperature, idealHumidity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [userId, taskID, task, date, time, location, lat, lon, JSON.stringify(weatherRestrictions), details, JSON.stringify(requiredTemperature), JSON.stringify(idealHumidity)]);
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: 'Failed to create task' }); 
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      // Fetch tasks for the specific userId
      const tasks = await db.all('SELECT * FROM tasks WHERE userId = ?', [userId]);
      res.status(200).json({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else if (req.method === 'PUT') {
    const { taskID, task, date, time, location, lat, lon, weatherRestrictions, details, requiredTemperature, idealHumidity } = req.body;

    try {
      // Update the task in the database
      const result = await db.run('UPDATE tasks SET task = ?, date = ?, time = ?, location = ?, lat = ?, lon = ?, weatherRestrictions = ?, details = ?, requiredTemperature = ?, idealHumidity = ? WHERE taskID = ?', 
      [task, date, time, location, lat, lon, JSON.stringify(weatherRestrictions), details, JSON.stringify(requiredTemperature), JSON.stringify(idealHumidity), taskID]);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  } else if (req.method === 'DELETE') {
    const { taskID } = req.query;

    try {
      // Delete the task from the database
      const result = await db.run('DELETE FROM tasks WHERE taskID = ?', [taskID]);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

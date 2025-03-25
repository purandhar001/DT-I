import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./context/AuthContext";
import "./Routine.css";

const Routine = () => {
  const { currentUser } = useAuth();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [tasks, setTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", time: "", duration: "1h" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutine();
  }, [currentUser]);

  const loadRoutine = async () => {
    try {
      const routineRef = doc(db, "routines", currentUser.uid);
      const routineDoc = await getDoc(routineRef);
      if (routineDoc.exists()) {
        setTasks(routineDoc.data().tasks);
      }
    } catch (error) {
      console.error("Error loading routine:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveRoutine = async () => {
    try {
      const routineRef = doc(db, "routines", currentUser.uid);
      await setDoc(routineRef, { tasks });
    } catch (error) {
      console.error("Error saving routine:", error);
    }
  };

  const handleSaveTask = () => {
    if (newTask.name && newTask.time) {
      setTasks(prev => {
        const updatedTasks = { ...prev };
        if (editingIndex !== null) {
          updatedTasks[selectedDay][editingIndex] = newTask;
        } else {
          updatedTasks[selectedDay] = [...updatedTasks[selectedDay], newTask];
        }
        return updatedTasks;
      });
      setShowModal(false);
      setNewTask({ name: "", time: "", duration: "1h" });
      setEditingIndex(null);
      saveRoutine();
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(prev => {
      const updatedTasks = { ...prev };
      updatedTasks[selectedDay].splice(index, 1);
      return updatedTasks;
    });
    saveRoutine();
  };

  const handleShareRoutine = async () => {
    try {
      const routineUrl = `${window.location.origin}/routine/${currentUser.uid}`;
      await navigator.clipboard.writeText(routineUrl);
      alert("Routine link copied to clipboard!");
    } catch (error) {
      console.error("Error sharing routine:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="routine-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header" style={{ backgroundColor: "#ffffff", color: "#000000", padding: "20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Routine Management</h1>
        <div className="buttons">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="save-btn" style={{ backgroundColor: "#1f2937", padding: "12px 20px", borderRadius: "8px", fontSize: "16px", color: "white", border: "none", cursor: "pointer" }} onClick={saveRoutine}>Save Routine</motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="share-btn" style={{ backgroundColor: "#ffffff", color: "#000000", padding: "12px 20px", borderRadius: "8px", fontSize: "16px", border: "1px solid #d1d5db", cursor: "pointer", marginLeft: "10px" }} onClick={handleShareRoutine}>Share</motion.button>
        </div>
      </div>
      <div className="routine-content">
        <motion.div className="days-sidebar">
          {Object.keys(tasks).map((day) => (
            <motion.button
              key={day}
              className={`day-button ${selectedDay === day ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </motion.button>
          ))}
        </motion.div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>{selectedDay}'s Schedule</h2>
            <motion.button
              className="add-task-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
            >
              Add Task
            </motion.button>
          </div>

          <AnimatePresence>
            {tasks[selectedDay].map((task, index) => (
              <motion.div
                key={index}
                className="task-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="task-info">
                  <h3>{task.name}</h3>
                  <p>{task.time} - {task.duration}</p>
                </div>
                <div className="task-actions">
                  <button onClick={() => {
                    setNewTask(task);
                    setEditingIndex(index);
                    setShowModal(true);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2>{editingIndex !== null ? 'Edit Task' : 'Add New Task'}</h2>
              <input
                type="text"
                placeholder="Task name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              <input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              />
              <select
                value={newTask.duration}
                onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
              >
                <option value="30m">30 minutes</option>
                <option value="1h">1 hour</option>
                <option value="2h">2 hours</option>
                <option value="3h">3 hours</option>
              </select>
              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={handleSaveTask}>Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Routine;
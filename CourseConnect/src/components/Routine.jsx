import React, { useState } from 'react';
import "./Routine.css";

export default function Routine() {
  const [routine, setRoutine] = useState({
    Sunday: [{ time: "10:00 AM", plan: "Science Lab" }, { time: "2:00 PM", plan: "Study" }],
    Monday: [{ time: "9:00 AM", plan: "Math Class" }, { time: "5:00 PM", plan: "Gym" }],
    Tuesday: [{ time: "10:00 AM", plan: "Science Lab" }, { time: "2:00 PM", plan: "Study" }],
    Wednesday: [{ time: "10:00 AM", plan: "Science Lab" }, { time: "2:00 PM", plan: "Study" }],
    Thursday: [{ time: "10:00 AM", plan: "Science Lab" }, { time: "2:00 PM", plan: "Study" }],
    Friday: [{ time: "10:00 AM", plan: "Science Lab" }, { time: "2:00 PM", plan: "Study" }],
    Saturday: [{ time: "10:00 AM", plan: "Science Lab" }, { time: "2:00 PM", plan: "Study" }],
  });

  const handleEdit = (day) => {
    const action = prompt("Do you want to Add a new plan or Modify an existing one? (Type: Add/Modify)");
    if (!action) return;

    if (action.toLowerCase() === "add") {
      const newPlan = prompt("Enter new plan:");
      const newTime = prompt("Enter time (e.g., 3:00 PM):");
      if (newPlan && newTime) {
        setRoutine(prev => ({
          ...prev,
          [day]: [...prev[day], { time: newTime, plan: newPlan }]
        }));
      }
    } else if (action.toLowerCase() === "modify") {
      const index = prompt(`Enter the number of the plan to modify (1-${routine[day].length}):`);
      if (!index || index < 1 || index > routine[day].length) return;
      const newPlan = prompt("Enter new plan:");
      const newTime = prompt("Enter new time (e.g., 3:00 PM):");
      if (newPlan && newTime) {
        setRoutine(prev => {
          const updatedDay = [...prev[day]];
          updatedDay[index - 1] = { time: newTime, plan: newPlan };
          return { ...prev, [day]: updatedDay };
        });
      }
    }
  };

  return (
    <div className="routine-container">
      <h2 className="routine-title">Weekly Routine</h2>
      <table className="routine-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Plan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(routine).map(([day, plans]) => (
            plans.map((item, index) => (
              <tr key={`${day}-${index}`}>
                {index === 0 && <td rowSpan={plans.length}>{day}</td>}
                <td>{item.time}</td>
                <td>{item.plan}</td>
                {index === 0 && <td rowSpan={plans.length}><button className="edit-btn" onClick={() => handleEdit(day)}>Edit</button></td>}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

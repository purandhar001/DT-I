import React from "react";
import { motion } from "framer-motion";
import "./Courses.css";

export const courses = [
  { id: 1, title: "Full Stack Development", description: "Learn MERN Stack with hands-on projects." },
  { id: 2, title: "AI & Machine Learning", description: "Master ML concepts and build AI models." },
  { id: 3, title: "Cybersecurity Essentials", description: "Understand ethical hacking and security protocols." },
  { id: 4, title: "Game Development", description: "Create games using Unity and C#." }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

const AnimatedCourses = () => {
  return (
    <motion.div
      className="courses-container"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <h2 className="section-title">Recommended Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            className="course-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedCourses;

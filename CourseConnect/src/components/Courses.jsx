import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/context/AuthContext";
import "./Courses.css";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

const AnimatedCourses = () => {
  const { currentUser } = useAuth();
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [joinedCounts, setJoinedCounts] = useState({});
  const [courses] = useState([
    { id: 1, title: "Full Stack Development", description: "Learn MERN Stack with hands-on projects." },
    { id: 2, title: "AI & Machine Learning", description: "Master ML concepts and build AI models." },
    { id: 3, title: "Cybersecurity Essentials", description: "Understand ethical hacking and security protocols." },
    { id: 4, title: "Game Development", description: "Create games using Unity and C#." }
  ]);
  
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setJoinedCourses(userDoc.data().joinedCourses || []);
      }
    };
    
    const fetchCounts = async () => {
      let counts = {};
      for (let course of courses) {
        const courseRef = doc(db, "courses", course.title);
        const courseDoc = await getDoc(courseRef);
        counts[course.title] = courseDoc.exists() ? (courseDoc.data().users || []).length : 0;
      }
      setJoinedCounts(counts);
    };
    
    fetchUserCourses();
    fetchCounts();
  }, [currentUser, courses]);

  const joinCourse = async (courseTitle) => {
    if (!currentUser) return;

    setJoinedCourses(prev => [...prev, courseTitle]);
    setJoinedCounts(prev => ({ ...prev, [courseTitle]: (prev[courseTitle] || 0) + 1 }));

    const courseRef = doc(db, "courses", courseTitle);
    const userRef = doc(db, "users", currentUser.uid);
    const groupRef = doc(db, "officialChats", "courseGroups");

    try {
      const courseDoc = await getDoc(courseRef);
      if (!courseDoc.exists()) {
        await setDoc(courseRef, { users: [] });
      }

      await updateDoc(courseRef, { users: arrayUnion(currentUser.displayName) });
      await updateDoc(userRef, { joinedCourses: arrayUnion(courseTitle) });

      const groupDoc = await getDoc(groupRef);
      if (!groupDoc.exists()) {
        await setDoc(groupRef, { groups: [] });
      }

      await updateDoc(groupRef, { groups: arrayUnion(courseTitle) });
    } catch (error) {
      console.error("Error joining course:", error);
    }
  };

  const leaveCourse = async (courseTitle) => {
    if (!currentUser) return;

    setJoinedCourses(prev => prev.filter(course => course !== courseTitle));
    setJoinedCounts(prev => ({ ...prev, [courseTitle]: Math.max((prev[courseTitle] || 1) - 1, 0) }));

    const courseRef = doc(db, "courses", courseTitle);
    const userRef = doc(db, "users", currentUser.uid);
    const groupRef = doc(db, "officialChats", "courseGroups");

    try {
      const courseDoc = await getDoc(courseRef);
      if (courseDoc.exists()) {
        await updateDoc(courseRef, { users: arrayRemove(currentUser.displayName) });
      }

      await updateDoc(userRef, { joinedCourses: arrayRemove(courseTitle) });

      const groupDoc = await getDoc(groupRef);
      if (groupDoc.exists()) {
        await updateDoc(groupRef, { groups: arrayRemove(courseTitle) });
      }
    } catch (error) {
      console.error("Error leaving course:", error);
    }
  };

  return (
    <motion.div className="courses-container" initial="hidden" animate="visible" transition={{ staggerChildren: 0.2 }}>
      <h2 className="section-title">Joined Courses</h2>
      <div className="courses-grid">
        {joinedCourses.map((courseTitle) => (
          <motion.div key={courseTitle} className="course-card" variants={cardVariants} whileHover="hover">
            <h3 className="course-title">{courseTitle}</h3>
            <button className="leave-button" onClick={() => leaveCourse(courseTitle)}>Leave</button>
            <p className="joined-count">Joined: {joinedCounts[courseTitle] || 0}</p>
          </motion.div>
        ))}
      </div>
      
      <h2 className="section-title">Recommended Courses</h2>
      <div className="courses-grid">
        {courses.filter(course => !joinedCourses.includes(course.title)).map((course) => (
          <motion.div key={course.id} className="course-card" variants={cardVariants} whileHover="hover">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <button className="join-button" onClick={() => joinCourse(course.title)}>Join</button>
            <p className="joined-count">Joined: {joinedCounts[course.title] || 0}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedCourses;

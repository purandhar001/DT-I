import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, query, onSnapshot, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useAuth } from "../components/context/AuthContext";
import "./Network.css";
import { courses } from "./Courses"; // Import courses from Courses.jsx

const Networking = () => {
  const { currentUser } = useAuth();
  const [officialChats, setOfficialChats] = useState(["Global Discussions", ...courses.map(course => course.title)]);
  const [localChats, setLocalChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newChatName, setNewChatName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("official");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().name);
      }
    };
    fetchUsername();
  }, [currentUser]);

  useEffect(() => {
    const q = query(collection(db, "localChats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLocalChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const q = query(collection(db, `chats/${selectedChat}/messages`));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, `chats/${selectedChat}/messages`), {
      text: newMessage,
      uid: currentUser.uid,
      name: username,
      createdAt: new Date()
    });
    setNewMessage("");
  };

  const createLocalChat = async () => {
    if (!newChatName.trim()) return;
    await addDoc(collection(db, "localChats"), { name: newChatName, members: [currentUser.uid] });
    setNewChatName("");
    setShowModal(false);
  };

  const joinChat = async (chatId) => {
    const chatRef = doc(db, "localChats", chatId);
    await updateDoc(chatRef, { members: arrayUnion(currentUser.uid) });
    setSelectedChat(chatId);
  };

  return (
    <motion.div className="networking-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="networking-title">Networking</h1>
      <div className="networking-layout">
        {/* Sidebar */}
        <motion.div className="networking-sidebar" whileHover={{ scale: 1.02 }}>
          <h2>Chat Groups</h2>
          <p>Connect with peers and collaborate on projects</p>
          <input type="text" placeholder="Search groups..." className="search-bar" />
          <div className="tab-buttons">
            <button className={`tab ${tab === "official" ? "active" : ""}`} onClick={() => setTab("official")}>Official</button>
            <button className={`tab ${tab === "local" ? "active" : ""}`} onClick={() => setTab("local")}>Local</button>
          </div>
          <div className="chat-list">
            {(tab === "official" ? officialChats : localChats).map((chat, index) => (
              <motion.div key={index} className="chat-group" whileHover={{ scale: 1.02 }} onClick={() => setSelectedChat(chat.name || chat)}>
                <h3>{chat.name || chat}</h3>
                <p>Discussion for {chat.name || chat}</p>
                {tab === "local" && <button onClick={() => joinChat(chat.id)}>Join</button>}
              </motion.div>
            ))}
          </div>
          {tab === "local" && <button className="add-group-btn" onClick={() => setShowModal(true)}>+ Create Group</button>}
        </motion.div>
        
        {/* Chat Section */}
        <motion.div className="chat-section" initial={{ y: 50 }} animate={{ y: 0 }}>
          {selectedChat ? (
            <>
              <h2>{selectedChat} Chat</h2>
              <div className="chat-messages">
              {messages.map((msg) => (
                <motion.div key={msg.id} className={`message ${msg.uid === currentUser.uid ? "sent" : "received"}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                  <div className="message-name">{msg.name}</div> {/* Displays the sender's name */}
                  {msg.text}
                </motion.div>
              ))}

              </div>
              <div className="chat-input">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={sendMessage}>Send</motion.button>
              </div>
            </>
          ) : (
            <p>Select a chat group to start messaging.</p>
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <h2>Create a Local Group</h2>
              <input type="text" placeholder="Group Name" value={newChatName} onChange={(e) => setNewChatName(e.target.value)} />
              <div className="modal-buttons">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={createLocalChat}>Create</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Networking;

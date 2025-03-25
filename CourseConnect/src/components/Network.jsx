import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { collection, query, onSnapshot, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../components/context/AuthContext";
import "./Network.css";

const Network = () => {
  const { currentUser } = useAuth();
  const [officialChats, setOfficialChats] = useState(["Global Discussions"]);
  const [localChats, setLocalChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [tab, setTab] = useState("official");

  useEffect(() => {
    const fetchOfficialChats = async () => {
      const docRef = doc(db, "officialChats", "courseGroups");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOfficialChats(["Global Discussions", ...(docSnap.data().groups || [])]);
      }
    };
    
    const unsubscribe = onSnapshot(doc(db, "officialChats", "courseGroups"), (docSnap) => {
      if (docSnap.exists()) {
        setOfficialChats(["Global Discussions", ...(docSnap.data().groups || [])]);
      }
    });
    
    fetchOfficialChats();
    return () => unsubscribe();
  }, []);

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
      createdAt: new Date()
    });
    setNewMessage("");
  };

  return (
    <motion.div className="network-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="network-title">Networking</h1>
      <motion.div className="network-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="sidebar left-section" whileHover={{ scale: 1.02 }}>
          <h2>Chat Groups</h2>
          <p>Connect with peers and collaborate on projects</p>
          <input type="text" placeholder="Search groups..." className="search-bar" />
          <div className="tab-buttons">
            <button className={`tab ${tab === "official" ? "active" : ""}`} onClick={() => setTab("official")}>Official</button>
            <button className={`tab ${tab === "local" ? "active" : ""}`} onClick={() => setTab("local")}>Local</button>
          </div>
          <div className="chat-list">
            {(tab === "official" ? officialChats : localChats).map((chat, index) => (
              <motion.div 
                key={index} 
                className="chat-group" 
                whileHover={{ scale: 1.02 }} 
                onClick={() => setSelectedChat(chat.name || chat)}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.2 }}
              >
                <h3>{chat.name || chat}</h3>
                <p>{`Global discussion for ${chat.name || chat}`}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="chat-section right-section" initial={{ y: 50 }} animate={{ y: 0 }}>
          {selectedChat ? (
            <>
              <h2 className="chat-header">{selectedChat} Chat</h2>
              <div className="chat-messages">
                {messages.map((msg) => (
                  <motion.div key={msg.id} className="message" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    {msg.text}
                    <span>{msg.createdAt.toLocaleTimeString()}</span>
                  </motion.div>
                ))}
              </div>
              <div className="chat-input">
                <input 
                  type="text" 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder="Type a message..." 
                />
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={sendMessage}>
                  Send
                </motion.button>
              </div>
            </>
          ) : (
            <p>Select a chat group to start messaging.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Network;

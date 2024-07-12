import './App.css';
import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        setUser(null);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/new">New Article</NavLink>
          {user ? (
            <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles/:urlId" element={<Article />} />
          <Route path="/new" element={<FormArticle />} />
          <Route path="/edit/:id" element={<FormArticle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

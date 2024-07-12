import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './formArticle.css';

export default function FormArticle() {  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const ref = doc(db, 'articles', id);
      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
          setIsEditing(true);
        } else {
          console.error("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();   
    const article = { title, author, description };

    try {
      if (isEditing) {
        const ref = doc(db, 'articles', id);
        await updateDoc(ref, article);
      } else {
        const ref = collection(db, 'articles');
        await addDoc(ref, article);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="form-article">
      <h2 className="page-title">{isEditing ? 'Edit Article' : 'Add a New Article'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>
        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

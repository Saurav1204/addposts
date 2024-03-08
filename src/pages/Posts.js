import React, { useState, useEffect } from 'react';
import '../css/modalcs.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [editPostData, setEditPostData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.125:3000/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }

        });

        if (response.status === 200) {
          setPosts(response.data);
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token]);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const openModal = () => {

    setIsModalOpen(true);

  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const removetoken = (e) => {
    e.preventDefault();

    localStorage.removeItem("token")
    navigate('/Login');

  }

  const handleAddBook = async () => {

    try {
      // Get the input values from the modal
      const title = document.querySelector('.title').value;
      const author = document.querySelector('.authname').value;
      const description = document.querySelector('.desc').value;

      // Make sure all fields are filled
      if (!title || !author || !description) {
        console.error('Please fill all fields');
        return;
      }

      // Send a POST request to the server to add the new book
      const response = await axios.post(
        'http://192.168.1.125:3000/posts',
        {
          title,
          author,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    
      console.log('Book added successfully:', response.data);
    
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
 
  const editdata = async (postid) => {

    try {
      // Get the input values from the modal
      const title = document.querySelector('.title').value;
      const author = document.querySelector('.authname').value;
      const description = document.querySelector('.desc').value;
    
      // Make the PUT request to update the post
      const response = await axios.put(`http://192.168.1.125:3000/posts/${postid}`, {
        title,
        author,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {

        setEditPostData({ title, author, description });
  
        console.log('Post edited successfully:', response.data);
      } else {
        console.error('Failed to edit post:', response.data);
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  
  const deletedata = async (postId) => {
    try {
      // Send a DELETE request to delete both the post content and its associated ID
      const response = await axios.delete(`http://192.168.1.125:3000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
      console.log('Post deleted successfully:', response.data);
      }  
      else{
      console.log('Post deleted Not successful:', response.data);
        
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  
  const fetchPostDetails = async (postId) => {
    try {
      const response = await axios.get(`http://192.168.1.125:3000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setEditPostData(response.data);
      } else {
        throw new Error('Failed to fetch post details');
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const handleEditButtonClick = (post) => {
    fetchPostDetails(post.id);
    editdata(post.id);
    openModal();
  };


  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">

            <span className="close" onClick={closeModal}>&times;</span>

            <div className="modal-header">
              <h2>Add book</h2>
            </div>

            <div className="modal-body">
             <form className='modalform'>
              <div>
              <label>Enter Book Title : </label>
              <input type='text' className='title' placeholder='Enter book title' defaultValue={editPostData?.title || ''} /><br />
              </div>
              <div>
              <label>Enter Author Name : </label>
              <input type='text' className='authname' placeholder='Enter author name' defaultValue={editPostData?.author || ''} /><br />
              </div>
              <div>
                <label>Description for book : </label>
              <input type='text' className='desc' placeholder='Description of book' defaultValue={editPostData?.description || ''} /><br />
              </div>

              {token && <button type='submit' className='btned' onClick={handleAddBook}>Add Book</button>}
              {token && <button type='submit' className='btned' onClick={() => editdata(editPostData?.id)}>Edit Data</button>}
              </form>



            </div>

            <div className="modal-footer">
              <button className='btncl' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className='posts'>
        <div className='lablename'>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="305" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
          </svg>
          <h2>List group</h2>
          
          <button className='btned' onClick={openModal}>Add data</button>
          <button className='btned' onClick={removetoken}>Logout</button>

        </div>  
        
        {posts.map(post => (
          <a key={post.id} onClick={() => handlePostClick(post.id)}> 
            <div className={post.id === selectedPostId ? 'selected-post' : ''}> 
              <p><strong>Title:</strong> {post.title}</p>
              <p><strong>Author:</strong> {post.author}</p>
              <p><strong>Description:</strong> {post.description}</p>
              
              <button className='btned' onClick={() => handleEditButtonClick(post)}>Edit Modal</button>
              <button className='btned' onClick={() => deletedata(post.id)}>Delete</button>
              <br />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

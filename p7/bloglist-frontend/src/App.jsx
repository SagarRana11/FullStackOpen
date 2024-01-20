import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import UserList from './components/Userlist';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogList from './components/Bloglist';
import BlogForm from './components/Blogform';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { initializeBlogs, like, comment } from './reducers/blogReducer';
import { initializeAllUsers } from './reducers/userReducer';
import { initializeUser } from './reducers/authReducer';
import { setNotification } from './reducers/notificationReducer';
import { Table, Button } from 'react-bootstrap';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blog);
  const navigate = useNavigate();

  const margin = {
    margin: 5,
  };

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const handleLikes = (blogToLike) => {
    dispatch(like(blogToLike));
    dispatch(setNotification(`Blog ${blogToLike.title} successfully updated`, 'success', 5));
  };

  const handleComment = (event, foundBlog) => {
    event.preventDefault();
    const commentToAdd = event.target.comment.value;
    event.target.comment.value = '';
    dispatch(comment(foundBlog, commentToAdd));
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/users/:id"
          element={
            user === null ? (
              <div>
                <Notification />
                <LoginForm />
              </div>
            ) : (
              <div>
                <Header />
                <h2>Bloglist</h2>
                <Notification />
                <h3>{user.name}</h3>
                <h4>Added blogs</h4>
                {!users ? null : (
                  <Table striped>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            user === null ? (
              <div>
                <Notification />
                <LoginForm />
              </div>
            ) : (
              <div>
                <Header />
                <h2>Bloglist</h2>
                <Notification />
                <div>
                  <h2>Title</h2>
                  <p>URL</p>
                  <p>
                    Likes{' '}
                    <Button variant="primary" onClick={() => handleLikes()}>
                      Like
                    </Button>
                  </p>
                  <p>Added by Author</p>
                  <h3>Comments</h3>
                  <form onSubmit={(event) => handleComment(event)}>
                    <div>
                      <input id="comment" type="text" name="comment" />
                      <Button style={margin} variant="primary" id="comment-button" type="submit">
                        Add Comment
                      </Button>
                    </div>
                  </form>
                  <ul>
                    <li>Comment 1</li>
                    <li>Comment 2</li>
                  </ul>
                </div>
              </div>
            )
          }
        />
        <Route
          path="/blogs"
          element={
            user === null ? (
              <div>
                <Notification />
                <LoginForm />
              </div>
            ) : (
              <div>
                <Header />
                <h2>Bloglist</h2>
                <Notification />
                <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                <Table striped>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id}>
                        <td>{blog.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )
          }
        />
        <Route
          path="/users"
          element={
            user === null ? (
              <div>
                <Notification />
                <LoginForm />
              </div>
            ) : (
              <div>
                <Header />
                <h2>Bloglist</h2>
                <Notification />
                <h2>Users</h2>
                <UserList />
              </div>
            )
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Notification />
              <LoginForm />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

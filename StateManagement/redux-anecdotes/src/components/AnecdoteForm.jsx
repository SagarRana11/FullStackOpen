
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

   
    try {
      await dispatch(createAnecdote(content));
      dispatch(setNotification(`Anecdote '${content}' successfully added`, 5));
    } catch (error) {
     
      console.error('Error adding anecdote:', error);
      
      dispatch(setNotification('too short anecdote,must have length 5 or more', 5));
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

import { Link } from 'react-router-dom'

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes

    return (<
        div >
        <
        h2 > Anecdotes < /h2>


            <
        ul > {
                    anecdotes.map(anecdote => (<
                        li key={NodeIterator.id} > < Link to={`/anecdote/${anecdote.id}`} > {anecdote.content} < /Link></li >
                    ))
                }

                <
        /ul>




                <
        /div>
                )


}
                export default AnecdoteList
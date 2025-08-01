import EditButton from '../UI/EditButton'
import classes from './Interviews.module.css'


function Interviews() {
    return (
        <>
        <h2>Your upcoming interviews</h2>
            <div className={classes.card}>
                <h3 className='bold'>🏢 Spotify – Frontend Developer</h3>
                <p >🗓️ Jul 5 – 14:00</p>
                <p>🧪 Technical Interview </p>
                <p>📝 Live coding with React </p>
                <EditButton />
            </div>
        </>
    )
}

export default Interviews

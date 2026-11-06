
const root = ReactDOM.createRoot( document.getElementById('root'))

const all_lessons = 110
const completed_lessons = 37

const myStyle = {
    color: 'blue',
    fontSize: '40px',
    textDecoration: 'underline'

}

const style = {
    color: 'brown',
    fontSize: '25px',
    fontWeight: 'bold',
    textDecoration: 'underline'
}

const profile = <>
    <h1 style={myStyle}>My student profile</h1>
    <p style={style}>Name: Alina </p>
    <p style={style}>Age: 22</p>
    <p style={style}>City: Ashkelon </p>
    <p style={style}>Name of course: Full-Stack Development</p>
    <p style={style}>Completed lessons:{completed_lessons}</p>
    <p style={style}>Remaining lessons:{all_lessons - completed_lessons}</p>
    </>


root.render(profile)


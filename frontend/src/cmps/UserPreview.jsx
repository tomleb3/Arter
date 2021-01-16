import { Link } from 'react-router-dom'

export function UserPreview({ user }) {
    // console.log(user)

    return <section className="user-preview">
        <Link to={`/user/${user._id}`}>
            <img className="user-img" src={user.imgUrls.profile}></img>
            <div className="flex a-end"><h3>{user.fullname}</h3></div>
        </Link>
        {/* <h3>{user.fullname}</h3> */}
    </section>
}
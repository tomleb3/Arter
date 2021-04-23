import { Link } from 'react-router-dom'

export function UserPreview({ user, tallMode }) {

    return <section className={tallMode ? "user-preview" : "user-preview min"}>
        <Link to={`/user/${user._id}`}>
            <img src={user.imgUrls.profile} alt=""></img>
            <div className="flex a-end"><h3>{user.fullname}</h3></div>
        </Link>
    </section>
}
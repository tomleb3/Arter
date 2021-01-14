import { UserPreview } from "./UserPreview.jsx"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function getArtists(items, users) {
    console.log(items, users)

    // if (items.
}

export function UserList({ items, users }) {
    console.log(getArtists(items, users))

    if (!users || !users.length) {
        return <div className="user-list empty main-layout">
            <div className="loader"></div>
        </div>
    }

    return <div className="flex main-layout">
        <div className="chevron flex a-center"><ChevronLeftIcon fontSize="large" /></div>
        <section className="user-list grid main-layout">
            {users && users.map(user => {
                return <UserPreview key={user._id} user={user} />
            })}
        </section>
        <div className="chevron flex a-center j-end"><ChevronRightIcon fontSize="large" /></div>
    </div>
}
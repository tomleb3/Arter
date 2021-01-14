import { UserPreview } from "./UserPreview.jsx"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

export function UserList({ items, users }) {
    return (
        <Carousel>
                {users && users.map(user => {
                    return <UserPreview key={user._id} user={user} />
                })}
        </Carousel>
    )
}

function Item(props) {
    return (
        <Paper>
            <h2>{props.user.title}</h2>
            <p>{props.user.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}






// function getArtists(items, users) {
//     console.log(items, users)

//     let featuredArtists = items.map(item => {
//         console.log(item.seller.fullname)
//         items.sort();
//     })
//     if (
//     return featuredArtists
// }

// export function UserList({ items, users }) {

//     if (!users || !users.length) {
//         return <div className="user-list empty main-layout">
//             <div className="loader"></div>
//         </div>
//     }

//     // let featuredArtists = getArtists(items, users)

//     return <div className="flex main-layout">
//         <div className="chevron flex a-center"><ChevronLeftIcon fontSize="large" /></div>
//         <section className="user-list grid main-layout">
//             {users && users.map(user => {
//                 return <UserPreview key={user._id} user={user} />
//             })}
//         </section>
//         <div className="chevron flex a-center j-end"><ChevronRightIcon fontSize="large" /></div>
//     </div>
// }
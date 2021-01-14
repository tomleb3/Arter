import { UserPreview } from "./UserPreview.jsx"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export function UserList({ users, items }) {
    return <Swiper
        className="user-list main-layout"
        spaceBetween={30}
        slidesPerView={5}
        navigation
        Autoplay
        EffectFade
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>

        {users && users.map(user => {
            return <SwiperSlide>
                <UserPreview key={user._id} user={user} />
            </SwiperSlide>
        })}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
... */}
    </Swiper>
}



// export function UserList({ items, users }) {
//     return (
//         <Carousel>
//             {users && users.map(user => {
//                 return <UserPreview key={user._id} user={user} />
//             })}
//         </Carousel>
//     )
// }

// function Item(props) {
//     return (
//         <Paper>
//             <h2>{props.user.title}</h2>
//             <p>{props.user.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }






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
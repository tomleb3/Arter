import { UserPreview } from './UserPreview.jsx'
import Swiper from 'react-id-swiper'
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


function filterArtists(users, items) {
    const artistIds = items.reduce((accUserMap, item, idx) => {
        const { _id } = item.seller
        if (!accUserMap.includes(_id)) accUserMap.push(_id)
        return accUserMap
    }, [])
    const artists = users.filter(user => artistIds.includes(user._id))
    return artists
}


export function UserList({ users, items, tallMode }) {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    if (!users || !users.length) return <div></div>
    const artists = filterArtists(users, items)

    return <div className="user-list">
        <Swiper
            spaceBetween={30}
            breakpoints={{
                // when window width is >= 580px
                500: {
                    slidesPerView: 2
                },
                800: {
                    slidesPerView: 3
                },
                1000: {
                    slidesPerView: 4
                },
                1300: {
                    slidesPerView: 5
                },
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }}
            observer
            updateOnWindowResize
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            // pagination={{
            //     el: '.swiper-pagination',
            //     clickable: true
            // }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}>

            {artists.map(artist => {
                return <SwiperSlide key={artist._id}>
                    <UserPreview user={artist} tallMode={tallMode} />
                </SwiperSlide>
            })}
        </Swiper>
    </div>
}
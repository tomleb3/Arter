import { UserPreview } from "./UserPreview.jsx"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


export function UserList({ users, items }) {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    if (!users || !users.length) return <div></div>
    return <Swiper
        className="user-list main-layout"
        spaceBetween={30}
        slidesPerView={5}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>

        {users.map(user => {
            return <SwiperSlide key={user._id}>
                <UserPreview user={user} />
            </SwiperSlide>
        })}
    </Swiper>
}
import { Component } from 'react'
import { connect } from 'react-redux'
import { itemService } from '../services/itemService.js'
import { Link } from 'react-router-dom'
import { ItemPreview } from "../cmps/ItemPreview.jsx"
import Swiper from 'react-id-swiper'
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

class _ItemDetails extends Component {

    state = {
        item: null,
        otherItems: []
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        const { id } = this.props.match.params
        const item = await itemService.getById(id)
        const otherItems = this.props.items.filter(_item => {
            if ((item.seller._id === _item.seller._id) && (item._id !== _item._id))
                return _item
        })
        this.setState({ item, otherItems })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            window.scrollTo(0, 0)
            const { id } = this.props.match.params
            const item = await itemService.getById(id)
            const otherItems = this.props.items.filter(_item => {
                if ((item.seller._id === _item.seller._id) && (item._id !== _item._id))
                    return _item
            })
            this.setState({ item, otherItems })
        }
    }

    render() {
        SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
        const { item, otherItems } = this.state

        if (!item) return <div className="loader"></div>
        return (
            <section className="item-page flex col j-evenly m-page">
                <Link to={`/item/edit/${item._id}`}>Edit Item</Link>
                <div className="item-details flex j-evenly">
                    <div className="item-show flex col">
                        <h2 className="item-name">{item.title}</h2>
                        <img className="item-img" src={item.imgUrl} alt={item.title} />
                    </div>
                    <div className="item-desc flex col j-between">
                        <h2>About this piece:</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <div>
                            <h5 className="muted">Artist:</h5>
                            <div className="flex a-center">
                                <Link to={`/user/${item.seller._id}`}><img className="profile-img" src={item.seller.imgUrl} alt={item.seller.fullname} /></Link>
                                <h4>{item.seller.fullname}</h4>
                            </div>
                        </div>
                        <button className="purchase-btn">Purchase</button>
                        {/* <p>{item.tags}</p> */}
                    </div>
                </div>
                <div className="other-works">
                    <div className="main-layout"><h3>Other Works By Artist:</h3></div>
                    {otherItems.length ? <div className="main-layout">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={5}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            }}
                            observer
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            pagination={{
                                el: '.swiper-pagination',
                                clickable: true
                            }}
                            // scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}>

                            {otherItems.map(item => {
                                return <SwiperSlide key={item._id}>
                                    <ItemPreview item={item} />
                                </SwiperSlide>
                            })}
                        </Swiper></div> : ''}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
        // users: state.userModule.users,
        items: state.itemModule.items,
    }
}

export const ItemDetails = connect(mapStateToProps)(_ItemDetails)







// export function UserList({ user, items }) {
//     SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


//     if (!items || !items.length) return <div></div>
//     return <Swiper
//         className="user-list main-layout"
//         spaceBetween={30}
//         slidesPerView={5}
//         navigation
//         autoplay={{ delay: 2000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         // scrollbar={{ draggable: true }}
//         onSwiper={(swiper) => console.log(swiper)}
//         onSlideChange={() => console.log('slide change')}>

//         {users.map(user => {
//             return <SwiperSlide key={user._id}>
//                 <UserPreview user={user} />
//             </SwiperSlide>
//         })}
//     </Swiper>
// }
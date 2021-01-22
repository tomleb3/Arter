import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { itemService } from '../services/itemService.js'
import { utilService } from '../services/utilService.js'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { ItemPreview } from "../cmps/ItemPreview.jsx"
import Swiper from 'react-id-swiper'
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { loadItems } from '../store/actions/itemActions.js'
import { addOrder } from '../store/actions/orderActions.js'
import { socketService } from '../services/socketService.js'
import swal from '@sweetalert/with-react'
import EditIcon from '@material-ui/icons/Edit';

class _ItemDetails extends Component {

    state = {
        item: null,
        otherItems: []
    }

    async componentDidMount() {
        SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
        this.loadOtherItems()
        window.scrollTo(0, 0)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadOtherItems()
            window.scrollTo(0, 0)
        }
    }

    async loadOtherItems() {
        const { id } = this.props.match.params
        const { items } = this.props
        const item = await itemService.getById(id)
        const otherItems = items.filter(currItem =>
            (item.sellerId === currItem.seller._id) && (item._id !== currItem._id)
        )
        this.setState({ item, otherItems })
    }

    onPurchase = async () => {
        if (!this.props.loggedInUser) this.props.history.push('/login')
        const { item } = this.state
        console.log(item)
        try {
            const order = await this.props.addOrder(item)
            console.log('SUCCESS !')
            socketService.emit('ORDER_OUT', order)
            return swal({
                className: "swal",
                icon: "success",
                title: "Success!",
                text: "You have purchased this item",
                timer: 5000,
            })
        } catch (err) {
            console.log('Purchase Failed');
            return swal({
                className: "swal",
                icon: "info",
                title: "Failure!",
                text: "There was a problem with the transaction.",
                timer: 6000,
            })
        }
    }

    render() {
        const { item, otherItems } = this.state
        const { loggedInUser } = this.props
        if (!item || !this.props.users.length) return <div className="loader-container"><div className="loader m-page"></div></div>
        const user = this.props.users.find(user => item.sellerId === user._id)
        const userRating = utilService.calcRate(user)

        return (
            <section className="item-details m-page">
                <div className="main-layout flex col">
                    <h1>{item.title}</h1>
                    <div className="item-container flex">
                        <img className="item-img" src={item.imgUrl} alt={item.title} />
                        <div className="item-desc flex col">
                            <div className="flex j-between">
                                <h2>About this piece</h2>
                                {(loggedInUser && loggedInUser._id === item.sellerId) && <Link to={`/item/edit/${item._id}`}><EditIcon /></Link>}
                            </div>
                            <p className="desc-txt">{item.description}</p>
                            <div className="tags flex">{item.tags.map((tag, idx) => { return <small key={idx}>#<Link to={{ pathname: "/explore", type: tag }}>{tag}</Link>&nbsp;&nbsp;&nbsp;</small> })}</div>
                            {item.purchasedAt ? <p className="site-clr3">SOLD</p> : <p>${item.price}</p>}
                            <div className="profile-container flex a-center">
                                <Link to={`/user/${item.sellerId}`} className="flex a-center"><img src={user.imgUrls.profile} alt={user.fullname} />
                                    <div className="flex col">
                                        <h4>{user.fullname}</h4>
                                        <div className="flex">
                                            <Rating name="rating" value={userRating} readOnly size="small" />
                                            <p className="muted">({user.reviews.length})</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="grow"></div>
                            {<button className="purchase-btn font-mont"
                                onClick={(loggedInUser && loggedInUser._id !== item.sellerId) ? this.onPurchase
                                    : () => this.props.history.push('/login')}>Purchase</button>}
                            {/* <p>{item.tags}</p> */}
                        </div>
                    </div>
                </div>
                <div className="other-works">
                    <div className="main-layout">
                        <h3>Other Works By {user.fullname}:</h3>
                        {otherItems.length ? <Swiper
                            spaceBetween={80}
                            slidesPerView={4}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            }}
                            observer
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            // pagination={{
                            //     el: '.swiper-pagination',
                            //     clickable: true
                            // }}
                            // scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}>
                            {otherItems.map(item => {
                                return <SwiperSlide key={item._id}>
                                    <ItemPreview item={item} user={user} minified />
                                </SwiperSlide>
                            })}
                        </Swiper> : ''}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        items: state.itemModule.items,
        users: state.userModule.users
    }
}
const mapDispatchToProps = {
    loadItems,
    addOrder
}
export const ItemDetails = connect(mapStateToProps, mapDispatchToProps)(_ItemDetails)
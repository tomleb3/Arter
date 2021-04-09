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
import CheckIcon from '@material-ui/icons/Check';

class _ItemDetails extends Component {

    state = {
        item: null,
        otherItems: []
    }

    async componentDidMount() {
        SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
        this.loadItems()
        window.scrollTo(0, 0)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadItems()
            window.scrollTo(0, 0)
        }
    }

    loadItems = async () => {
        const { id } = this.props.match.params
        const { items } = this.props
        const item = await itemService.getById(id)
        const otherItems = items.filter(currItem =>
            (item.sellerId === currItem.seller._id) && (item._id !== currItem._id))
        this.setState({ item, otherItems })
    }

    onPurchase = async () => {
        if (!this.props.loggedInUser) this.props.history.push('/login')
        const { item } = this.state
        try {
            const order = await this.props.addOrder(item)
            console.log('SUCCESS !')
            socketService.emit('ORDER_OUT', order)
            this.setState({ item: order.item })
            return swal({
                className: "swal",
                title: "Purchase completed!",
                text: "You can view your purchase details in your profile page",
                timer: 6000,
            })
        } catch (err) {
            return swal({
                className: "swal",
                title: "Oops!",
                text: "There was a problem with the purchase process.",
                timer: 6000,
            })
        }
    }

    render() {
        const { item, otherItems } = this.state
        const { loggedInUser } = this.props
        if (!item || !this.props.users.length) return <div></div>
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
                            <p className="size-txt font-mont">Size:&nbsp;&nbsp;{item.size}</p>
                            <div className="tags-container flex wrap">{item.tags.map((tag, idx) => {
                                return <div key={idx}>
                                    <small>#<Link to={{ pathname: "/explore", type: tag }}>{tag}</Link></small>
                                </div>
                            })}
                            </div>
                            {item.purchasedAt ? <p className="site-clr3">SOLD</p> : <p>${item.price}</p>}
                            <div className="flex col j-between grow">
                                <div className="profile-container flex a-center">
                                    <Link to={`/user/${item.sellerId}`} className="flex a-center"><img src={user.imgUrls.profile} alt={user.fullname} />
                                        <div className="flex col">
                                            <h4>{user.fullname}</h4>
                                            <div className="flex">
                                                <Rating name="rating" value={userRating} readOnly size="small" />
                                                <p className="muted font-mont">({user.reviews.length})</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="check-marks flex col muted">
                                    <div className="flex a-center"><CheckIcon fontSize="small" />Express Shipping</div>
                                    <div className="flex a-center"><CheckIcon fontSize="small" />Certificate of Authenticity included</div>
                                    <div className="flex a-center"><CheckIcon fontSize="small" />Returns Accepted 14 days</div>
                                </div>
                                {<button className={item.purchasedAt ? "purchase-btn font-mont purchased" : "purchase-btn font-mont"} disabled={(loggedInUser && loggedInUser._id === item.sellerId) || item.purchasedAt}
                                    onClick={(loggedInUser && loggedInUser._id !== item.sellerId) ? this.onPurchase
                                        : () => this.props.history.push('/login')}>Purchase</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="other-works">
                    <div className="main-layout">
                        <h3>Other Works By {user.fullname}:</h3>
                        {otherItems.length ? <Swiper
                            spaceBetween={80}
                            // slidesPerView={4}
                            breakpoints={{
                                // when window width is >= 580px
                                580: {
                                    slidesPerView: 2
                                },
                                860: {
                                    slidesPerView: 3,
                                },
                                1300: {
                                    slidesPerView: 4,
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
                            {otherItems.map(item => {
                                return <SwiperSlide key={item._id}>
                                    <ItemPreview item={item} user={user} minified />
                                </SwiperSlide>
                            })}
                        </Swiper> : <p className="muted">No works yet...</p>}
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
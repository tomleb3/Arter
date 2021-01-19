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
            alert('Success!')
            socketService.emit('ORDER_OUT', order)
        } catch (err) {
            console.log('Purchase Failed');
            alert('Purchase Failed!')
        }
    }

    render() {
        const { item, otherItems } = this.state
        const { loggedInUser } = this.props
        if (!item || !this.props.users.length) return <div className="loader-container"><div className="loader m-page"></div></div>
        const user = this.props.users.find(user => item.sellerId === user._id)
        const userRating = utilService.calcRate(user)

        return (
            <section className="item-page flex col j-evenly m-page">
                <div className="item-details flex j-evenly">
                    <div className="item-show">
                        <img className="item-img" src={item.imgUrl} alt={item.title} />
                    </div>
                    <div className="item-desc flex col j-between">
                        <h2 className="item-name">{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <div>
                            <h5 className="muted">Artist:</h5>
                            <div className="profile-container flex a-center">
                                <Link to={`/user/${item.sellerId}`}><img className="profile-img flex a-center" src={user.imgUrls.profile} alt={user.fullname} /></Link>
                                <div>
                                    <h4>{user.fullname}</h4>
                                    <div className="flex">
                                        <Rating name="rating" value={userRating} readOnly size="small" />
                                        <p className="muted">({user.reviews.length})</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(loggedInUser && loggedInUser._id === item.sellerId) && <Link to={`/item/edit/${item._id}`}>Edit Item</Link>}
                        <button className="purchase-btn" onClick={this.onPurchase}>Purchase</button>
                        {/* <p>{item.tags}</p> */}
                    </div>
                </div>
                <div className="other-works">
                    <div className="main-layout"><h3>Other Works By {user.fullname}:</h3></div>
                    {otherItems.length ? <div className="main-layout">
                        <Swiper
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
                        </Swiper></div> : ''}
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
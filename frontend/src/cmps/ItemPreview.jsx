import { connect } from 'react-redux'

function _ItemPreview({ item }) {
    console.log(item)

    return <article className="item-preview">

        <div className="item-img-placeholder"></div>
        <div className="info-container">
            <div className="flex a-center">
                <div className="user-img-placeholder"></div>
                <h5>{item.seller.fullname}</h5>
            </div>
            <h3>{item.title}</h3>
        </div>
        <div className="bottom-container">
            <h5 className="right">${item.price}</h5>
        </div>
    </article>
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    // removeItem
}

export const ItemPreview = connect(mapStateToProps, mapDispatchToProps)(_ItemPreview)
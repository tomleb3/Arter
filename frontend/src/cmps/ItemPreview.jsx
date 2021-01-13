import { connect } from 'react-redux'

function _ItemPreview({ item }) {

    return <article className="item-preview">

        <div className="item-img-placeholder"></div>
        <div className="user-info">
            <div className="user-img-placeholder"></div>
            <h4>{item.title}</h4>
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
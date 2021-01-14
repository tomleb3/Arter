import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function _UserPreview({ user }) {
    // console.log(user)

    return <section className="user-preview">
        <Link to={`/user/${user._id}`}>
            <img className="item-img" src={user.imgUrl}></img>
        </Link>
    </section>
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    // removeItem
}

export const UserPreview = connect(mapStateToProps, mapDispatchToProps)(_UserPreview)
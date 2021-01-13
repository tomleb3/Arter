import { connect } from 'react-redux'

function _UserPreview({ user }) {
    // console.log(user)

    return <article className="user-preview">

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

export const UserPreview = connect(mapStateToProps, mapDispatchToProps)(_UserPreview)
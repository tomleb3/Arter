import { Component } from 'react'
import { connect } from 'react-redux'
import { GetStarted } from '../cmps/GetStarted.jsx'
import { UserList } from '../cmps/UserList.jsx'
import { Button } from '@material-ui/core'
import { Uploader } from '../cmps/Uploader.jsx'

class _Home extends Component {

    render() {
        const { users } = this.props

        return <section className="home">
            <div className="hero"></div>

            <main className="main-layout">
                <article>
                    <h3>Fetured Artists</h3>
                    <UserList users={users} />
                </article>
                <article className="our-services">
                    <div className="btn"><Button variant="outlined" color="primary">Publish Now</Button></div>
                </article>
                <GetStarted />
                <Uploader></Uploader>
            </main>
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
        users: state.userModule.users
    }
}

export const Home = connect(mapStateToProps)(_Home)
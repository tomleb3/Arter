import { Component } from 'react'
import { GetStarted } from '../cmps/GetStarted.jsx'
import { UserList } from '../cmps/UserList.jsx'
import { Button } from '@material-ui/core'

export class Home extends Component {

    render() {
        return <section className="home">
            <div className="hero"></div>

            <main className="main-layout">
                <article>
                    <h3>Fetured Artists</h3>
                    <UserList />
                </article>
                <article className="our-services">
                    <div className="btn"><Button variant="outlined" color="primary">Publish Now</Button></div>
                </article>
                <GetStarted />
            </main>
        </section>
    }
}
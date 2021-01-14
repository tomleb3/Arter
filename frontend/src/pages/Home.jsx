import { Component } from 'react'
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
                    <div className="btn"><Button>Publish Now</Button></div>


                </article>
            </main>
        </section>
    }
}
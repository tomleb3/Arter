import { Component } from 'react'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'

export class Explore extends Component {

    render() {
        return <section className="explore">
            <UserList />
            <ItemList />
        </section>
    }
}
import { Component } from 'react'
import { itemService } from '../services/itemService.js'

export class ItemDetails extends Component {

    state = {
        item: null
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const item = await itemService.getById(id)
        console.log('item: ', item);
        this.setState({ item })
    }


    render() {
        const { item } = this.state
        if (!item) return <div className="loader"></div>
        return (
            <section>
                <div>
                    <div>
                        <h1>{item.title}</h1>
                        <img src={`${item.imgURL}`} alt={`${item.title}`} />
                    </div>
                    <div>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        {/* <p>{item.tags}</p> */}
                        <button>Purchase</button>
                    </div>
                </div>
                <article>
                    Artist Details link
                </article>
                <div>
                    <div>other item link</div>
                    <div>other item link</div>
                    <div>other item link</div>
                </div>
            </section>
        )
    }
}

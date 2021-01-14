import { Component } from 'react'
import { Tabs, Tab, Paper } from '@material-ui/core';

export class GetStarted extends Component {

    state = {
        currPage: 'buyers'
    }

    componentDidUpdate() { console.log(this.state) }

    render() {
        return <article className="get-started flex j-center">
            <Paper square>
                <Tabs
                    value={0}
                    indicatorColor="primary"
                    textColor="primary"
                    // onChange={handleChange}
                    variant="standard" >

                    <Tab label="Buyers" onClick={() => this.setState({ currPage: 'buyers' })} />
                    <Tab label="Sellers" onClick={() => this.setState({ currPage: 'sellers' })} />
                </Tabs>
            </Paper>

            <div className="imgs-container">

            </div>
        </article>
    }
}
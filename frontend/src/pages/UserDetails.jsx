import { Component } from 'react'
import { userService } from '../services/userService.js'

export class UserDetails extends Component {

    state = {
        user: null
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const user = await userService.getById(id)
        console.log('user: ',user);
        this.setState({ user })
    }


    render() {
        const { user } = this.state
        if (!user) return <div className="loader"></div>    
            return (
                <div>
                    <h1>User Details</h1>
                
                </div>
            )
    }
}

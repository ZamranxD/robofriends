import React, { Component } from 'react';
import CardList from '../Components/CardList';
import Searchbox from '../Components/Searchbox';
import './App.css';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            robotto : [],
            searchfield : ''
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {this.setState({robotto : users})});
    }

    onSearchChange = (event) => {
        this.setState({ searchfield : event.target.value })
    
     }

    render() {
        const {robotto, searchfield} = this.state;
        const filteredRobots = robotto.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if(!robotto.length) {
            return <h1 className='tc f1'>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'> Robofriends </h1>
                    <Searchbox searchchange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
        
    }
}


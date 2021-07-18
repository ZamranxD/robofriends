import React, { useState, useEffect } from 'react';
import CardList from '../Components/CardList';
import Searchbox from '../Components/Searchbox';
import './App.css';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';

function App() {

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {setRobots(users)});
    },[])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
     }

    
    const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if(!robots.length) {
        return <h1 className='tc f1'>Loading</h1>
    } else {
        return (
            <div className='tc'>
                <h1 className='f1'> Robofriends </h1>
                <Searchbox searchchange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
        
}

export default App;



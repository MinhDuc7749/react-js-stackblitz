import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './HerosPage.css';


const HerosPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [heros, setHeros] = useState([]);
    const [heroSelected, setHeroSelected] = useState(
        {
            id: null,
            name: null
        }
    );
    const [heroIdSelected, setHeroIdSelected] = useState([]);

    useEffect(() => {
        let didCancel = false;
        axios({
            method: 'GET',
            url: 'https://60dff0ba6b689e001788c858.mockapi.io/heroes'
        }).then(response => {
            if (!didCancel) {
                setIsLoading(false);
                setHeros(response.data);
                console.log('response = ', response);
            }
        }).catch(error => {
            if (!didCancel) {
                setIsLoading(false);
                setErrorMessage(error.message);
            }
        });
        return () => {
            didCancel = true;
        }
    }, []);

    console.log(isLoading, heros, errorMessage);



    return (

        <div className="hero-page">
            <h2>My Heroes</h2>
            <ul className="heroes">
                {heros.map(hero => (
                    <li
                        className ={hero.id === heroSelected.id && 'selected'}

                        onClick={() => {
                            setHeroSelected(hero);
                            heroIdSelected.push(hero.id)
                            setHeroIdSelected(heroIdSelected);
                        }
                        }>
                        <span class="badge">{hero.id}</span> {hero.name}
                    </li>
                ))}
            </ul>
            {heroSelected.id != null &&
                <div className="hero-details">
                    <h2>{heroSelected.name} Details</h2>
                    <div><span>id: {heroSelected.id} </span>{ }</div>
                    <div>
                        <label >Hero name: </label>
                        <input id="hero-name"
                            onChange={(event) => {
                                setHeroSelected({
                                    id: heroSelected.id,
                                    name: event.target.value
                                });
                                let cloneHeros = [...heros];
                                cloneHeros.find(x => x.id === heroSelected.id).name = event.target.value;
                                setHeros(cloneHeros);
                            }}
                            value={heroSelected.name} placeholder="name" />
                    </div>
                </div>
            }
            {heroIdSelected.length > 0 &&
                <div className="message">
                    <h2>Messages</h2>
                    <button
                        onClick={() => setHeroIdSelected([])}
                        class="clear">Clear messages</button>
                    {heroIdSelected.map(id => (
                        <div>HeroesComponent: Selected hero id={id}</div>
                    ))}
                </div>
            }
        </div >
    )
}

export default HerosPage;
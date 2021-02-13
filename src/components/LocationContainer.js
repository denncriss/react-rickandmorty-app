import React, { useState, useEffect } from 'react'
import { ResidentContainer } from './ResidentContainer'

export const LocationContainer = ({ id }) => {
    const
        BASE = 'https://rickandmortyapi.com/api',

        [location, setLocation] = useState(null),
        [locationData, setLocationData] = useState({}),

        [page, setPage] = useState(0),

        [message, setMessage] = useState(null)

    useEffect(() => {
        fetch(`${BASE}/location/${id}`)
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => {
                setLocation(data)
            })
            .catch(error => {
                setMessage('this location does not exist')
            })
        setMessage(null)
        setPage(0)
    }, [id])

    useEffect(() => {
        if (location !== null) {
            const
                name = location.name,
                type = location.type,
                dimension = location.dimension,
                total_residents = location.residents.length,
                residents = location.residents.map(resident => resident)

            const
                getLocationData = { name, type, dimension, total_residents, residents }

            setLocationData(getLocationData)
        }
    }, [location])

    const
        { name, type, dimension, total_residents, residents } = locationData,

        maxPage = Math.ceil(total_residents / 5),
        onNextPage = () => setPage((page + 1) % maxPage),
        onPrevPage = () => setPage((page - 1) % maxPage),

        isResidents = total_residents > 0 ? true : false

    console.log(maxPage)

    return (
        <>
            <div className="location-container">
                {message !== null
                    ?
                    <p className="message">{message}</p>
                    :
                    <>
                        <h2>{name}</h2>
                        <div className="location-info">
                            <p><span>Type: </span>{type}</p>
                            <p><span>Dimension:</span> {dimension}</p>
                            <p><span>Total residents:</span> {total_residents}</p>
                        </div>
                    </>
                }
            </div>
            <div className="card-container">
                {message !== null
                    ?
                    null
                    :
                    <>
                        {isResidents
                            ?
                            residents.slice(page * 5, 5 * (page + 1)).map((resident, index) => {
                                return (
                                    <ResidentContainer
                                        key={index + 1}
                                        url={resident}
                                    />
                                )
                            })
                            :
                            <p className="message">There are no residents to display at this location</p>
                        }
                    </>
                }
            </div>
            <div className="pagination">
                {message !== null
                    ?
                    null
                    :
                    <>
                        {isResidents &&
                            <>
                                <button onClick={onPrevPage} disabled={!page}>&lt;Prev</button>
                                <button onClick={onNextPage} disabled={page === Math.ceil(total_residents / 5) - 1}>Next&gt;</button>
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}
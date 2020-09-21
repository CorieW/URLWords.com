import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NewUrl from './NewUrl';
import './NewUrlList.css'

export default function NewUrlList()
{
    const [newUrls, setNewUrls] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        axios({
            method: 'GET',
            url: '/api/urls'
            //params: { latest: 10 }
        }).then(res =>
        {
            setLoading(false)
            setNewUrls(res.data)
        })
        .catch(err =>
        {
            setLoading(false)
            setError(err);
        })
    }, [])

    return (
        <div class="new-url-list">
            <h2 className="header">Recently Generated URLs</h2>
            <p className="update-text">It could take up to 30 minutes for the below list to be updated.</p>
            <h2 className="important-text">{loading && "Generating short url..."}</h2>
            <h2 className="important-text">{error && "An error has occurred, please try again!"}</h2>
            <div className="new-url-list-header">
                <span>Original URL</span>
                <span>Memorable Words</span>
            </div>
            {newUrls.map((newUrl, index) =>
            {
                return(
                    <div key={newUrl.id}>
                        <NewUrl data={newUrl} even={index%2 === 0} />
                    </div>
                )
            })}
        </div>
    )
}

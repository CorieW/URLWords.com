import React, { useState } from 'react'
import axios from 'axios';
import './Home.css'

export default function Home()
{
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleChange(event) {
        setUrl(event.target.value)
    }

    function handleSubmit(e)
    {
        setError(null);
        setLoading(true)
        setShortUrl("")
        setUrl(url)

        // The following POST request will also return the short URL of such URL
        axios({
            method: 'POST',
            url: '/api/urls',
            params: { url: url }
        }).then(res =>
        {
            setLoading(false)
            setShortUrl(res.data)
            console.log(res.data)
        })
        .catch(err =>
        {
            setError(err);
        })
    }

    return (
        <div>
            <h1 className="page-title">Create a familiar short URL</h1>
            <div className="short-url-form">>
                <span>http:// </span>
                <input type="text" name="url" placeholder="Redirect URL" onChange={handleChange} />
                <button type="button" onClick={handleSubmit}>Create Short URL</button>
            </div>
            <div className="info-headers">
                <h2 className="short-url"><a href={`http://URLWords.com/${shortUrl}`}>{shortUrl.length > 0 && `http://URLWords.com/${shortUrl}`}</a></h2>
                <h2>{loading && "Generating short url..."}</h2>
                <h2>{error && "An error has occurred, please try again!"}</h2>
            </div>
        </div>
    )
}

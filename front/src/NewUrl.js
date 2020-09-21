import React from 'react'
import './NewUrl.css'

export default function NewUrl({data, even})
{
    let { original_url, short_url } = data

    return (
        <div className={even ? "new-url" : "new-url dark-row" }>
            <span><a href={"http://" + original_url}>{original_url}</a></span>
            <span>{short_url}</span>
        </div>
    )
}

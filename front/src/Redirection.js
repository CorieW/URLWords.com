import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Redirection(props)
{
    const [url, setUrl] = useState(undefined)

    useEffect(() =>
    {
        console.log(props.location.pathname.split("/")[1])
        axios({
            method: 'GET',
            url: '/' + props.location.pathname.split("/")[1]
        }).then(res =>
        {
            setUrl(res.data)
        }).catch(err =>
        {
            console.log(err)
            setUrl("")
        })
    }, [])

    return (
        <div>
            <h1 className="page-title">Redirecting...</h1>
            <Router>
                <Switch>
                    <Route path="/" render={() =>
                    {
                        if (url !== undefined) {
                            window.location = url
                        }
                        
                        if (url === "") {
                            window.location = "/"
                        }
                    }} />
                </Switch>
            </Router>
        </div>
    )
}

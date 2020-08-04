import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Jobs from './Jobs';
const apiAddress = process.env.REACT_APP_SERVER_URL;

export default function Details({ props }) {

    let { id } = useParams();
    let [jobs, setJobs] = useState(null)

    let getDetailedData = async () => {
        let url = `${apiAddress}/jobs/${id}`; //important
        let response = await fetch(url);
        let result = await response.json();
        setJobs(result);
    }

    useEffect(() => {
        getDetailedData()
    }, []);

    if (jobs == null) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <h1>
                <div>{jobs.title}</div>
                {jobs.description}
            </h1>
        </div>
    )
}

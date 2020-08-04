import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"

const apiAddress = process.env.REACT_APP_SERVER_URL;

export default function Jobs() {
    let [jobList, setJobList] = useState([]);
    let history = useHistory();

    const getData = async () => {
        try {
            let url = `${apiAddress}/jobs`;
            console.log('url:', url)
            let response = await fetch(url);
            let result = await response.json();
            console.log("result", result);
            setJobList(result)
        } catch (err) {
            console.log("err", err.message);
        }
    };

    const getDetail = (id) => {
        history.push(`/jobs/${id}`);
    };

    useEffect(() => {
        getData();
    }, []);

    if (jobList.length == 0) {
        return <h1>Loading</h1>;
    }
    return (
        <div>
            <h1>Job List</h1>
            {jobList.map((jobs) => {
                return <h3 onClick={() => getDetail(jobs.id)}>{jobs.title}</h3>;
            })}
        </div>
    );
}

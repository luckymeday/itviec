import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import moment from "moment";

const apiAddress = process.env.REACT_APP_SERVER_URL;
export default function Jobs() {
    let [jobList, setJobList] = useState([])
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
        history.push(`/jobs/${id}`)
    };

    useEffect(() => {
        getData();
    }, []);

    if (jobList.length == 0) {
        return <h1>Loading</h1>;
    }
    console.log('jobList:', jobList)
    return (
        <div>
            {/* <h1>Job List</h1>
            {jobList.map((jobs) => {
                return 
                <h3 onClick={() => getDetail(jobList.id)}>
                {jobList.title}</h3>;
            })} */}
            {jobList.map(job => (
                <div className="job-content" onClick={() => getDetail(job.id)}>
                    <Row>
                        <Col>
                            <div className="jobcard-logo">
                                <img src={job.img} />
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className="jobcard-descriptions">
                                <h2 className="jobcard-title">{job.title}</h2>
                                <div>$ {job.salary}</div>
                                <div>
                                    <ul className="benefit-list">
                                        {job.benefits.map(benefit => (
                                            <li>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    {job.tags.map(tag => (
                                        <Badge variant="secondary" className="badge-style">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="date-location-box">
                                {job.isHotjob ? (
                                    <div className="hotjob-label">Hot Job</div>
                                ) : (
                                        <div></div>
                                    )}

                                <div className="jobcard-location">
                                    <div>{job.city}</div>
                                    <div>District {job.district}</div>
                                </div>
                                <div className="job-time">{moment(job.time).fromNow()}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            ))}

        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Button, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const apiAddress = process.env.REACT_APP_SERVER_URL;

export default function Details() { // (props) <=> (props.job, props.jobTitle) <=> ({job, jobTitle})

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
        <div className="App">
            {/* <h1>{jobTitle}</h1> */}

            <div className="navigation">
                <Container>
                    <a href="/">
                        <img
                            className="logo-itviec"
                            alt="itviec"
                            src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
                        />
                    </a>

                </Container>
            </div>
            {/* <h1>
                <div>{jobs.title}</div>
                {jobs.description}
            </h1> */}

            <Container className="middle">
                <div className="white-container">
                    <Row>
                        <Col>
                            <img src={jobs.img} />
                        </Col>
                        <Col xs={10}>
                            <h2>{jobs.title}</h2>
                            <div>
                                {jobs.tags.map((tag) => (
                                    <Badge variant="secondary" className="badge-style">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <div style={{ paddingTop: "10px", color: "grey" }}>
                                <FontAwesomeIcon
                                    icon={faDollarSign}
                                    style={{ marginRight: "10px" }}
                                />{" "}
                                {jobs.salary}
                            </div>
                            <div style={{ color: "grey" }}>
                                <FontAwesomeIcon
                                    icon={faMapMarker}
                                    style={{ marginRight: "10px" }}
                                />{" "}
                                {jobs.city} District {jobs.district}
                            </div>
                            <div style={{ color: "blue" }}>
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    style={{ marginRight: "10px" }}
                                />
                                {moment(jobs.time).fromNow()}
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                <h2>Benefit</h2>
                                <ul className="benefit-list" style={{ fontSize: "18px" }}>
                                    {jobs.benefits.map((benefit) => (
                                        <li>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                <h2>Description</h2>
                                <div>{jobs.description}</div>
                            </div>
                            <Button
                                variant="danger"
                                style={{ width: "100%", marginTop: "30px", fontSize: "18px" }}
                            >
                                Apply Now
              </Button>
                        </Col>
                    </Row>
                </div>
            </Container>


        </div>
    )
}

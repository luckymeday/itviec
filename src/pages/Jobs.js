import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import JobCard from "../components/JobCard";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Row, Col } from "react-bootstrap";
// import { Row, Col, Badge } from "react-bootstrap";
// import moment from "moment";

const apiAddress = process.env.REACT_APP_SERVER_URL;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const QUERYSTR_PREFIX = "q";

export default function Jobs() {
    let [jobList, setJobList] = useState([]); // for showing on UI
    let [originalList, setOriginalList] = useState([]); // keep the original list
    let history = useHistory();
    let query = useQuery();
    let [keyword, setKeyword] = useState(query.get("q"));

    const getData = async () => {
        try {
            let url = `${apiAddress}/jobs`;
            console.log('url:', url)
            let response = await fetch(url);
            let result = await response.json();
            console.log("result", result);
            setJobList(result);
            setOriginalList(result);
        } catch (err) {
            console.log("err", err.message);
        }
    };

    const searchByKeyword = (e) => {
        console.log("we are in searchByKeyword")
        let filteredList = originalList;
        if (e) {
            e.preventDefault();
            console.log("keyword", keyword)
            // history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
            history.push(`/jobs?q=${keyword}`);
        }
        if (keyword) {
            filteredList = originalList.filter(job =>
                job.title.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        console.log("filteredList", filteredList)
        setJobList(filteredList);
    };

    // const getDetail = (id) => {
    //     history.push(`/jobs/${id}`)
    // };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        searchByKeyword();
    }, [originalList]);

    if (jobList.length === 0) {
        return <div className="loading">Loading..., wait a sec!</div>;
    }
    console.log('jobList:', jobList)
    return (
        <div>
            <div className="search-header">
                <Container>
                    <Col>
                        {" "}
                        <a href="/">
                            <img
                                className="logo-itviec"
                                alt="itviec"
                                src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
                            /></a>
                    </Col>
                    <Form onSubmit={(e) => searchByKeyword(e)}>
                        <Row className="search-form-wrapper">
                            <Col xs={12} md={10}>
                                <div className="search-section-wrapper">
                                    <Row className="search-field-wrapper" noGutters={true}>
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="icon-fasearch fa-lg"
                                        />
                                        <Col col={12}>
                                            <input
                                                value={keyword}
                                                type="text"
                                                className="search-box"
                                                placeholder="Keyword"
                                                onChange={(e) => setKeyword(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xs={12} md={2}>
                                <button className="search-button" type="submit">Search</button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

            <Container>
                <div className="job-list">
                    <br></br>
                    <h2>
                        {jobList && jobList.length} IT job{jobList.length !== 1 ? "s" : ""} in Vietnam for you{" "}
                    </h2>
                    <br></br>
                    {jobList && jobList.map(item => <JobCard job={item} />)}
                </div>
            </Container>

            {/* <h1>Job List</h1>
            {jobList.map((jobs) => {
                return 
                <h3 onClick={() => getDetail(jobList.id)}>
                {jobList.title}</h3>;
            })} */}

            {/* {jobList.map(job => (
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
                </div> */}

        </div >
    );
}

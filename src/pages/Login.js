import React, { useState } from 'react';
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import loginMiddleware from "../store/action/authAction"
import { useHistory } from "react-router-dom" // to get back to the page that I want

export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const error = useSelector(state => state.error) // useSelctor to bring the information from the storage
    const user = useSelector(state => state.user) // this case, I only need user and error
    const history = useHistory() //

    const login = (e) => {
        e.preventDefault();
        console.log(email, password);
        let userobj = { email: email, password: password };
        // dispatch({ type: "LOGIN", payload: user });
        dispatch(loginMiddleware(userobj));
    };
    if (user.isAuthenticated == true) {
        history.push("/") // when login is success, get to the main page
    }

    return (
        <div>
            <Container>
                <a href="/">
                    <img
                        className="logo-itviec"
                        alt="itviec"
                        src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
                    />
                </a>

            </Container>

            <div className="App">
                <Container className="middle">
                    <div className="error-msg">{error ? <h1>{error}</h1> : <></>}
                    </div>
                    <Form className="white-container" onSubmit={(e) => login(e)}>
                        <Form.Group>
                            <Form.Text className="text-center">
                                <h3>Login, please.</h3></Form.Text>
                            <br></br>
                            <Form.Label>Email Address</Form.Label>
                            <input type="text" className="login-input" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <Form.Label>Password</Form.Label>

                            <input type="text" className="login-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <button type="submit" className="login-button">Login</button>

                            <Form.Text className="text-muted text-center">
                                <br></br>
                                We'll never share your personal information with anyone else.</Form.Text>
                        </Form.Group>
                    </Form>
                </Container>
                <footer className="footer">

                </footer>
            </div>
        </div >
    )
}

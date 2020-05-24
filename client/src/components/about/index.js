import React from "react";
import "./styles.css";

function About() {
    return (
        <div className="about-content">
            <p>
                hookz.dev is a free and open source web tool to help developers
                quickly test webhooks or catch and inspect all http requests.
            </p>
            <p>
                The application is built with{" "}
                <a href="https://expressjs.com/">nodejs/expressjs</a> (backend)
                and <a href="https://reactjs.org/">reactjs</a> (frontend). View
                on <a href="https://github.com/rasheeda">github</a>. Backend and
                Frontend repositories are separate
            </p>
        </div>
    );
}

export default About;

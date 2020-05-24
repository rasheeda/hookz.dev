import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home";
import "./styles.css";
import Webhook from "../webhook";
import wretch from "wretch";
import { API_URL } from "../../services/webhookz";
import Privacy from "../privacy";
import About from "../about";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

const trackingId = "UA-163681319-1"; // sample ID
ReactGA.initialize(trackingId);
ReactGA.pageview("/");

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function Layout() {
    // making a direct call because exporting services not working because of semi column
    const createWebhook = () => {
        wretch(API_URL)
            .headers({
                "Access-Control-Allow-Origin": "*",
                crossDomain: true
            })
            .post()
            .json(response => {
                if (response.id.name) {
                    window.location.replace(`/${response.id.name}`);
                }
            })
            .catch(() => {
                console.log("error making request");
            });
    };

    return (
        <Router history={history}>
            <div className="site-wrap">
                <div className="site-mobile-menu">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                </div>

                <header className="site-navbar py-3" role="banner">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-11 col-xl-2">
                                <h1 className="mb-0 main-logo">
                                    <a href="/" className="text-white h2 mb-0">
                                        hookz
                                        <span className="text-primary">
                                            .dev
                                        </span>{" "}
                                    </a>
                                </h1>
                            </div>
                            <div className="col-12 col-md-10 d-none d-xl-block">
                                <nav
                                    className="site-navigation position-relative text-right"
                                    role="navigation"
                                >
                                    <ul className="site-menu js-clone-nav mx-auto d-none d-lg-block">
                                        <li className="active">
                                            <a href="/">Home</a>
                                        </li>
                                        <li>
                                            <a href="/about">About</a>
                                        </li>
                                        <li>
                                            <a href="https://github.com/rasheeda">
                                                Github
                                            </a>
                                        </li>
                                        <li className="cta">
                                            <a href="#" onClick={createWebhook}>
                                                New Webhook
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <div className="site-section site-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" exact component={About} />
                            <Route path="/privacy" exact component={Privacy} />
                            <Route path="/:webhook" exact component={Webhook} />
                        </Switch>
                    </div>
                </div>
            </div>
            <div className="site-footer">
                made with tea by <a href="https://mandeeya.io">mandeeya.io </a>{" "}
                | {new Date().getFullYear()} |{" "}
                <a href="/privacy" className="active">
                    Privacy Terms
                </a>
            </div>
        </Router>
    );
}

export default Layout;

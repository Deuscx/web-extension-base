import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Popup from '../popup/Popup';
import Foreground from 'components/Foreground';
//import styles from './options.module.scss'

function Options() {

    return <Router>
        <div>
            <div >
                <h1>Chrome Ext - Options</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Options</Link>
                        </li>
                        <li>
                            <Link to="/popup">Popup</Link>
                        </li>
                        <li>
                            <Link to="/foreground">Foreground</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route exact path="/popup">
                    <Popup />
                </Route>
                <Route exact path="/foreground">
                    <Foreground />
                </Route>
                <Route exact path="/">
                    <Redirect to="/options.html" />
                </Route>
            </Switch>
        </div>
    </Router>;
}

export default Options;
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageNotFound from '../pages/PageNotFound';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import SheetCointainer from '../pages/SheetCointainer';
import Notes from '../pages/Notes';

export default class Routes extends Component {

    render () {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/sheets" component={SheetCointainer} />
                <Route exact pacth="/plantillas" component={Notes} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }

}
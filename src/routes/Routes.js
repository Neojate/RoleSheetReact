import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageNotFound from '../pages/PageNotFound';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import SheetCointainer from '../pages/SheetCointainer';
import Notes from '../pages/Notes';
import CharactersContainer from '../pages/CharactersContainer';
import { CreateContainer } from '../pages/CreateContainer';
import WorkshopContainer from '../pages/WorkshopContainer';


export default class Routes extends Component {

    render () {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/characters" component={CharactersContainer} />
                <Route exact path="/plantillas" component={WorkshopContainer} />
                <Route exact path="/workshop" component={WorkshopContainer} />
                <PrivateRoute exact path="/createworksheet" component={CreateContainer} />
                <PrivateRoute exact path="/createworksheet/:id" component={CreateContainer} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }

}
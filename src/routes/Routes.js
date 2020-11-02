import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageNotFound from '../pages/PageNotFound';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import SheetCointainer from '../pages/SheetCointainer';
import Notes from '../pages/Notes';
import CharactersContainer from '../pages/CharactersContainer';
import { CreateContainer } from '../pages/CreateContainer';
import WorkshopContainer from '../containers/WorkshopContainer';
import SavedSheetContainer from '../containers/SavedSheetContainer';

export default class Routes extends Component {

    render () {
        const { user } = this.props
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/characters" component={CharactersContainer} />
                <Route exact path="/plantillas" component={WorkshopContainer} />
                {/* <Route exact path="/workshop" component={WorkshopContainer} /> */}
                <PrivateRoute
                    component={() => <WorkshopContainer user={user} />}
                    exact
                    path="/workshop" />
                <PrivateRoute
                    component={() => <SavedSheetContainer user={user} />}
                    exact
                    path="/createworksheet" />
                {/* <PrivateRoute 
                    component={() => <CreateContainer user={user} />}
                    exact
                    path="/createworksheet" /> */}
                <PrivateRoute 
                    component={() => <CreateContainer user={user} />}
                    exact 
                    path="/createworksheet/:id" />
                <Route component={PageNotFound} />
            </Switch>
        );
    }

}
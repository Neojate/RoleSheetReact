import React, { Component } from 'react';
import SavedSheetList from '../components/SavedSheetList';
import SavedSheet from '../components/SavedSheetList';

export default class SavedSheetContainer extends Component {

    state = {
        currentIndexPage: 0,
        id: null,
        pages: [{
            body: [],
        }],
        savedGame: '',
        savedName: ''
    };

    componentDidMount() {
        const url = new URL(document.location);
        const param = 'id';

        if (!url.searchParams.has(param)) return;

        const id = url.searchParams.get(param);

        fetch(`http://rolesheetapi.test/api/savedsheet/${id}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    id: json.id,
                    pages: json.pages,
                    savedGame: json.savedGame,
                    savedName: json.savedName
                });
            });
    }

    _setPageState = (pageState) => {
        const { currentIndexPage } = this.state;
        let pages = this.state.pages;
        pages[currentIndexPage] = pageState;
        this.setState({ pageState });
    }

    /* método que recibe el índice de la nueva página y el estadode la página antes de cambiar */
    changePage = (newIndexPage, pageState) => {
        const { currentIndexPage } = this.state;
        let pages = this.state.pages;
        pages[currentIndexPage] = pageState;
        this.setState({
            currentIndexPage: newIndexPage,
            pages: pages
        });
    };

    createNewPage = (pageState) => {
        const { currentIndexPage } = this.state;
        let pages = this.state.pages;
        pages[currentIndexPage] = pageState;
        pages.push({ body: [] });
        this.setState({
            currentIndexPage: pages.length - 1,
            pages: pages
        });
    };

    deletePage = (index) => {
        const { currentIndexPage, pages } = this.state;
        let newPages = pages.filter((value, index, array) => { return index !== currentIndexPage });
        this.setState({ pages: newPages });
        if (index == pages.length - 1)
            this.setState({ currentIndexPage: index - 1 });
    };

    saveSheet = (pageState) => {
        this._setPageState(pageState);
        const { user } = this.props;
        const { id, pages } = this.state;
        let userId = user.sub;
        fetch(`http://rolesheetapi.test/api/storesavedsheet`, {
            method: 'POST',
            body: JSON.stringify({ id, pages, userId })
        })
            .then(response => response.json())
            .then(json => console.log(json));
    };

    render() {
        const { currentIndexPage, pages } = this.state;
        return (
            <SavedSheetList
                changePage={this.changePage}
                createNewPage={this.createNewPage}
                currentIndexPage={currentIndexPage}
                deletePage={this.deletePage}
                maxPages={pages.length}
                page={pages[currentIndexPage]}
                saveSheet={this.saveSheet} />
        );
    }
}
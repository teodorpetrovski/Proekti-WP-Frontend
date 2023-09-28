import React from 'react';

import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import CallTerm from "../CallTerm/callTerm";
import ProjectRepository from "../../../repository/projectsRepository";


class Calls extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5,
            calls: []
        }
    }

    componentDidMount() {
        ProjectRepository.fetchCalls()
            .then(response => {
                this.setState({calls: response.data});
            })
            .catch(error => {
                console.error("Error fetching calls", error);
            });
    }

    render() {
        const pageCount = Math.ceil(this.state.calls.length / this.state.size);
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const calls = this.getCallsPage(offset, nextPageOffset);

        return (
            <div className={"container m-4 mt-5"}>
                <h3>Повици</h3>
                <br/>
                <a href="/addCall" class="btn btn-primary" className="btn btn-primary">Додади нов повик</a>
                <div className={"row"}>
                    <div className={"row"}>
                        {calls}
                    </div>
                    <ul className="pagination justify-content-center">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<a href="/#">...</a>}
                            breakClassName={"break-me"}
                            pageClassName={"page-item"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination m-4 justify-content-center border"}
                            activeClassName={"active"}
                        />
                    </ul>
                </div>
            </div>
        );
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }


    getCallsPage = (offset, nextPageOffset) => {
        const projectTerms = this.props.calls.map((term, index) => {
            return (
                <CallTerm term={term}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        });

        const callsPage = [];
        for (let i = 0; i < projectTerms.length; i += 4) {
            const pageTerms = projectTerms.slice(i, i + 4);
            const page = (
                <div className="row" key={i}>
                    {pageTerms}
                </div>
            );
            callsPage.push(page);
        }
        return callsPage;
    }
}

export default Calls;
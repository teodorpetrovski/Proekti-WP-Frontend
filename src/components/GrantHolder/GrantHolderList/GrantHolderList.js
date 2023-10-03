import React from 'react';

import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import GrantHolderTerm from "../GrantHolderTerm/GrantHolderTerm";
import ProjectRepository from "../../../repository/projectsRepository";


class GrantHolder extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5,
            managers: []
        }
    }

    componentDidMount() {
        ProjectRepository.fetchManagers()
            .then(response => {
                this.setState({managers: response.data});
            })
            .catch(error => {
                console.error("Error fetching calls", error);
            });
    }

    render() {
        const pageCount = Math.ceil(this.state.calls.length / this.state.size);
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const managers = this.getManagersPage(offset, nextPageOffset);

        return (
            <div className={"container m-4 mt-5"}>
                <h3>Менаџери</h3>
                <br/>
                <div className={"row"}>
                    <div className={"row"}>
                        {managers}
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


    getManagersPage = (offset, nextPageOffset) => {
        const projectTerms = this.props.managers.map((term, index) => {
            return (
                <GrantHolderTerm term={term}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        });

        const managersPage = [];
        for (let i = 0; i < projectTerms.length; i += 4) {
            const pageTerms = projectTerms.slice(i, i + 4);
            const page = (
                <div className="row" key={i}>
                    {pageTerms}
                </div>
            );
            managersPage.push(page);
        }
        return managersPage;
    }
}

export default GrantHolder;
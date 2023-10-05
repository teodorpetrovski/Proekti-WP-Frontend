import React from 'react';

import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import ProfessorTerm from "../ProfessorTerm/professorTerm";
import ProjectRepository from "../../../repository/projectsRepository";


class Professor extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5,
            professors: []
        }
    }

    componentDidMount() {
        ProjectRepository.fetchProfessors()
            .then(response => {
                this.setState({professors: response.data});
            })
            .catch(error => {
                console.error("Error fetching calls", error);
            });
    }

    render() {
        const pageCount = Math.ceil(this.state.calls.length / this.state.size);
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const professors = this.getProfessorsPage(offset, nextPageOffset);

        return (
            <div className={"container m-4 mt-5"}>
                <h3>Професори</h3>
                <br/>
                <div className={"row"}>
                    <div className={"row"}>
                        {professors}
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


    getProfessorsPage = (offset, nextPageOffset) => {
        const projectTerms = this.props.professors.map((term, index) => {
            return (
                <ProfessorTerm term={term}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        });

        const professorsPage = [];
        for (let i = 0; i < projectTerms.length; i += 4) {
            const pageTerms = projectTerms.slice(i, i + 4);
            const page = (
                <div className="row" key={i}>
                    {pageTerms}
                </div>
            );
            professorsPage.push(page);
        }
        return professorsPage;
    }
}

export default Professor;
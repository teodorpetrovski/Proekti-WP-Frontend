import React from 'react';
import InternationalProjectTerm from "../ProjectTerm/internationalProjectTerm";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";


class InternationalProjects extends React.Component {




    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {

        const pageCount = Math.ceil(this.props.projects.length / this.state.size)
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const internationalProjects = this.getInternationalProjects(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>

                <h3>Меѓународни проекти</h3>
                <br/>

                <Link to="/international/add" className="btn btn-primary mb-3 me-3">Додади нов проект</Link>

                <button className="btn btn-secondary mb-3" onClick={this.props.onReport}>
                    Преземи извештај
                </button>
                <div className={"row"}>
                    <div className={"row"}>

                        {internationalProjects}

                    </div>


                    <ul className="pagination justify-content-center">
                        <ReactPaginate previousLabel={"<"}
                                       nextLabel={">"}
                                       breakLabel={<a href="/#">...</a>}
                                       breakClassName={"break-me"}
                                       pageClassName={"page-item"}
                                       pageCount={pageCount}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       onPageChange={this.handlePageClick}
                                       containerClassName={"pagination m-4 justify-content-center border"}
                                       activeClassName={"active"}/>
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


    getInternationalProjects = (offset, nextPageOffset) => {
        const projectTerms = this.props.projects.map((term, index) => {
            return (
                <InternationalProjectTerm key={term.id} term={term}
                                          onEdit={this.props.onEdit}
                                          onDelete={this.props.onDelete}
                                          onExport={this.props.onExport}
                                          onApprove={this.props.onApprove}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        });

        const projectPages = [];
        for (let i = 0; i < projectTerms.length; i += 4) {
            const pageTerms = projectTerms.slice(i, i + 4);
            const page = (
                <div className="row" key={i}>
                    {pageTerms}
                </div>
            );
            projectPages.push(page);
        }

        return projectPages;
    }


}

export default InternationalProjects;
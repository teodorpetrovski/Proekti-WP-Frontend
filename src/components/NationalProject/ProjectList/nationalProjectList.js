import React from 'react';
import NationalProjectTerm from "../ProjectTerm/nationalProjectTerm";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";


class NationalProjects extends React.Component{


    constructor(props) {
        super(props);

        this.state={
            page:0,
            size:5
        }
    }

    render() {

        const pageCount=Math.ceil(this.props.projects.length/this.state.size)
        const offset=this.state.page*this.state.size;
        const nextPageOffset=offset+this.state.size;
        const projects=this.getProjectsPage(offset,nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <h3>Национални проекти</h3>
                <br/>
                <div className={"row"}>
                    <div className={"row"}>

                        {projects}

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

    handlePageClick = (data) =>
    {
        let selected=data.selected;
        this.setState({
            page:selected
        })
    }


    getProjectsPage = (offset, nextPageOffset) => {
        const projectTerms = this.props.projects.map((term, index) => {
            return (
                <NationalProjectTerm term={term} />
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

export default NationalProjects;
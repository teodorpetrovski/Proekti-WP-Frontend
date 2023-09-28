import React from 'react';
import ReactPaginate from "react-paginate";
import InternationalProjectTerm from "../InternationalProject/ProjectTerm/internationalProjectTerm";
import NationalProjectTerm from "../NationalProject/ProjectTerm/nationalProjectTerm";



class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            page: 0,
            size: 5
        }
    }

    render() {


        const pageCount = Math.ceil(this.props.internationalProjects.length+this.props.nationalProjects.length / this.state.size)/2;
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const internationalProjects = this.getInternationalProjects(offset, nextPageOffset);
        const nationalProjects = this.getNationalProjects(offset, nextPageOffset);
        return (
            <div className={"container mm-4 mt-5"}>
                <h3>Резултати од пребарување</h3>
                <br/>
                <div className={"row"}>
                    <div className={"row"}>
                        {internationalProjects}

                        {nationalProjects}
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
        const projectTerms = this.props.internationalProjects.map((term, index) => {
            return (
                <InternationalProjectTerm term={term}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        });

        const projectPages = [];
        for (let i = 0; i < projectTerms.length; i += 3) {
            const pageTerms = projectTerms.slice(i, i + 3);
            const page = (
                <div className="row" key={i}>
                    {pageTerms}
                </div>
            );
            projectPages.push(page);
        }

        return projectPages;
    }


    getNationalProjects = (offset, nextPageOffset) => {
        const projectTerms = this.props.nationalProjects.map((term, index) => {
            return (
                <NationalProjectTerm term={term}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        });

        const projectPages = [];
        for (let i = 0; i < projectTerms.length; i += 3) {
            const pageTerms = projectTerms.slice(i, i + 3);
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

export default SearchResults;
import React from 'react';
import AllProjectTerm from "../ProjectTerm/allProjectTerm";
import ReactPaginate from "react-paginate";
import NationalProjectTerm from "../../NationalProject/ProjectTerm/nationalProjectTerm";


class HomeProjects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            combinedProjects: [],
            page: 0,
            size: 5
        }
    }

    render() {

        const { internationalProjects, nationalProjects, onDelete } = this.props;
        const combinedProjects = [...internationalProjects, ...nationalProjects];

        const pageCount = Math.ceil(combinedProjects.length / this.state.size);
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const projects = this.getProjectsPage(offset, nextPageOffset, combinedProjects);
        return (
            <div className={"container mm-4 mt-5"}>
                <h3>Сите проекти</h3>
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

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }


    getProjectsPage = (offset, nextPageOffset) => {
        const projectTerms = this.props.projects.map((term, index) => {
            return (
                <AllProjectTerm term={term}  onDelete={this.props.onDelete}/>
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

export default HomeProjects;
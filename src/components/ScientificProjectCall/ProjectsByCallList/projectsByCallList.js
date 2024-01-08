import React from 'react';
import ReactPaginate from "react-paginate";

import NationalProjectTermUser from "../../NationalProject/ProjectTerm(User)/nationalProjectTermUser";
import CallTerm from "../CallTerm/callTerm";
import {Link} from "react-router-dom";



class ProjectsByCall extends React.Component {



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
        const nationalProjects = this.getNationalProjects(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <h3>{this.props.call.name}</h3>
                <br/>
                <Link className={"btn btn-info mb-3"}
                      to={`/calls/projectsByCall/${this.props.call.id}/apply`}>
                    Аплицирај проект
                </Link>
                <div className={"row "}>
                    <div className={"row"}>

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

/*
    getNationalProjects = (offset, nextPageOffset) => {
        const projectTerms = this.props.projects.map((term, index) => {
            return (


                <NationalProjectTermUser key={term.id} term={term}

                />

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
    */

    getNationalProjects = (offset, nextPageOffset) => {
        const tableRows = [];
        const terms = this.props.projects.slice(offset, nextPageOffset);

        for (let i = 0; i < terms.length; i += 3) {
            const termSlice = terms.slice(i, i + 3);
            const row = (
                <tr key={i}>
                    {termSlice.map((term, index) => (
                        <td className="p-1" key={index}>
                            <NationalProjectTermUser key={term.id} term={term}
                            />
                        </td>
                    ))}
                </tr>
            );
            tableRows.push(row);
        }

        return (
            <table className="table table-borderless table-light">
                <tbody>{tableRows}</tbody>
            </table>
        );
    }


}

export default ProjectsByCall;
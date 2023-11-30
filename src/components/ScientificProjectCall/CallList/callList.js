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

        }
    }


    render() {
        const pageCount = Math.ceil(this.props.calls.length / this.state.size);
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const calls = this.getCallsPage(offset, nextPageOffset);

        return (
            <div className={"container m-4 mt-5"}>
                <h3>Повици</h3>
                <br/>
                <a href="/calls/add" class="btn btn-primary" className="btn btn-primary mb-3">Додади нов повик</a>
                <div className={"row"}>
                    <div >
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
        const tableRows = [];
        const terms = this.props.calls.slice(offset, nextPageOffset);

        for (let i = 0; i < terms.length; i += 3) {
            const termSlice = terms.slice(i, i + 3);
            const row = (
                <tr key={i}>
                    {termSlice.map((term, index) => (
                        <td className="p-1" key={index}>
                            <CallTerm term={term} onGetNationalProjects={this.props.onGetNationalProjects} />
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
    };
}

export default Calls;
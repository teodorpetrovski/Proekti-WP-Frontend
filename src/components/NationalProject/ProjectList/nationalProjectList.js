import React from 'react';
import NationalProjectTerm from "../ProjectTerm(Admin)/nationalProjectTerm";
import ReactPaginate from "react-paginate";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {Link} from "react-router-dom";
import AddNationalProject from "../AddNationallProject/addNationalProject";
import CallTerm from "../../ScientificProjectCall/CallTerm/callTerm";


class NationalProjects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 6
        }
    }

    render() {

        const pageCount = Math.ceil(this.props.projects.length / this.state.size)
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const nationalProjects = this.getNationalProjects(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <h3>Национални проекти</h3>
                <br/>
                <div className="row">
                    <Link to="/national/add" className="btn btn-primary mb-3 me-3 col-3">Додади нов проект</Link>
                    <div className="col-2"></div>
                    <button className="btn btn-secondary mb-3 col-3" onClick={this.props.onReport}>
                        Преземи извештај
                    </button>
                    <Datetime
                        value={this.state.selectedDate}
                        onChange={(date) => this.setState({ selectedDate: date })}
                        inputProps={{ placeholder: 'Select a date' }}
                        className="w-25 col-3 mb-3"
                    />
                </div>



                <div className={"row"}>
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

    getNationalProjects = (offset, nextPageOffset) => {
        const tableRows = [];
        const terms = this.props.projects.slice(offset, nextPageOffset);

        for (let i = 0; i < terms.length; i += 3) {
            const termSlice = terms.slice(i, i + 3);
            const row = (
                <tr key={i}>
                    {termSlice.map((term, index) => (
                        <td className="p-1" key={index}>
                            <NationalProjectTerm key={term.id} term={term}
                                                 onEdit={this.props.onEdit}
                                                 onDelete={this.props.onDelete}
                                                 onExport={this.props.onExport}
                                                 onApprove={this.props.onApprove}
                                                 onFinish={this.props.onFinish}
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

export default NationalProjects;
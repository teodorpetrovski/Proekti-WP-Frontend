import React from 'react';
import InternationalProjectTerm from "../ProjectTerm/internationalProjectTerm";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import CallTerm from "../../ScientificProjectCall/CallTerm/callTerm";
import axios from "../../../custom-axios/axios";
import {format} from "date-fns";


class InternationalProjects extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 6,
            selectedDate: null,
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

                <div className="row">
                    <Link to="/international/add" className="btn btn-primary mb-3 me-3 col-3">Додади нов проект</Link>
                    <div className="col-2"></div>
                    <button className="btn btn-secondary mb-3 col-3" onClick={this.fetchInternationalProjectReport}>
                        Преземи извештај
                    </button>
                    <Datetime
                        value={this.state.selectedDate}
                        onChange={(date) => {
                            console.log("Selected date:", date);
                            const formattedDate = format(date.toString(), 'yyyy-MM-dd');
                            this.setState({selectedDate: formattedDate}, () => {
                                console.log("Updated selectedDate:", this.state.selectedDate);
                            });
                        }}
                        inputProps={{placeholder: 'Select a date'}}
                        className="w-25 col-3 mb-3"
                    />
                </div>


                {/*<button className="btn btn-secondary mb-3" onClick={this.props.onReport}>*/}
                {/*    Преземи извештај*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className="btn btn-secondary mb-3"*/}
                {/*    onClick={() => this.props.onReport(this.state.selectedDate)}*/}
                {/*>*/}
                {/*    Преземи извештај*/}
                {/*</button>*/}


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

    fetchInternationalProjectReport = () => {

        return axios.get("international/report",
            {
                responseType: 'blob',
                params: {date: this.state.selectedDate}
            }).then(response => {
            if (response.status === 404) {
                // Do nothing or handle the error in a suitable way
                console.log("Report not found");
                return; // Exit the function
            }

            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const url = window.URL.createObjectURL(blob);


            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'File.pdf');
            document.body.appendChild(link);
            link.click();


            window.URL.revokeObjectURL(url);
        });
    }

    /*
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
        */

    getInternationalProjects = (offset, nextPageOffset) => {
        const tableRows = [];
        const terms = this.props.projects.slice(offset, nextPageOffset);

        for (let i = 0; i < terms.length; i += 3) {
            const termSlice = terms.slice(i, i + 3);
            const row = (
                <tr key={i}>
                    {termSlice.map((term, index) => (
                        <td className="p-1" key={index}>
                            <InternationalProjectTerm key={term.id} term={term}
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

export default InternationalProjects;
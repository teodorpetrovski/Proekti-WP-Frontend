import React from 'react';
import ReactPaginate from "react-paginate";
import InternationalProjectTerm from "../InternationalProject/ProjectTerm/internationalProjectTerm";
import NationalProjectTerm from "../NationalProject/ProjectTerm(Adm)/nationalProjectTerm";



class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            page: 0,
            size: 6
        }
    }

    render() {


        const pageCount = Math.ceil((this.props.internationalProjects.length + this.props.nationalProjects.length) / (2 * this.state.size));
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
        const tableRows = [];
        const terms = this.props.internationalProjects.slice(offset, nextPageOffset);

        for (let i = 0; i < terms.length; i += 3) {
            const termSlice = terms.slice(i, i + 3);
            const row = (
                <tr key={i}>
                    {termSlice.map((term, index) => (
                        <td className="p-1" key={index}>
                            <InternationalProjectTerm term={term} key={index}
                                                      onEdit={this.props.onEditInternational}
                                                      onDelete={this.props.onDeleteInternational}
                                                      onExport={this.props.onExportInternational}
                                                      onApprove={this.props.onApproveInternational}
                                                      onFinish={this.props.onFinishInternational}

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

    getNationalProjects = (offset, nextPageOffset) => {
        const tableRows = [];
        const terms = this.props.nationalProjects.slice(offset, nextPageOffset);

        for (let i = 0; i < terms.length; i += 3) {
            const termSlice = terms.slice(i, i + 3);
            const row = (
                <tr key={i}>
                    {termSlice.map((term, index) => (
                        <td className="p-1" key={index}>
                            <NationalProjectTerm term={term} key={index}
                                                 onEdit={this.props.onEditNational}
                                                 onDelete={this.props.onDeleteNational}
                                                 onExport={this.props.onExportNational}
                                                 onApprove={this.props.onApproveNational}
                                                 onFinish={this.props.onFinishNational}
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

export default SearchResults;
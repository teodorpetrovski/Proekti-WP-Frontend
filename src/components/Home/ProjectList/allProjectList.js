import React from 'react';
import AllProjectTerm from "../ProjectTerm/allProjectTerm";
import ReactPaginate from "react-paginate";
import NationalProjectTerm from "../../NationalProject/ProjectTerm(Admin)/nationalProjectTerm";
import InternationalProjectTerm from "../../InternationalProject/ProjectTerm/internationalProjectTerm";
import CustomListGroup from "../CustomListGroup"; 

class HomeProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        };
    }

    render() {
        const pageCount = Math.ceil((this.props.internationalProjects.length + this.props.nationalProjects.length) / (2 * this.state.size));
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const internationalProjects = this.getInternationalProjects(offset, nextPageOffset);
        const nationalProjects = this.getNationalProjects(offset, nextPageOffset);

        const menuItems = [
            { text: 'Сите проекти', link: '/' },
            { text: 'Мои проекти', link: '#' },
            { text: 'Нов повик', link: '/calls/add' },
            { text: 'Управување на проекти', link: '#' },
        ];

        return (
            <div className="container mm-4 mt-5">
                <div className="row">
                    <div className="col-md-2 sidebar" >
                        <CustomListGroup items={menuItems} />
                    </div>
                    <div className="col-md-10 content" style={{marginLeft:'30px'}}>
                        <br />
                        <div className="row">
                            
                            <div className="row" style={{marginLeft:'230px', marginTop:'-220px'}}>
                                <h3>Сите проекти</h3>
                                {internationalProjects}
                                {nationalProjects}
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
                </div>
            </div>
        );
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        });
    }

    getInternationalProjects = (offset, nextPageOffset) => {
        const projectTerms = this.props.internationalProjects.map((term, index) => {
            return (
                <InternationalProjectTerm term={term} key={index} />
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
                <NationalProjectTerm term={term} key={index} />
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

export default HomeProjects;

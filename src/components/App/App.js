import logo from '../../logo.svg';
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../Header/header";
import InternationalProjects from "../InternationalProject/ProjectList/internationalProjectList";
import NationalProjects from "../NationalProject/ProjectList/nationalProjectList";
import projectsRepository from "../../repository/projectsRepository";
import Calls from "../ScientificProjectCall/CallList/callList";
import AddCall from "../Create/AddCall";
import HomeProjects from "../Home/ProjectList/allProjectList";
import EditNationalProjectForm from "../Update/EditNationalProject";
import EditInternationalProjectForm from "../Update/EditInternationalProject";
import SearchResults from "../SearchResults/searchResults";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            internationalProjects: [],
            nationalProjects: [],
            calls: [],
            internationalProjectsFiltered: [],
            nationalProjectsFiltered: [],

        }
    }

    render() {
        return (
            <div className={"bg-light"}>
                <Router>
                    <Header onFilterNational={this.loadNationalProjectsFiltered} onFilterInternational={this.loadInternationalProjectsFiltered}/>
                    <main>
                        <div className={"container "}>

                            <Routes>

                                <Route path={"/results"} exact
                                       element={<SearchResults  internationalProjects={this.state.internationalProjectsFiltered}
                                                               nationalProjects={this.state.nationalProjectsFiltered}
                                       />}/>

                                <Route path={"/calls"} exact
                                       element={<Calls calls={this.state.calls}/>}/>

                                <Route path={"/internationalprojects"} exact
                                       element={<InternationalProjects projects={this.state.internationalProjects}
                                                                       onExport={this.exportInternationalProject}/>}/>
                                <Route path={"/allprojects"} exact
                                       element={<HomeProjects  internationalProjects={this.state.internationalProjects}
                                                               nationalProjects={this.state.nationalProjects}
                                                              />}/>

                                <Route path={"/nationalprojects"} exact
                                       element={<NationalProjects projects={this.state.nationalProjects}
                                                                  onExport={this.exportNationalProject}/>}/>

                                <Route path="/add-call" element={<AddCall/>}/>

                                <Route path="/edit-internationalproject/:projectId"
                                       element={<EditInternationalProjectForm/>}/>
                  
                                <Route path="/edit-nationalproject/:projectId" element={<EditNationalProjectForm/>}/>


                            </Routes>

                        </div>
                    </main>
                </Router>

            </div>

        );
    }



    loadInternationalProjects = () => {
        projectsRepository.fetchInternationalProjects()
            .then((data) => {
                    this.setState({
                        internationalProjects: data.data
                    })
                }
            )
    }

    loadNationalProjects = () => {
        projectsRepository.fetchNationalProjects()
            .then((data) => {
                    this.setState({
                        nationalProjects: data.data
                    })
                }
            )
    }


    loadInternationalProjectsFiltered = (keyword) => {
        projectsRepository.fetchInternationalProjectsFiltered(keyword)
            .then((data) => {
                    this.setState({
                        internationalProjectsFiltered: data.data
                    })
                }
            )
    }

    loadNationalProjectsFiltered = (keyword) => {
        projectsRepository.fetchNationalProjectsFiltered(keyword)
            .then((data) => {
                    this.setState({
                        nationalProjectsFiltered: data.data
                    })
                }
            )
    }



    loadCalls = () => {
        projectsRepository.fetchCalls()
            .then((data) => {
                    this.setState({
                        calls: data.data
                    })
                }
            )
    }

    deleteProject = (id) => {
        projectsRepository.deleteProject(id)
            .then(() => {
                this.loadProducts();
            });
    }


    exportInternationalProject = (id) => {
        projectsRepository.exportInternationalProject(id)
    }

    exportNationalProject = (id) => {
        projectsRepository.exportNationalProject(id)
    }

    exportAllProject = (id) => {
        projectsRepository.exportAllProject(id)
    }

    componentDidMount() {
        this.loadInternationalProjects();
        this.loadNationalProjects();
        this.loadCalls();


    }
}

export default App;
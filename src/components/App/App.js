import logo from '../../logo.svg';
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../Header/header";
import InternationalProjects from "../InternationalProject/ProjectList/internationalProjectList";
import NationalProjects from "../NationalProject/ProjectList/nationalProjectList";
import projectsRepository from "../../repository/projectsRepository";
import Calls from "../ScientificProjectCall/CallList/callList";
import AddCall from "../ScientificProjectCall/AddScientificProjectCall/addCall"
import HomeProjects from "../Home/ProjectList/allProjectList";
import EditNationalProjectForm from "../Update/EditNationalProject";
import EditInternationalProjectForm from "../Update/EditInternationalProject";
import SearchResults from "../SearchResults/searchResults";
import ScientificProjectCallDetails from "../ScientificProjectCall/CallDetails/scientificProjectCallDetails";
import DetailsCall from "../ScientificProjectCall/CallDetails/detailsCall";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            internationalProjects: [],
            nationalProjects: [],
            selectedNationalProject: {},
            calls: [],
            internationalProjectsFiltered: [],
            nationalProjectsFiltered: [],
            selectedCall: null,
        }
    }

    handleCallSelect = (projectId) => {
        const selectedProject = this.state.calls.find((project) => project.id === projectId);
        this.setState({ selectedProject });
    };
    fetchCallDetails = (id) => {
        projectsRepository.fetchProjectCallById(id)
            .then((data) => {
                this.setState({
                    selectedCall: data.data,
                });
            });
    };

    handleApproveNationalProject = (projectId) => {
        projectsRepository.approveNationalProject(projectId)
            .then((response) => {
                if (response.status === 200) {
                    const updatedProjects = this.state.nationalProjects.map((project) => {
                        if (project.id === projectId) {
                            return {
                                ...project,
                                approved: true,
                            };
                        }
                        return project;
                    });
                    this.setState({ nationalProjects: updatedProjects });
                }
            })
            .catch((error) => {
                console.error('Error approving project:', error);
            });
    };

    handleApproveInternatioanlProject = (projectId) => {
        projectsRepository.approveInternationalProject(projectId)
            .then((response) => {
                if (response.status === 200) {
                    const updatedProjects = this.state.internationalProjects.map((project) => {
                        if (project.id === projectId) {
                            return {
                                ...project,
                                approved: true,
                            };
                        }
                        return project;
                    });
                    this.setState({ internationalProjects: updatedProjects });
                }
            })
            .catch((error) => {
                console.error('Error approving project:', error);
            });
    };

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

                                {/*<Route path={"/calls"} exact*/}
                                {/*       element={<Calls calls={this.state.calls}*/}
                                {/*                       onSelect={this.handleCallSelect}*/}
                                {/*       />}/>*/}

                                {/*<Route path={"/calls"} exact element={<Calls calls={this.state.calls} project={this.state.selectedProject} />} />*/}

                                <Route path={"/calls"} exactt element={<Calls calls={this.state.calls}/>}/>

                                <Route path="/calls/:callId" element={<DetailsCall />} />
                                <Route path={"/internationalprojects"} exact
                                       element={<InternationalProjects projects={this.state.internationalProjects}
                                                                       onDelete={this.deleteInternationalProject}
                                                                       onExport={this.exportInternationalProject}
                                                                       onApprove={this.handleApproveInternatioanlProject}
                                       />
                                }/>


                                <Route path="/calls/add" element={<AddCall onAdd={this.addCall} />}></Route>

                                <Route path={"/allprojects"} exact
                                       element={<HomeProjects  internationalProjects={this.state.internationalProjects}
                                                               nationalProjects={this.state.nationalProjects}
                                                              />}/>

                                <Route path={"/national"} exact
                                       element={<NationalProjects projects={this.state.nationalProjects}
                                                                  onEdit={this.getNationalProject}
                                                                  onDelete={this.deleteNationalProject}
                                                                  onExport={this.exportNationalProject}
                                                                  onApprove={this.handleApproveNationalProject}
                                       />}/>



                                <Route path="/edit-internationalproject/:projectId"
                                       element={<EditInternationalProjectForm/>}/>

                                <Route path={"/national/edit/:projectId"}exact
                                       element={<EditNationalProjectForm
                                           calls={this.state.calls}
                                           project={this.state.selectedNationalProject}
                                           onEditNatProject={this.editNationalProject}
                                           loadNationalProjects={this.loadNationalProjects}
                                       />}/>


                                <Route
                                    path="/national/details"
                                    element={<ScientificProjectCallDetails project={this.state.selectedProject} />}
                                />

                                {/*<Route*/}
                                {/*    path="/calls/:id"*/}
                                {/*    element={<ScientificProjectCallDetails call={this.state.selectedCall} />}*/}
                                {/*/>*/}

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
    getNationalProject = (id) => {
        projectsRepository.getNationalProject(id)
            .then((data) => {
                this.setState({
                    selectedNationalProject: data.data
                })
            })
    }


    addCall=(name, acronym, endDate, typeScientificProjectCall, grantHolderName,grantHolderDescription, typeStatus)=>{
        projectsRepository.addCall(name, acronym, endDate, typeScientificProjectCall, grantHolderName,grantHolderDescription, typeStatus)
            .then(() => {
              this.loadCalls();
            })
    }


    deleteProject = (id) => {
        projectsRepository.deleteProject(id)
    }


    editNationalProject = (id, name, dateEntry, call, manager, typeStatus) => {
        console.log("Editing project with the following data:");
        console.log("ID:", id);
        console.log("Name:", name);
        console.log("Date Entry:", dateEntry);
        console.log("Call:", call);
        console.log("Manager:", manager);
        console.log("Type Status:", typeStatus);

        projectsRepository.editNationalProject(id, name, dateEntry, call, manager, typeStatus)
            .then(() => {
                console.log("Project edited successfully.");
                this.loadNationalProjects();
            })
            .catch((error) => {
                console.error("Error editing project:", error);
            });
    };

        deleteNationalProject = (id) => {
            projectsRepository.deleteNationalProject(id)
                .then(() => {
                    this.loadNationalProjects();
                });
        }

        deleteInternationalProject = (id) => {
            projectsRepository.deleteInternationalProject(id)
                .then(() => {
                    this.loadInternationalProjects();
                });
        }
        exportInternationalProject = (id) => {
            projectsRepository.exportInternationalProject(id)
        }

        exportNationalProject = (id) => {
            projectsRepository.exportNationalProject(id)
        }



    componentDidMount() {
        this.loadCalls();
        this.loadInternationalProjects();
        this.loadNationalProjects();

    }
}

export default App;
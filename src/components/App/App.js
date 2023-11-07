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
import EditNationalProjectForm from "../NationalProject/EditNationalProject/EditNationalProject";
import EditInternationalProjectForm from "../InternationalProject/EditInternationalProject/EditInternationalProject";
import SearchResults from "../SearchResults/searchResults";
import Professor from "../Professor/ProfessorList/professorList";
import Grandholder from "../Grandholder/GrandholderList/grandholderList";
import NationalProjectAdd from "../NationalProject/AddNationallProject/addNationalProject";
import InternationalProjectAdd from "../InternationalProject/AddInternationalProject/addInternationalProject";
import NationalDetails from "../NationalProject/DetailsNational/nationalDetails";
import InternationalDetails from "../InternationalProject/DetailsInternational/internationalDetails";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            internationalProjects: [],
            nationalProjects: [],
            selectedNationalProject: {},
            selectedInternationalProject: {},
            calls: [],
            professors:[],
            grandholders:[],
            internationalProjectsFiltered: [],
            nationalProjectsFiltered: [],
        }
    }


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

    fetchNationalProjectDetails = (projectId) => {
        projectsRepository.getNationalProject(projectId)
            .then((response) => {
                this.setState({
                    nationalProject: response.data,
                });
            })
            .catch((error) => {
                console.error("Error fetching project details:", error);
            });
    }

    fetchInternationalProjectDetails = (projectId) => {
        projectsRepository.getInternationalProject(projectId)
            .then((response) => {
                this.setState({
                    internationalProjects: response.data,
                });
            })
            .catch((error) => {
                console.error("Error fetching project details:", error);
            });
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
                                <Route path={"/professors"} exact
                                       element={<Professor professors={this.state.professors}/>}/>

                                <Route path={"/grantHolder"} exact
                                       element={<Grandholder grandholder={this.state.grandholders}/>}/>


                                <Route path={"/calls"} exactt element={<Calls calls={this.state.calls}/>}/>
                                
                                <Route path={"/international"} exact
                                       element={<InternationalProjects projects={this.state.internationalProjects}
                                                                       onEdit={this.getInternationalProject}
                                                                       onDelete={this.deleteInternationalProject}
                                                                       onExport={this.exportInternationalProject}
                                                                       onApprove={this.handleApproveInternatioanlProject}
                                                                       onReport={this.fetchInternationalProjectReport}
                                       />
                                }/>


                                <Route path="/calls/add" element={<AddCall onAdd={this.addCall} />}></Route>

                                <Route path={"/"} exact
                                       element={<HomeProjects  internationalProjects={this.state.internationalProjects}
                                                               nationalProjects={this.state.nationalProjects}
                                                              />}/>

                                <Route path={"/national"} exact
                                       element={<NationalProjects projects={this.state.nationalProjects}
                                                                  onEdit={this.getNationalProject}
                                                                  onDelete={this.deleteNationalProject}
                                                                  onExport={this.exportNationalProject}
                                                                  onApprove={this.handleApproveNationalProject}
                                                                  onReport={this.fetchNationalProjectReport}
                                       />}/>



                                <Route path={"/international/edit/:projectId"} exact
                                       element={<EditInternationalProjectForm
                                            grandholders={this.state.grandholders}
                                            project={this.state.selectedInternationalProject}
                                            onEditIntProject={this.editInternationalProject}
                                            loadInternationalProjects={this.loadInternationalProjects}
                                       />}/>

                                <Route path={"/national/edit/:projectId"}exact
                                       element={<EditNationalProjectForm
                                           calls={this.state.calls}
                                           professors={this.state.professors}
                                           project={this.state.selectedNationalProject}
                                           onEditNatProject={this.editNationalProject}
                                           loadNationalProjects={this.loadNationalProjects}
                                       />}/>

                                <Route path={"/national/add"} exact
                                       element={<NationalProjectAdd
                                           calls={this.state.calls}
                                           professors={this.state.professors}
                                           project={this.state.selectedNationalProject}
                                           onAddNationalProject={this.addNationalProject}
                                           />}/>
                                <Route path={"/international/add"} exact
                                       element={<InternationalProjectAdd
                                           grandholders={this.state.grandholders}
                                           project={this.state.selectedInternationalProject}
                                           onAddInternationalProject={this.addInternationalProject}
                                       />}/>
                                <Route
                                    path="/national/details/:projectId"
                                    element={<NationalDetails fetchDetails={this.fetchNationalProjectDetails} nationalProject={this.state.nationalProject} />}
                                />

                                <Route
                                    path="/international/details/:projectId"
                                    element={<InternationalDetails fetchDetails={this.fetchInternationalProjectDetails} internationalProject={this.state.internationalProjects} />}
                                />

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

    loadProfessors = () => {
        projectsRepository.fetchProfessors()
            .then((data) => {
                    this.setState({
                        professors: data.data
                    })
                }
            )
    }

    loadGrandholders = () => {
        projectsRepository.fetchGrandholders()
            .then((data) => {
                    this.setState({
                        grandholders: data.data
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
    getInternationalProject = (id) => {
        projectsRepository.getInternationalProject(id)
            .then((data) => {
                this.setState({
                    selectedInternationalProject: data.data
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


    editNationalProject = (id, name, dateEntry, call, professor, typeStatus, keyWords, summary, benefits, members) => {
        console.log("Editing project with the following data:");
        console.log("ID:", id);
        console.log("Name:", name);
        console.log("Date Entry:", dateEntry);
        console.log("Call:", call);
        console.log("Professor:", professor);
        console.log("Type Status:", typeStatus);
        console.log("Keywords:", keyWords);
        console.log("Summary:", summary);
        console.log("Benefits:", benefits);
        console.log("Members:", members);

        projectsRepository.editNationalProject(id, name, dateEntry, call, professor, typeStatus, keyWords, summary, benefits, members)
            .then(() => {
                console.log("Project edited successfully.");
                this.loadNationalProjects();
            })
            .catch((error) => {
                console.error("Error editing project:", error);
            });
    };

    addNationalProject = (name, dateEntry, callId, professorId, typeStatus, keyWords, summary, benefits, members) => {
        projectsRepository.addNationalProject(name, dateEntry, callId, professorId, typeStatus, keyWords, summary, benefits, members)
            .then(() => {
                this.loadNationalProjects();
            });
    }
    addInternationalProject = (name, type, dateEntry, startDate, endDate, primaryInstitution, typeStatus, description, goals, anotherInstitution, carrier, partners) => {
        projectsRepository.addInternationalProject(name, type, dateEntry, startDate, endDate, primaryInstitution, typeStatus, description, goals, anotherInstitution, carrier, partners)
            .then(() => {
                this.loadInternationalProjects();
            });
    }
    editInternationalProject = (id, name, type, startDate, endDate, primaryInstitution, typeStatus) => {
        console.log("Editing project with the following data:");
        console.log("ID:", id);
        console.log("Name:", name);
        console.log("Type:", type);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        console.log("Primary Institution:", primaryInstitution);
        console.log("Type Status:", typeStatus);

        projectsRepository.editInternationalProject(id, name, type, startDate, endDate, primaryInstitution, typeStatus)
            .then(() => {
                console.log("Project edited successfully.");
                this.loadInternationalProjects();
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

    fetchNationalProjectReport = () => {
        projectsRepository.fetchNationalProjectReport()
    }

    fetchInternationalProjectReport = () => {
        projectsRepository.fetchInternationalProjectReport()
    }



    componentDidMount() {
        this.loadCalls();
        this.loadInternationalProjects();
        this.loadNationalProjects();
        this.loadProfessors();
        this.loadGrandholders();
    }
}

export default App;
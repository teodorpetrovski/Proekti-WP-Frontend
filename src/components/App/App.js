import logo from '../../logo.svg';
import './App.css';
import {Component} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/header";
import InternationalProjects from "../InternationalProject/ProjectList/internationalProjectList";
import projectsRepository from "../../repository/projectsRepository";
import Calls from "../ScientificProjectCall/CallList/callList";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        internationalProjects:[],
        calls:[],

    }
  }

  render() {
    return (
        <div className={"bg-light"}>
        <Router>
          <Header/>
          <main>
            <div className={"container "}>

              <Routes>

                  <Route path={"/calls"} exact
                         element={<Calls calls={this.state.calls}/>}/>

                <Route path={"/internationalprojects"} exact
                       element={<InternationalProjects projects={this.state.internationalProjects} onExport={this.exportInternationalProject}/>}/>



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

    loadCalls = () => {
        projectsRepository.fetchCalls()
            .then((data) => {
                    this.setState({
                        calls: data.data
                    })
                }
            )
    }


    exportInternationalProject = (id) =>
    {
        projectsRepository.exportInternationalProject(id)
    }







    componentDidMount() {
    this.loadInternationalProjects();
    this.loadCalls();

  }
}

export default App;
import React from "react";
import "./styles.css"

const NationalProjectTerm = (props) => {

    // const state = {
    //     isApproved: this.props.term.approved,
    // };

    // const handleApproveClick = () => {
    //     // Perform your logic to handle project approval here (e.g., make an API request).
    //
    //     // Simulate the approval by updating the state.
    //     this.setState({ isApproved: true });
    // };


    // const handleExportClick = () => {
    //     try {
    //         props.onExport(props.term.id);
    //     } catch (error) {
    //         console.error("Error exporting project:", error);
    //     }
    // };
    //
    //     const { term, onDelete, onExport } = this.props;
    //     const { isApproved } = this.state;
    //     return (
    //         <div className="col">
    //             <a href="/national/{id}" style={{ textDecoration: 'none' }}>
    //                 <div className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `} style={{ maxWidth: 390 }}>
    //                     <div className="card-body">
    //                         <h2 className="card-title fw-lighter ">{props.term.name}</h2>
    //                         <p className="card-text p-1" style={{fontSize:'15px'}} >
    //                             <strong>Име на проектот: </strong>{props.term.name}<br/>
    //                             <strong>Внесен на: </strong>{props.term.dateEntry}<br/>
    //                             <strong>Повик: </strong>{props.term.scientificProjectCall.name}<br/>
    //                             <strong>Раководидел на проектот: </strong>{props.term.manager.name}<br/>
    //                             <strong>Статус: </strong>{props.term.typeStatus}<br/>
    //                         </p>
    //                         <a title={"Delete"} className={"btn btn-danger"}
    //                            onClick={() => props.onDelete(props.term.id)}>
    //                             Избриши
    //                         </a>
    //                         <button className="btn btn-primary btn-sm" onClick={handleExportClick}>
    //                             Експорт
    //                         </button>
    //
    //                         <button className="btn btn-success btn-sm">Уреди</button>
    //                         {/*<button*/}
    //                         {/*    className="btn btn-primary btn-sm"*/}
    //                         {/*    onClick={this.handleApproveClick}*/}
    //                         {/*    disabled={isApproved}*/}
    //                         {/*>*/}
    //                         {/*    {isApproved ? 'Одобри' : 'Одобрено'}*/}
    //                         {/*</button>*/}
    //                     </div>
    //                 </div>
    //             </a>
    //         </div>
    //         )


    const NationalProjectTerm = (props) => {
        const handleExportClick = () => {
            try {
                props.onExport(props.term.id);
            } catch (error) {
                console.error("Error exporting project:", error);
            }
        };

        return (
            <div className="col">
                <a href={`/national/${props.term.id}`} style={{textDecoration: 'none'}}>
                    <div
                        className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'}`}
                        style={{maxWidth: 390}}>
                        <div className="card-body">
                            <h2 className="card-title fw-lighter">{props.term.name}</h2>
                            <p className="card-text p-1" style={{fontSize: '15px'}}>
                                <strong>Име на проектот: </strong>{props.term.name}<br/>
                                <strong>Внесен на: </strong>{props.term.dateEntry}<br/>
                                <strong>Повик: </strong>{props.term.scientificProjectCall.name}<br/>
                                <strong>Раководидел на проектот: </strong>{props.term.manager.name}<br/>
                                <strong>Статус: </strong>{props.term.typeStatus}<br/>
                            </p>
                            <a title="Delete" className="btn btn-danger" onClick={() => props.onDelete(props.term.id)}>
                                Избриши
                            </a>
                            <button className="btn btn-primary btn-sm" onClick={handleExportClick}>
                                Експорт
                            </button>
                            <button className="btn btn-success btn-sm">Уреди</button>
                        </div>
                    </div>
                </a>
            </div>
        );
    };
}
export default NationalProjectTerm;




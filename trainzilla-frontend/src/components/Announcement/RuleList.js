import React, {Component} from "react";
import '../../styles/css/announcement.sass';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import axios from 'axios';

class RuleList extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/ruleList')
        .then(res => {
            const list = res.data
            this.setState({ list });
        })
        .catch(function (error) {
            console.log(error);
        }); 
        
        $(document).ready(function () {
            setTimeout(function(){
                $('#ruleTable').DataTable({
                    "aaSorting": [],
                    "order": [[ 0, 'desc' ]]
                });
            }, 1000);
        });
    }

    render() {
        return(
            <div id="ruleComponent" className="d-none">
                <table className="table table-bordered table-striped" id="ruleTable">
                    <thead>
                        <tr>
                            <th className="rDate">Date</th>
                            <th className="aTitle">Title</th>
                            <th className="aDetails">Details</th>
                        </tr>
                    </thead>
                    <tbody id="ruleTableBody">
                    {
                        this.state.list.map((ritem, key) =>
                        <tr key={key}>
                            <td>
                                <div className="rDate">{ritem.ruleDate}</div>
                            </td>
                            <td>
                                <div className="aTitle">{ritem.ruleTitle}</div>
                            </td>
                            <td>
                                <div className="aDetails">{ritem.ruleDetails}</div>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RuleList
import React, {Component} from "react";
import '../../styles/css/announcement.sass';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import axios from 'axios';

class AnnouncementList extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/announcementList')
        .then(res => {
            const data = res.data
            this.setState({ data });
        })
        .catch(function (error) {
            console.log(error);
        }); 
        
        $(document).ready(function () {
            setTimeout(function(){
                $('#announcementTable').DataTable({
                    "aaSorting": [],
                    "order": [[ 0, 'desc' ]]
                });
            }, 1000);
        });
    }

    render() {
        return(
            <div id="announceComponent">
                <table class="table table-bordered table-striped" id="announcementTable">
                    <thead>
                        <tr>
                            <th className="aDate">Date</th>
                            <th className="aTitle">Title</th>
                            <th className="aDetails">Details</th>
                        </tr>
                    </thead>
                    <tbody id="announcementTableBody">
                    {
                        this.state.data.map((aitem) => 
                        <tr>
                            <td>
                                <div className="aDate">{aitem.reportDate}</div>
                            </td>
                            <td>
                                <div className="aTitle">{aitem.reportTitle}</div>
                            </td>
                            <td>
                                <div className="aDetails">{aitem.reportDetails}</div>
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

export default AnnouncementList
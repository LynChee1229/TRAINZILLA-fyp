import React from 'react'
import { useState } from "react";
import '../../styles/css/announcement.sass'
import Header from "../Header/Header";

function Announcement()
{
    const [announcement, setAnnouncement] = useState("Filter by");

    const handleChange = (event) => {
        setAnnouncement(event.target.value)
    }

    return (
        <div className="Announcement">
            <Header />
            <div class="upper">
                <div class="inUpper1">Train Updates</div>
                <a href="/rules"><div class="inUpper2">Rules</div></a>
            </div>

            <div class="filter">
                <form>
                    <select value={announcement} onChange={handleChange}>
                        {/*<div class="filter">Filter by</div></a>*/}
                        <option value="Newest date">Newest date</option>
                        <option value="Oldest date">Oldest date</option>
                        <option value="Oldest date">ASC title</option>
                        <option value="Oldest date">DSC title</option>
                    </select>
                </form>
            </div>

            <div class="bottom">
                <table>
                    <tr>
                        <th>DATE</th>
                        <th class="title">TITLE</th>
                        <th class="desc">DETAIL</th>
                    </tr>
                    <tr>
                        <td>5/10/2021</td>
                        <td class="titles">Lorem ipsum dolor sit amet</td>
                        <td>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt </td>
                    </tr>
                    <tr>
                        <td>4/10/2021</td>
                        <td class="titles">Lorem ipsum dolor sit amet</td>
                        <td>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt </td>
                    </tr>
                    <tr>
                        <td>3/10/2021</td>
                        <td class="titles">Lorem ipsum dolor sit amet</td>
                        <td>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt </td>
                    </tr>
                    <tr>
                        <td>2/10/2021</td>
                        <td class="titles">Lorem ipsum dolor sit amet</td>
                        <td>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Announcement
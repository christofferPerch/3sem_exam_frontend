import React from 'react';
import "../styles/UserOverview.css";
function UserOverview({userFacade}) {

    return (
        <div>
            <h1>User overview</h1>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Zip</th>
                    <th>City</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                </tr>
            </table>
        </div>
    );
}

export default UserOverview;
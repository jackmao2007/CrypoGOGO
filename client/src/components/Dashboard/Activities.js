import React, { Component } from 'react';
import { Redirect } from "react-router";

class Activities extends Component {
    state = { 
        activities: [
            {activityType: "community", content: "Elliot commented on your post", time: "25 min ago", link: "community"},
            {activityType: "trading", content: "Your order of 0.02 BTC has been executed", time: "30 min ago", link: "community"},
            {activityType: "community", content: "Nancy likes your post", time: "35 min ago", link: "community"}
        ]
    }

    getActivities() {
        // servercall
        // populate state
    }

    componentDidMount() {
        this.getActivities();
    }

    routeToActivity = (path) => {
        
        return <Redirect to={path} />
    } 

    renderActivity = (activity) => {
        return <div className={"activity-type-" + activity.activityType}>
                    <a href={activity.link}>                   
                    <p className="activity-content"> {activity.content} </p>
                    <p className="activity-time"> {activity.time} </p>
                    </a>
 
                </div>
    }

    render() { 
        return (
            <div className="summary-activities">
                <h3 className="activities-title"> Activities </h3>
                <div className="activities-container"> 
                    {this.state.activities.map(this.renderActivity)}
                </div>
            </div>
          );
    }
}
 
export default Activities;
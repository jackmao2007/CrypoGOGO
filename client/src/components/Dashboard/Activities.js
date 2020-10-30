import React, { Component } from 'react';

class Activities extends Component {
    state = { 
        activities: [
            {activityType: "community", content: "Elliot commented on your post", time: "25 min ago"},
            {activityType: "trading", content: "Your order of 0.02 BTC has been executed", time: "30 min ago"},
            {activityType: "community", content: "Nancy like your post", time: "35 min ago"}
        ]
    }

    getActivities() {
        // servercall
        // populate state
    }

    componentDidMount() {
        this.getActivities();
    }

    renderActivity = (activity) => {
        return <div className={"activity-type-" + activity.activityType}>
                    <p className="activity-content"> {activity.content} </p>
                    <span className="activity-time"> {activity.time} </span>
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
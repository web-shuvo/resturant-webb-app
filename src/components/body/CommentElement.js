import React from "react";

class CommentElement extends React.Component {



    render() {
        return (
            <div className="card text-dark bg-light " >
                <div className="card-body ">
                    <h4 className="card-title">{this.props.name}</h4>
                    <h6 className="card-title">Rating: {this.props.rate}</h6>
                    <p className="card-text">Comments: {this.props.comment}</p>
                    <p className="card-text">Date: {this.props.date}</p>


                </div>
            </div>
        )
    }
}

export default CommentElement;
import React from 'react';
import { connect } from 'react-redux';
// import { baseURI } from '../../Redux/Store';
import Loader from './../Loader';
import CommentElement from './CommentElement';
import { Form, FormGroup, Col, Input, Button } from 'reactstrap';



let mapStateToPrpos = (reduxState) => {
    return { reduxState }
}

let mapDispatchToProps = (dispatch) => {
    return {
        commDispatch: (val) => {
            dispatch({
                type: 'MENU_COMMENT',
                value: val

            })
        },
        commFormData: (val) => {
            dispatch({
                type: 'COMM_FORM_DATA',
                name: val.target.name,
                value: val.target.value
            })
        },
        commFormSubmit: (val) => {
            dispatch({
                type: 'ADD_COMMENTS',
                newVal: val
            })
        }
    }
}


class MenuDetails extends React.Component {

    componentDidMount = () => {
        fetch('https://resturant-website-app-default-rtdb.firebaseio.com/comments.json', { method: 'get' })
            .then((res) => res.json())
            .then((val) => {
                setTimeout(() => { this.props.commDispatch(val) }, 2000)
            })
    }

    CommForm = (data) => {
        this.props.commFormData(data);
    }

    submitComment = (eve) => {
        eve.preventDefault();
        let author = this.props.reduxState.MenuReducer.Name;
        let rate = this.props.reduxState.MenuReducer.select;
        let mess = this.props.reduxState.MenuReducer.Message;
        // let id = this.props.reduxState.MenuReducer.data.length;
        let dishId = this.props.details.id;
        let bodyData = {
            dishId: dishId,
            author: author,
            rating: rate,
            comment: mess,
            date: new Date().toDateString()
        };


        fetch('https://resturant-website-app-default-rtdb.firebaseio.com/comments.json', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bodyData)
            // body: JSON.stringify(this.props.reduxState.MenuReducer.addComment)
        })
            .then(res => res.json())
            .then(val => { this.props.commFormSubmit(bodyData); })

    }

    render() {

        let commentForm = this.props.reduxState.MenuReducer;
        let comments = this.props.reduxState.MenuReducer.data;
        let comment;
        if (comments === null) {
            comment = <Loader />
        } else {
            let commfilter = comments.filter((ele) => {
                return ele.dishId === this.props.details.id
            })

            comment = commfilter.map((val) => {
                return <CommentElement name={val.author} comment={val.comment} rate={val.rating} date={val.date} key={val.id} />
            })

        }


        return (
            <div className="card mt-5 col-10 px-0 m-auto" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={this.props.details.image} className="img-fluid rounded-start" alt={this.props.details.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.details.name}</h5>
                            <p className="card-text">{this.props.details.description}</p>
                            <p className="card-text"><small className="text-muted">Price: {this.props.details.price}/=</small></p>

                        </div>
                    </div>
                </div>
                <div className="card text-dark bg-light " >
                    <div className="card-header">Comments</div>
                    {comment}
                    <Form className='p-3' onSubmit={(eve) => { this.submitComment(eve) }}>
                        <FormGroup row>
                            <Col sm={8}>
                                <Input
                                    id="fName"
                                    name="Name"
                                    placeholder="Type youe name"
                                    type="text"
                                    value={commentForm.Name}
                                    onChange={(ele) => { this.CommForm(ele) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={8}>
                                <Input
                                    id="Select"
                                    name="select"
                                    type="select"
                                    value={commentForm.select}
                                    onChange={(ele) => { this.CommForm(ele) }}
                                >
                                    <option>
                                        1
                                    </option>
                                    <option>
                                        2
                                    </option>
                                    <option>
                                        3
                                    </option>
                                    <option>
                                        4
                                    </option>
                                    <option>
                                        5
                                    </option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>

                            <Col sm={8}>
                                <Input
                                    id="Message"
                                    name="Message"
                                    type="textarea"
                                    rows="10"
                                    value={commentForm.Message}
                                    onChange={(ele) => { this.CommForm(ele) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={{ size: 6 }}>
                                <Button>
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )

    };


}



export default connect(mapStateToPrpos, mapDispatchToProps)(MenuDetails);
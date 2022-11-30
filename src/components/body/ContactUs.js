import React from "react";
import { Form, Label, Col, Input, FormGroup, Button, Alert } from 'reactstrap';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            Num: '',
            Email: '',
            checkbox: false,
            select: 'Phone',
            Message: '',
            openAlert: false,
            alertMess: '',
            alertColor: ''
        }
    }

    inputHandler = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [name]: value,
        })
    }

    submitHandle = (eve) => {
        eve.preventDefault();
        fetch('https://resturant-website-app-default-rtdb.firebaseio.com/feedback.json', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.fName,
                lastName: this.state.lName,
                telNum: this.state.Num,
                email: this.state.Email,
                agree: this.state.checkbox,
                contactType: this.state.select,
                message: this.state.Message,
            })
        })
            .then((res) => {

                if (res.status === 201) {
                    this.setState({
                        openAlert: true,
                        alertColor: 'success',
                        alertMess: 'successfully submited'
                    })
                }
                setTimeout(() => {
                    this.setState({
                        openAlert: false
                    })
                }, 2000)

            })
            .catch(err => {
                this.setState({
                    openAlert: true,
                    alertColor: 'danger',
                    alertMess: err.message
                })
                setTimeout(() => {
                    this.setState({
                        openAlert: false
                    })
                }, 2000)
            })



        this.setState({
            fName: '',
            lName: '',
            Num: '',
            Email: '',
            checkbox: false,
            select: 'Phone',
            Message: '',
        })
    }


    render() {
        document.title = 'Contact us - React Resturant Theme';
        return (

            <div className="row mt-5">
                <div className="col-6 mx-auto">
                    <header className="text-center fs-4 mb-4">Contact with us</header>
                    <Form onSubmit={(eve) => { this.submitHandle(eve) }}>
                        <FormGroup row>
                            <Label for="fName" sm={2}>
                                First Name
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="fName"
                                    name="fName"
                                    placeholder="Type youe name"
                                    type="text"
                                    value={this.state.fName}
                                    onChange={(event) => { this.inputHandler(event) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lName" sm={2} >
                                Last Name
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="lName"
                                    name="lName"
                                    placeholder="Type your last name"
                                    type="text"
                                    value={this.state.lName}
                                    onChange={(event) => { this.inputHandler(event) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Num" sm={2} >
                                Number
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="Num"
                                    name="Num"
                                    placeholder="Type your Number"
                                    type="tel"
                                    value={this.state.Num}
                                    onChange={(event) => { this.inputHandler(event) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Email" sm={2} >
                                Email
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="Email"
                                    name="Email"
                                    placeholder="Type your Email"
                                    type="email"
                                    value={this.state.Email}
                                    onChange={(event) => { this.inputHandler(event) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{ size: 5, offset: 2 }}>
                                <FormGroup check>
                                    <Input
                                        name="checkbox"
                                        type="checkbox"
                                        checked={this.state.checkbox}
                                        onChange={(event) => { this.inputHandler(event) }}
                                    />
                                    <Label>
                                        Check for newslatter
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col sm={5}>
                                <Input
                                    id="Select"
                                    name="select"
                                    type="select"
                                    value={this.state.select}
                                    onChange={(event) => { this.inputHandler(event) }}
                                >
                                    <option>
                                        Phone
                                    </option>
                                    <option>
                                        Email
                                    </option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Message" sm={2}>
                                Your Message
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="Message"
                                    name="Message"
                                    type="textarea"
                                    rows="10"
                                    value={this.state.Message}
                                    onChange={(event) => { this.inputHandler(event) }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col
                                sm={{
                                    offset: 2,
                                    size: 6
                                }}
                            >
                                <Button>
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <div>
                        <Alert isOpen={this.state.openAlert} color={this.state.alertColor}>
                            {this.state.alertMess}
                        </Alert>
                    </div>
                </div>
            </div>

        )
    }
}

export default Contact;
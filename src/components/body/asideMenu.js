import { Component } from 'react';
// import DISHES from '../../data/dishes';
import MenuDetails from './menuDetails';
import { NavLink, Routes, Route, Navigate, } from 'react-router-dom';
import Loader from './../Loader';
// import { baseURI } from '../../Redux/Store';



class AsideMenu extends Component {
    constructor() {
        super();
        this.state = {
            DISHES: null,
            Details: null,
            test: '',
            loadErr: ''
        };
    };

    detailspan = (elem) => {
        this.setState({
            Details: elem
        })
    };

    test = (eve) => {
        console.log(eve.target.innerText);
    }

    componentDidMount = () => {
        fetch('https://resturant-website-app-default-rtdb.firebaseio.com/dishes.json')
            .then((res) => res.json())
            .then((val) => { this.setState({ DISHES: val }) })
            .catch(err => {
                this.setState({
                    loadErr: err.message,
                })
            })

    }



    render() {
        document.title = 'React Resturant Theme';
        let Items = this.state.DISHES;
        let ping;
        if (Items == null) {
            ping = <Loader loadErr={this.state.loadErr} />

        } else {
            ping = Items.map((elem, ind) => {
                return (
                    <div className='col-lg-3 mt-5' key={elem.id}>
                        <NavLink to={'details/' + ind} style={{ color: 'black' }}>
                            <Item name={elem.name} price={elem.price} images={elem.image} onDetails={this.detailspan.bind(this, elem)} tesing={this.test} />
                        </NavLink>
                    </div>

                )
            });
        }


        let det;
        if (this.state.Details != null) {

            det = <MenuDetails details={this.state.Details} />

        } else {
            det = <Navigate to='/' />
        }

        return (
            <div className='row'>
                <Routes>
                    <Route path='/' element={ping} />
                    <Route path='details/*' element={det} />
                </Routes>

            </div>
        )
    };

};



let Item = (props) => {

    return (

        <div className="card " style={{ cursor: 'pointer' }} onClick={props.onDetails} >
            <img src={props.images} className="card-img-top img-fluid" style={{ height: '200px' }} alt={props.name} />
            <div className="card-body text-center">
                <h3 className="card-title">{props.name}</h3>
                <p onClick={(eve) => { props.tesing(eve) }}>this is for testing purposes</p>

            </div>
        </div>

    )
};


export default AsideMenu;
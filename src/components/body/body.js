import { Route, Routes } from 'react-router-dom';
import AsideMenu from './asideMenu'
import About from './AboutUs';
import Contact from './ContactUs';


const Body = () => {
    return (
        <section className='container m-body'>

            <Routes>
                <Route path='/*' element={<AsideMenu />} />
                <Route path='/about-us' element={<About />} />
                <Route path='/contact-us' element={<Contact />} />
            </Routes>
        </section>
    )
}

export default Body;
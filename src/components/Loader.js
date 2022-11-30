import { Alert } from 'reactstrap';

let Loader = (props) => {
    let content;
    if (props.loadErr !== '') {
        content = props.loadErr;
    } else {
        content = <h2>Loading.....</h2>
    }

    return (
        <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Alert isOpen >
                {content}
            </Alert>
        </div>
    )
}

export default Loader;
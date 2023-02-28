import {Navbar} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import "./Navbars.scss"



function Navbars() {
    return(
        <section>
            <Navbar id="navbar" variant="dark" style={{backgroundColor:"black",position:"fixed",top:"0",width:"100%"}}>
                <Container className="d-flex align-items-center justify-content-start" style={{marginLeft:"0",width:"100%",paddingLeft:"200px"}}>
                <Navbar.Brand className='disable-text-selection'>
                    <img
                    alt=""
                    src="https://icon-library.com/images/sigma-icon/sigma-icon-10.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    <span>
                        SIGMA Converter
                    </span>
                </Navbar.Brand>
                </Container>
            </Navbar>
        </section>
    );
}

export default Navbars
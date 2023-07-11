import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
export default function Canva(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(props.submission,"propsSubmission")
    return (
      <>
   <Button variant="primary" onClick={handleShow}>
          Submissions
    </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Submissions</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {props.submission ? 
            props.submission.map((option,index)=>{
                return <div key={index}>
                    <Link to='/' state={{var:option}} onClick={()=>setShow(false)}>
                    <button style={{width:"100%",marginBottom:"0.5rem"}} >
                    {option.result[0].status.description}
                    </button>
                    </Link>
                </div>
            })
            :""
        }
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
}

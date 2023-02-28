import "./SigmaInput.scss";
import { v4 as uuidv4 } from 'uuid';
import {Button} from "react-bootstrap"
import { useState } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Tab} from 'react-bootstrap';
import {Tabs} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {SiConvertio} from "react-icons/si";
import {AiFillCopy} from "react-icons/ai";
import {TfiImport} from "react-icons/tfi"
import {useRef} from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

function Event2SigmaTab() {
    const [evtInput, setEvtInput] = useState({
        title:'',
        author:'', 
        level:'',
        desc:'',
        format:'',
        evtData:'' 
    });
    const handleEvtInputChange=(event)=>{
        setEvtInput({...evtInput, [event.target.name]: event.target.value})
    }
    const refEvtInput = useRef(null)
    const refSigmaOutput = useRef(null)
    const [Evt2SigmaOutput,setEvt2SigmaOutput] = useState("")
    const [curFormatText, setShowText] = useState(`Event log format...`);
    const handleSelect=(eventKey,eventObj)=>{
        setShowText(eventKey)
        setEvtInput({...evtInput, format: eventKey})
    }
    const convertEvtClick=()=>{
        let ConvertData={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                content:evtInput
            })
        }
        console.log(ConvertData)
        let uuid = uuidv4()
        fetch("http://localhost:5000/api/EvtToSigma/"+uuid,ConvertData)
            //.then(console.log(data))
            .then(response => response.json())
            .then(data=>{
                console.log(data.output)
                setEvt2SigmaOutput(data.output)
                document.getElementById('sigmaOutput').removeAttribute("disabled");
                // document.getElementById('sigmaOutput').focus();
            })
            // .then(({data,response})=>{
            // console.log(data)
            //console.log(response)
            // })
            .catch(error=>console.log(error))
    }
    const fileInputRef = useRef(null)
    const handleFileClick = () =>{
        fileInputRef.current.click()
    }
    const handleFileChange = (event) =>{
        const file_obj = event.target.files && event.target.files[0]
        if (!file_obj){
            return
        }
        // console.log(file_read)
        // console.log('fileObj is', file_obj);
        // console.log(event.target.files);
        // console.log(file_obj);
        event.target.value = null;
        let reader = new FileReader();
        reader.onload = function(event) {
            const readText = event.target.result
            refEvtInput.current.value=readText
            setEvtInput({...evtInput, evtData: readText})
        };
        reader.readAsText(file_obj)
        event.target.value = null
    }
    return(
        <section style={{padding:"10px"}}>
            <Container>
                <Row>
                    <Col >
                    <div style={{textAlign:"left",paddingBottom:"10px"}}>
                        <Button style={{marginBottom:"5px"}} className="noHover" variant="secondary" disable tabIndex="-1">Title</Button>
                        <input name="title" onChange={handleEvtInputChange} style={{display:"block",minWidth:"400px"}} type="text"></input>
                    </div>
                    <div style={{textAlign:"left",paddingBottom:"10px",float:"left",marginRight:"20px"}}>
                        <Button style={{marginBottom:"5px"}} className="noHover" variant="secondary" disable tabIndex="-1">Author</Button>
                        <input name="author" onChange={handleEvtInputChange} style={{display:"block",minWidth:"250px"}} type="text"></input>
                    </div>
                    <div style={{textAlign:"left",paddingBottom:"10px",float:"left"}}>
                        <Button style={{marginBottom:"5px"}} className="noHover" variant="secondary" disable tabIndex="-1">Level</Button>
                        <input name="level" onChange={handleEvtInputChange} style={{display:"block"}} type="text"></input>
                    </div>
                    <div style={{textAlign:"left",paddingBottom:"10px"}}>
                        <Button style={{marginBottom:"5px"}} className="noHover" variant="secondary" disable tabIndex="-1">Description</Button>
                        <textarea name="desc" onChange={handleEvtInputChange} style={{resize:"none",display:"block"}} rows="3" cols="70" wrap="physical">
                        </textarea>
                    </div>
                    <div style={{textAlign:"left",paddingBottom:"5px"}}>
                        <DropdownButton as={ButtonGroup} name="format" onSelect={handleSelect} variant="secondary" id="dropdown-basic-button" title={curFormatText}> 
                            <Dropdown.Item eventKey="XML">XML</Dropdown.Item>
                            {/* <Dropdown.Item eventKey="YAML">YAML</Dropdown.Item> */}
                            {/* <Dropdown.Item eventKey="JSON">JSON</Dropdown.Item> */}
                        </DropdownButton>
                        
                        {/* <span style={{marginLeft:"10px"}} >
                            {curFormatText}
                        </span> */}
                    </div>
                    <div style={{textAlign:"left"}}>
                        <textarea ref={refEvtInput} name="evtData" onChange={handleEvtInputChange} style={{resize:"none"}} rows="10" cols="70" wrap="physical"
                        placeholder="Select event log format and paste event log here...">
                        </textarea>
                        {/* <Form.Control style={{height:"300px"}} type="text" placeholder="Select event log format and paste event log here.." /> */}
                    </div>
                    <div style={{textAlign:"right",paddingBottom:"10px",paddingTop:"10px"}} className="d-flex justify-content-start">\
                    <input style={{display: 'none'}} ref={fileInputRef} type="file" onChange={handleFileChange}/>
                        <Button onClick={handleFileClick} variant="outline-light" className="d-flex align-items-center justify-content-center">
                            <TfiImport className="d-flex align-items-center"/>
                            &nbsp;Import file
                        </Button>
                    </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center" >
                        <div className="d-flex align-items-center">
                            <Button variant="primary" className="d-flex align-items-center justify-content-center" onClick={convertEvtClick}> 
                                <SiConvertio className="d-flex align-items-center"/>
                                &nbsp;Convert
                            </Button>
                        </div>
                    </Col>
                    <Col>
                    <div style={{textAlign:"left",paddingBottom:"5px"}}>
                        <Button className="noHover" variant="secondary" disable tabIndex="-1">Sigma</Button>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <textarea id="sigmaOutput" name="sigmaOutput" disabled style={{resize:"none"}} rows="23" cols="70" wrap="physical"
                        placeholder="Click Convert to get Sigma rule" value={Evt2SigmaOutput}>
                        </textarea>
                    </div>
                    <div onClick={() =>  navigator.clipboard.writeText(Evt2SigmaOutput)} style={{textAlign:"right",paddingBottom:"10px",paddingTop:"10px"}} className="d-flex justify-content-end">
                        <Button variant="success" className="d-flex align-items-center justify-content-center">
                            <AiFillCopy className="d-flex align-items-center"/>
                            &nbsp;Copy text
                        </Button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

function SigmaConverterTab() {
    const [sigmaInput,setSigmaInput] = useState({
        format:"",
        sigmaData:""
    })
    const handleSigmaInputChange =(event)=>{
        setSigmaInput({...sigmaInput,sigmaData:event.target.value})
    }
    const[curFormatText, setShowText] = useState(`Select SIEM...`);
    const handleSelect=(eventKey,eventObj)=>{
        setSigmaInput({...sigmaInput, format: eventKey})
        setShowText(eventKey)
    }
    const [convertOutput,setConvertOutput] = useState("")
    const convertSigmaClick=()=>{
        let ConvertData={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                content:sigmaInput
            })
        }
        let uuid = uuidv4()
        console.log(sigmaInput)
        // fetch("http://localhost:5000/api/sigmaConverter/"+uuid,ConvertData)
        //     //.then(console.log(data))
        //     .then(response => response.json())
        //     .then(data=>{
        //         console.log(data.output)
        //         setConvertOutput(data.output)
        //         document.getElementById('sigmaConvertOutput').removeAttribute("disabled");
        //     })
        //     .catch(error=>console.log(error))
    }
    const refSigmaConverter = useRef(null)
    const fileInputRef = useRef(null)
    const handleFileClick = () =>{
        fileInputRef.current.click()
    }
    const handleFileChange = (event) =>{
        const file_obj = event.target.files && event.target.files[0]
        if (!file_obj){
            return
        }
        // console.log(file_read)
        // console.log('fileObj is', file_obj);
        // console.log(event.target.files);
        // console.log(file_obj);
        event.target.value = null;
        let reader = new FileReader();
        reader.onload = function(event) {
            const readText = event.target.result
            refSigmaConverter.current.value=readText
            setSigmaInput({...sigmaInput, sigmaData: readText})
        };
        reader.readAsText(file_obj)
        event.target.value = null
    }
    return(
        <section style={{padding:"10px"}}>
            <Container >
                <Row>
                    <Col>
                    <div style={{textAlign:"left",paddingBottom:"5px"}}>
                        <Button className="noHover" tabIndex="-1" variant="secondary" disable>Sigma</Button>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <textarea ref={refSigmaConverter} onChange={handleSigmaInputChange} style={{resize:"none"}} rows="10" cols="70" wrap="physical" name="comments"
                        placeholder="Paste Sigma rule here...">
                        </textarea>
                    </div>
                    <div style={{textAlign:"right",paddingBottom:"10px",paddingTop:"10px"}} className="d-flex justify-content-start">\
                    <input style={{display: 'none'}} ref={fileInputRef} type="file" onChange={handleFileChange}/>
                        <Button onClick={handleFileClick} variant="outline-light" className="d-flex align-items-center justify-content-center">
                            <TfiImport className="d-flex align-items-center"/>
                            &nbsp;Import file
                        </Button>
                    </div>
                    </Col>
                    <Col sm xs={true}  className="d-flex align-items-center justify-content-center">
                        <div className="d-flex align-items-center">
                            <Button onClick={convertSigmaClick} variant="primary" className="d-flex align-items-center justify-content-center"> 
                                <SiConvertio className="d-flex align-items-center"/>
                                &nbsp;Convert
                            </Button>
                        </div>
                    </Col>
                    <Col>
                    <div style={{textAlign:"left",paddingBottom:"5px"}}>
                        <DropdownButton as={ButtonGroup} onSelect={handleSelect} variant="secondary" id="dropdown-basic-button" title={curFormatText}>
                            <Dropdown.Item eventKey="IBM Qradar">IBM Qradar</Dropdown.Item>
                            <Dropdown.Item eventKey="Splunk">Splunk</Dropdown.Item>
                            <Dropdown.Item eventKey="Elastic">Elastic</Dropdown.Item>
                            <Dropdown.Item eventKey="LogRhythm">LogRhythm</Dropdown.Item>
                            <Dropdown.Item eventKey="Sumo Logic">Sumo Logic</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <textarea id="sigmaConvertOutput" disabled={true} onChange={e => setCount(e.target.value.length,console.log(e.target.value.length))} 
                        placeholder="Select SIEM platform to translate"
                        style={{resize:"none"}} rows="10" cols="70" wrap="physical" name="comments" value={convertOutput}></textarea>
                    </div>
                    <div style={{textAlign:"right",paddingBottom:"10px",paddingTop:"10px"}} className="d-flex justify-content-end">
                        <Button onClick={() =>  navigator.clipboard.writeText(convertOutput)} variant="success" className=" shadow-5-strong d-flex align-items-center justify-content-center ">
                            <AiFillCopy className="d-flex align-items-center"/>
                            &nbsp;Copy text
                        </Button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

function SigmaInput() {
    return(
        <section>
            <div>
                <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="tool-tabs"
                    className="mb-3 disable-text-selection"
                    style={{width:"100%"}}
                    fill
                    justify
                >
                    <Tab tabClassName="red-col " eventKey="home" title="Event to Sigma">
                        <Event2SigmaTab />
                    </Tab>
                    <Tab eventKey="profile" title="Sigma Converter">
                        <SigmaConverterTab/>
                    </Tab>
                </Tabs>
            </div>
            {/* <Tab.Content>
            <Tab.Pane eventKey="first">
              <Sonnet />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Sonnet />
            </Tab.Pane>
          </Tab.Content> */}
          
        </section>
    );
}

export default SigmaInput
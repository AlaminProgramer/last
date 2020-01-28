import React ,{Component } from 'react'


import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";
  


class PageNotFound extends Component{
    render(){


    return (
      <>
        <div className="content">
          <Row >
            <Col  lg={{ size: 6, order: 2, offset: 3 }} md="12">
                <h1 className="text-dange text-center">Page not founded</h1>
            </Col>
          </Row>
        </div>
      </>
    );
    }
}

export default PageNotFound;
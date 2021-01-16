import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import companyLogo from './../assets/images/logoText.svg';
import illustration from './../assets/images/illustration.png';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Index() {

  return <div className="main-page">
    <Container fluid="md" className="main-page-container">
      <Row className="justify-content-between align-items-center pt-md-5 pt-4 mb-md-5">
        <Col >
          <Image
            alt="logo"
            src={companyLogo}
            width={350}
            height={100}
          />
        </Col>
        <Col className="justify-content-end d-flex">
          <Link href="/login" ><a className="main-btn">Log In</a></Link>
          <Link href="/signup"><a className="ml-3 main-btn">Sign Up</a></Link>
        </Col>
      </Row>
      <Row xs={1} md={2} className="justify-content-between align-items-center pt-5">
        <Col> <Image
          alt="logo"
          src={illustration}
          width={714}
          height={686}
          layout="responsive"
        /></Col>
        <Col>
          <h1>Bitkinizin ihtiyacı olan tek şey artık sevgi!</h1>
          <p><strong>FarmBot</strong> masanızda, balkonunuzda veya pencerenizdeki bitkiler için yapılmış açık kaynak sistemdir.</p>
          <p><strong>FarmBot</strong> ile birlikte bitkinize ihtiyacı olan suyu, size ise bitkinizin bulunduğu ortam hakkında bilgileri veriyoruz.</p>
          <p>
            Yapmanız gerekenler çok basit <strong>FarmBotu</strong> Wi-Fi ve saksınıza bağlayın, hemen kullanmaya başlayın.
          </p>
        </Col>
      </Row>
    </Container>
  </div>;
}

export default Index;
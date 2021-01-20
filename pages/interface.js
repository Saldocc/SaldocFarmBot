import React, { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import companyLogo from './../assets/images/logoText.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import Container from 'react-bootstrap/Container'
import Iframe from 'react-iframe'

const Index = ({ datas }) => {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const router = useRouter()
  async function handleLogout() {
    setError("")
    try {
      router.push("/")
      await logout()
    } catch {
      setError("Failed to log out")
    }
  }

  const [data, setData] = useState(datas);

  const fetchURL =
    "https://api.thingspeak.com/channels/1270376/feeds.json";

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    setInterval(() => {
      getData().then((data) => setData(data));
    }, 100000);
  }, []);


  let lastEntry = data.channel.last_entry_id;
  let fields = data.feeds.filter(
    (filterData) => filterData.entry_id === lastEntry
  );
  let field1 = fields.map((field) => field.field1);
  let field2 = fields.map((field) => field.field2);
  let field3 = fields.map((field) => field.field3);
  let field4 = fields.map((field) => field.field4);
  let field5 = fields.map((field) => field.field5);
  console.log(field1, field2, field3, field4, field5);

  return (
    <div>
      {/* <h1>getServerSideProps</h1>
      <p>{field1}</p>
      <p>{field2}</p>
      <button onClick={() => postData()} className="btn btn-primary">
        Send
      </button> */}
      <Container fluid>
        <div className="dashboard">
          <Navbar>
            <Navbar.Brand href="/dashboard">
              <Image
                alt="logo"
                src={companyLogo}
                width={225}
                height={70}
              />
            </Navbar.Brand>
            <div className="navbar-left">
              <span> <strong>Hoşgeldiniz</strong> {currentUser.email}</span>
              <div className="navbar-buttons">
                <Link href="/updateProfile">
                  <button className="main-btn mr-md-3 ml-md--4">Update Profile</button>
                </Link>
                <button className="main-btn" onClick={handleLogout}>Log out</button>
              </div>
            </div>
          </Navbar >

          <div className="card-grid">
            <div className="card-grid-wrapper">
              <div className="card-grid-wrapper-chart">
                <Card className="chart-card">
                  <Card.Body className="center flex-column">
                    <Iframe url="https://thingspeak.com/channels/1270376/charts/1?bgcolor=%23ffffff&color=%2300003a&dynamic=true&results=10&timescale=10&title=Ortam+S%C4%B1cakl%C4%B1%C4%9F%C4%B1&type=spline&xaxis=S%C4%B1cakl%C4%B1k&yaxis=Zaman&width=auto&height=auto"
                      width="100%"
                      height="100%"
                      display="block"
                      position="relative"
                      loading="lazy" />
                  </Card.Body>
                </Card>
              </div>
              <div className="card-grid-wrapper-chart">
                <Card className="chart-card">
                  <Card.Body className="center flex-column">
                    <Iframe url="https://thingspeak.com/channels/1270376/charts/2?bgcolor=%23ffffff&color=%2300003a&dynamic=true&results=10&title=Ortam+Nemi&type=spline&xaxis=Nem&yaxis=Zaman&width=auto&height=auto"
                      width="100%"
                      height="100%"
                      display="block"
                      position="relative"
                      loading="lazy" />
                  </Card.Body>
                </Card>
              </div>
              <div className="card-grid-wrapper-chart">
                <Card className="chart-card">
                  <Card.Body className="center flex-column">
                    <Iframe url="https://thingspeak.com/channels/1270376/charts/3?bgcolor=%23ffffff&color=%2300003a&dynamic=true&results=10&title=Ortam+I%C5%9F%C4%B1k+Seviyesi&type=spline&xaxis=I%C5%9F%C4%B1k+Seviyesi&yaxis=Zaman&width=auto&height=auto"
                      width="100%"
                      height="100%"
                      display="block"
                      position="relative"
                      loading="lazy" />
                  </Card.Body>
                </Card>
              </div>
              <div className="card-grid-wrapper-chart">
                <Card className="chart-card">
                  <Card.Body className="center flex-column">
                    <Iframe url="https://thingspeak.com/channels/1270376/charts/4?bgcolor=%23ffffff&color=%2300003a&dynamic=true&results=10&title=Toprak+Nemi&type=spline&xaxis=Nem&yaxis=Zaman&width=auto&height=auto"
                      width="100%"
                      height="100%"
                      display="block"
                      position="relative"
                      loading="lazy" />
                  </Card.Body>
                </Card>
              </div>
              <div className="card-grid-wrapper-chart">
                <Card className="chart-card">
                  <Card.Body className="d-flex justify-content-center flex-column">
                    <h4>Güncel sistem verileri:</h4>
                    <div>
                      <span>Ortam Sıcaklığı: </span>
                      <span>{field1}</span>
                    </div>
                    <div>
                      <span>Ortam Nemi: </span>
                      <span>{field2}</span>
                    </div>
                    <div>
                      <span>Ortam Işık Seviyesi: </span>
                      <span>{field3}</span>
                    </div>
                    <div>
                      <span>Toprak Nemi: </span>
                      <span>{field4}</span>
                    </div>
                    <div>
                      <span>Motor Durumu: </span>
                      <span>{field5 == 0 ? "OFF" : "ON"}</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.thingspeak.com/channels/1270376/feeds.json`
  );

  const datas = await res.json();

  if (!datas) {
    return {
      notFound: true,
    };
  }

  return {
    props: { datas },
  };
}

export default Index;

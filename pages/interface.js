import React, { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar'
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
    "https://api.thingspeak.com/channels/1275694/feeds.json?api_key=QOP3895W4W5Z4N5V&results=1";

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    setInterval(() => {
      getData().then((data) => setData(data));
    }, 10000);
  }, []);

  async function postData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field3: "1" }),
    };
    const response = await fetch(
      "https://api.thingspeak.com/update?api_key=SRQUL8N3WV1DW6VJ",
      requestOptions
    );
  }

  let lastEntry = data.channel.last_entry_id;
  let fields = data.feeds.filter(
    (filterData) => filterData.entry_id === lastEntry
  );
  let field1 = fields.map((field) => field.field1);
  let field2 = fields.map((field) => field.field2);
  console.log(field1, field2);

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
            <div>
              <span> <strong>User:</strong> {currentUser.email}</span>
              <Link href="/updateProfile">
                <button className="main-btn mr-3 ml-4">Update Profile</button>
              </Link>
              <button className="main-btn" onClick={handleLogout}>Log out</button>
            </div>
          </Navbar >
          <div>
            {/* <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/1270376/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=spline"></iframe> */}
            <Iframe url="https://thingspeak.com/channels/1270376/charts/1?bgcolor=%23ffffff&color=%2300003a&dynamic=true&results=60&timescale=10&title=Oda+S%C4%B1cakl%C4%B1%C4%9F%C4%B1&type=spline&xaxis=S%C4%B1cakl%C4%B1k&yaxis=Zaman"
              width="450px"
              height="260px"
              styles={{ border: "1px solid #cccccc" }}
              id="myId"
              className="myClassname"
              display="initial"
              position="relative" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.thingspeak.com/channels/1275694/feeds.json?api_key=QOP3895W4W5Z4N5V&results=2`
  );
  const datas = await res.json();

  if (!datas) {
    return {
      notFound: true,
    };
  }

  return {
    props: { datas }, // will be passed to the page component as props
  };
}

export default Index;

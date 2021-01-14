import React, { useRef, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useAuth } from '../contexts/AuthContext'
import { db } from "./../helpers/firebase"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from 'react-bootstrap/Navbar'
import companyLogo from './../assets/images/logo.svg';
import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const router = useRouter()
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setError("")
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const productName = useRef()
  const productCode = useRef()
  const productCodeEx = "M8VD-4MMA-IU8T-Y7XL"
  const [activityKeys, setActivityKeys] = useState([])

  useEffect(() => {
    controlDatabase()
    if (!currentUser) {
      router.push('/login')
    }
  }, [])

  function controlDatabase() {
    setActivityKeys([])
    db.collection('users').doc(currentUser.uid).collection('products').get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        let product = {
          name: doc.data().name,
          code: doc.data().code
        }
        setActivityKeys(activityKeys => [...activityKeys, product])
      });
    })
  }

  function addDatabase(name, product) {
    db.collection("users").doc(currentUser.uid).collection("products").add({
      name: name,
      code: product
    }).then(function () {
      console.log("Document successfully written!");
      controlDatabase()
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  async function handleLogout() {
    setError("")
    try {
      router.push("/")
      await logout()
    } catch {
      setError("Failed to log out")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (productName.current.value && productCode.current.value === productCodeEx) {
      addDatabase(productName.current.value, productCode.current.value)
      handleClose()
    }
    else {
      setError("Failed to add product")
    }
  }

  return (
    <>
      <Navbar>
        <Navbar.Brand href="/dashboard">
          <Image
            alt="logo"
            src={companyLogo}
            width={150}
            height={40}
          />
        </Navbar.Brand>
        <div>
          <span> <strong>User:</strong> {currentUser.email}</span>
          <Link href="/updateProfile">
            <Button variant="link" className="mr-3 ml-4">Update Profile</Button>
          </Link>
          <Button variant="link" onClick={handleLogout}>Log out</Button>
        </div>
      </Navbar >

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group id="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Product Name" ref={productName} required />
            </Form.Group>
            <Form.Group id="productCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control type="text" placeholder="Product Code" ref={productCode} required />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="ml-2" onClick={handleSubmit}>
            Add Product
          </Button>
          </div>
          </Modal.Body>
       
      </Modal>

      <div className="product-grid">
        <div className="product-grid-wrapper">

          {activityKeys.map((item) => (
            <Link href="/interface">
              <div className="product-grid-product-wrapper">
                <div className="product-grid-product">
                  <Card className="product-card">
                    <Card.Body className="center flex-column">
                      <span>{item.name}</span>
                      <span>{item.code}</span>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Link>

          ))}
          <div className="product-grid-product-wrapper" onClick={handleShow}>
            <div className="product-grid-product">
              <Card className="product-card">
                <Card.Body className="center">
                  <div className="add-product-text">
                    <svg className="mb-2" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7.875C18.2984 7.875 18.5845 7.99353 18.7955 8.20451C19.0065 8.41548 19.125 8.70163 19.125 9V18C19.125 18.2984 19.0065 18.5845 18.7955 18.7955C18.5845 19.0065 18.2984 19.125 18 19.125H9C8.70163 19.125 8.41548 19.0065 8.20451 18.7955C7.99353 18.5845 7.875 18.2984 7.875 18C7.875 17.7016 7.99353 17.4155 8.20451 17.2045C8.41548 16.9935 8.70163 16.875 9 16.875H16.875V9C16.875 8.70163 16.9935 8.41548 17.2045 8.20451C17.4155 7.99353 17.7016 7.875 18 7.875Z" fill="#D3D3D3" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.875 18C16.875 17.7016 16.9935 17.4155 17.2045 17.2045C17.4155 16.9935 17.7016 16.875 18 16.875H27C27.2984 16.875 27.5845 16.9935 27.7955 17.2045C28.0065 17.4155 28.125 17.7016 28.125 18C28.125 18.2984 28.0065 18.5845 27.7955 18.7955C27.5845 19.0065 27.2984 19.125 27 19.125H19.125V27C19.125 27.2984 19.0065 27.5845 18.7955 27.7955C18.5845 28.0065 18.2984 28.125 18 28.125C17.7016 28.125 17.4155 28.0065 17.2045 27.7955C16.9935 27.5845 16.875 27.2984 16.875 27V18Z" fill="#D3D3D3" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 33.75C22.1772 33.75 26.1832 32.0906 29.1369 29.1369C32.0906 26.1832 33.75 22.1772 33.75 18C33.75 13.8228 32.0906 9.81677 29.1369 6.86307C26.1832 3.90937 22.1772 2.25 18 2.25C13.8228 2.25 9.81677 3.90937 6.86307 6.86307C3.90937 9.81677 2.25 13.8228 2.25 18C2.25 22.1772 3.90937 26.1832 6.86307 29.1369C9.81677 32.0906 13.8228 33.75 18 33.75ZM18 36C22.7739 36 27.3523 34.1036 30.7279 30.7279C34.1036 27.3523 36 22.7739 36 18C36 13.2261 34.1036 8.64773 30.7279 5.27208C27.3523 1.89642 22.7739 0 18 0C13.2261 0 8.64773 1.89642 5.27208 5.27208C1.89642 8.64773 0 13.2261 0 18C0 22.7739 1.89642 27.3523 5.27208 30.7279C8.64773 34.1036 13.2261 36 18 36Z" fill="#D3D3D3" />
                    </svg>
                    <br />
                    Add Product
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Dashboard;
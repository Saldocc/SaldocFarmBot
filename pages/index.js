import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Link from 'next/link';
import Image from 'next/image'
import companyLogo from './../assets/images/logo.svg';
function Index() {

  return <div>
    <Card>
      <Card.Body className="center flex-column">
      <Image
            alt="logo"
            src={companyLogo}
            width={150}
            height={40}
          />
        <h2 className="text-center mb-4">Ana Sayfa</h2>
        <div>
          <Link href="/login" ><a className="mr-3">Log In</a></Link>
          <Link href="/signup"><a className="ml-3">Sign Up</a></Link>
        </div>
      </Card.Body>
    </Card>
  </div>;
}

export default Index;
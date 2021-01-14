import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Link from 'next/link';

function Index() {

  return <div>
    <Card>
      <Card.Body className="center flex-column">
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
import React, { useState, useEffect } from "react";

const Index = ({ datas }) => {
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
      <h1>getServerSideProps</h1>
      <p>{field1}</p>
      <p>{field2}</p>
      <button onClick={() => postData()} className="btn btn-primary">
        Send
      </button>
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

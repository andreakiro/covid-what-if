async function send(params) {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(params),
  };
  let result = await fetch("http://localhost:5000", request).json();
  return result;
}

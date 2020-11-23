export async function load(params, model = "hybrid") {
  let content = {
    "request": "load",
    "args": {
      "model-id": model,
      ...params
    }
  };

  console.log('Hey this is the request');
  console.log(content);

  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(content),
  };

  return await (await fetch("http://localhost:5000", request)).json();
}

export async function update(params) {
  if (! validInput(params)) {
    console.log("Given parameters have wrong format.");
    return null;
  }

  let content = {
    "request": "update",
    "args": params
  };

  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(content),
  };

  return await (await fetch("http://localhost:5000", request)).json();
}

export async function init() {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({"request": "init"}),
  };
  let response = await (await fetch("http://localhost:5000", request)).json();
  return response;
}

// Utilities : format checks

function validInput(params) {
  if (! ('country' in params)) return false;
  if (! ('tframe' in params)) return false;
  if (! ('from' in params.tframe)) return false;
  if (! ('until' in params.tframe)) return false;
  if (! ('policies' in params)) return false;
  return true;
}
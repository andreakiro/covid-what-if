async function send(params) {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(params),
  };
  let result = await fetch("http://localhost:5000", request).json();
  return result;
}

async function request(params, model = "hybrid") {
  if (! validInput(params)) {
    console.log("Given parameters have wrong format.");
    return null;
  }

  let content = {
    "model-id": model,
    "args": params
  };

  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(content),
  };

  let response = await fetch("http://localhost:5000", request).json();

  return response;
}

function countries() {
  return ["America", "Switzerland", "Italy", "France"];
}

// Utilities : format checks

function validInput(params) {
  if (! ('country' in params)) return false;
  if (! ('time-frame' in params)) return false;
  if (! ('time-frame.from' in params)) return false;
  if (! ('time-frame.until' in params)) return false;
  if (! ('policies' in params)) return false;
  // for (i = 1; i < 9; i ++)
  //   if (! (('policies.c' + i) in params)) return false;
  return true;
}

function validOutput(response) {
  if (! ('r0' in response)) return false;
  return true;
}
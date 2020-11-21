export async function send(params) {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(params),
  };
  let result = await fetch("http://localhost:5000", request).json();
  return result;
}

export async function load(params, model = "hybrid") {
  let content = {
    "request": "load",
    "args": {
      "model-id": model,
      ...params
    }
  };

  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(content),
  };

  let response = await fetch("http://localhost:5000", request).json();

  return response;
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

  let response = await fetch("http://localhost:5000", request).json();
  return response;
}

export function countries() {
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
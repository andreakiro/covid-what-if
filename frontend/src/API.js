const SERVER_ADDRESS = "http://localhost:5000";
const INIT_SOCKET = "/init";
const LOAD_SOCKET = "/load";
const UPDATE_SOCKET = "/update";

async function post(socket, content) {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(content),
  };

  return await (await fetch(SERVER_ADDRESS.concat(socket), request)).json();
}

export async function load(params, model = "hybrid") {
  let content = {
    "model-id": model,
    ...params,
  };

  return post(LOAD_SOCKET, content);
}

export async function update(params) {
  if (params.tframe.from === null || params.tframe.until === null)
    params.tframe = { from: null, until: null };
  return post(UPDATE_SOCKET, params);
}

export async function init() {
  return post(INIT_SOCKET);
}

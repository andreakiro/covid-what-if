export async function API(a, b) {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({ a, b }),
  };
  let result = await fetch("http://localhost:5000", request);
  let final = await result.json();
  return final.result;
}

export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

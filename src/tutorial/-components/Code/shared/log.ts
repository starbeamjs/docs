export function logOnClient(
  what: "in" | "out",
  name: string,
  details: unknown
) {
  return;
  if (what === "in") {
    console.log(
      `  %cclient%c<-server:${name}`,
      "background-color: #ffc",
      "background-color: reset",
      details
    );
  } else {
    console.log(
      `  %cclient%c->server:${name}`,
      "background-color: #ffc",
      "background-color: reset",
      details
    );
  }
}

export function logOnServer(
  what: "in" | "out",
  name: string,
  details: unknown
) {
  return;
  if (what === "in") {
    console.log(
      `%cserver%c<-client:${name}`,
      "background-color: #fcc",
      "background-color: reset",
      details
    );
  } else {
    console.log(
      `%cserver%c->client:${name}`,
      "background-color: #fcc",
      "background-color: reset",
      details
    );
  }
}

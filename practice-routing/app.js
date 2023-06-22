const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Practice</title><head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='create-user'><button type'submit'>Send</button></input></form><h1>Some random text</h1></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Practice</title><head>");
    res.write("<body><ul><li>User 1</li> <li>User 2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      res.setHeader("Location", "/");
      console.log(message);
      return res.end();
    });
  }
});

server.listen(3000);

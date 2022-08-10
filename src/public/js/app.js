const socekt = new WebSocket(`ws://${window.location.host}`);

socekt.addEventListener("open", () => {
    console.log("Connected to Server ✅")
});

socekt.addEventListener("message", (message) => {
    console.log("New message: ", message.data)
});

socekt.addEventListener("close", () => {
    console.log("Disconnected from Server ❌")
});

setTimeout(() => {
    socekt.send("Hello from the Browser!");
}, 10000);
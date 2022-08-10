const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
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



function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socekt.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
function helloWorld() {
    // TODO
    let message = "Hello World!";
    let button = document.getElementById("btn");
    button.addEventListener("click", function () {
        setTimeout(() => {
            document.getElementById("log-text").textContent = message;
        }, 2000);
        
    });
}

helloWorld();
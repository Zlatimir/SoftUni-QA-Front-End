function simplePromise() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
        }, 2000);
    }).then((data) => {
        console.log(data);
    });
}


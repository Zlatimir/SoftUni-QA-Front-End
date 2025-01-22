function promiseRejection() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Something went wrong!');
        }, 3000);
    })
        .catch((error) => {
            console.log(error);
        });
}


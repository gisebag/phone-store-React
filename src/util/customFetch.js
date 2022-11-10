
let validation = true;
const customFetch = ( data ) => {
        return new Promise((resolve, reject) => {
            if (validation) {
                setTimeout(() => {
                resolve(data);
                }, 2000);
            } else {
                reject('Hubo un error');
            }
        })
    }

export default customFetch;
import { AsgardeoAuthClient } from "@asgardeo/auth-js";

// Create a config object containing the necessary configurations.
const config = {
    signInRedirectURL: "http://localhost:3000/sign-in",
    signOutRedirectURL: "http://localhost:3000/dashboard",
    clientID: "client ID",
    baseUrl: "https://api.asgardeo.io/t/<org_name>"
};

// Create a Store class to store the authentication data. The following implementation uses the session storage.
class SessionStore {
    // Saves the data to the store.
    async setData(key, value) {
        sessionStorage.setItem(key, value);
    }

    // Gets the data from the store.
    async getData(key) {
        return sessionStorage.getItem(key);
    }

    // Removes the date from the store.
    async removeData(key) {
        sessionStorage.removeItem(key);
    }
}



// Instantiate the SessionStore class
const store = new SessionStore();

// Instantiate the AsgardeoAuthClient and pass the store object as an argument into the constructor.
const auth = new AsgardeoAuthClient(store);

// Initialize the instance with the config object.
auth.initialize(config);

// To get the authorization URL, simply call this method.
auth.getAuthorizationURL()
    .then((url) => {
        // Redirect the user to the authentication URL. If this is used in a browser,
        // you may want to do something like this:
        window.location.href = url;
    })
    .catch((error) => {
        console.error(error);
    });

// Once you obtain the authentication code and the session state from the server, you can use this method
// to get the access token.
auth.requestAccessToken("code", "session-state", "state")
    .then((response) => {
        // Obtain the token and other related from the response;
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
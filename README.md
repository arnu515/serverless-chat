# Serverless Chat app with svelte and firebase

This is a serverless chat app I designed for by blog/tutorial on how to go serverless (and if it is a good option)

Check the blog out [here](https://dev.to/arnu515/serverless-is-it-worth-it-build-a-serverless-chat-webapp-with-svelte-and-firebase-1ffc)!

## Quickstart

1. Clone the repo

```sh
git clone https://github.com/arnu515/serverless-chat.git
```

2. Create a project on [Firebase](https://console.firebase.google.com)

Create a project on firebase. Name it anything you want.

3. Create a web app on firebase.

Check the [docs](https://firebase.google.com/docs) to learn how

4. Copy your app's javascript config object to your clipboard.

A sample config looks like this:

```js
{
    apiKey: "your api key",
    authDomain: "projectname.firebaseapp.com",
    databaseURL: "https://projectname.firebaseio.com",
    projectId: "project name",
    storageBucket: "projectname.appspot.com",
    messagingSenderId: "xxxxxxx",
    appId: "xxxxxxxxxx",
};
```

5. Initialise Auth and Cloud firestore on firebase

Check the [docs](https://firebase.google.com/docs) to learn how

6. Create a file in `src/` called `firebase-config.ts` and put this in it:

```ts
export default {
    // your config
};
```

For example, if I use the example config provided up above,

```ts
export default {
    apiKey: "your api key",
    authDomain: "projectname.firebaseapp.com",
    databaseURL: "https://projectname.firebaseio.com",
    projectId: "project name",
    storageBucket: "projectname.appspot.com",
    messagingSenderId: "xxxxxxx",
    appId: "xxxxxxxxxx",
};
```

7. Finally, we can run the app.

Type

```sh
npm run dev
```

in your terminal. This will start your app on <http://localhost:5000>.

8. Play around, tweak some stuff

Customise the app to your liking

9. Deploy

You can deploy your app anywhere, on any host, but to keep it simple, and **to not require to change any Firebase Auth rules**, let's host the app on Firebase. Open a terminal and type:

```sh
firebase init hosting
```

and follow the interactive guide until you have configured Firebase Hosting. Choose `public` as your hosting directory. **Make sure you don't override `public/index.html`**

Then, type

```sh
npm run build
firebase deploy --only hosting
```

Your app should be live on projectname.web.app! You can view my version [here](https://serverless-svelte.web.app)

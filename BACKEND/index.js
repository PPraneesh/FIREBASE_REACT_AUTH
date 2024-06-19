const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const express = require("express");
const app = express();
const serviceAccount = require("./serviceAccountKey.json");
const cors = require("cors");
app.use(express.json());
app.use(cors());
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const users = db.collection("users");
const rooms = db.collection("rooms");

app.get("/", (req, res) => {
  res.send(
    "This is a server for a firebase starter, everything from auth to db storage is ready to go!"
  );
});
app.post("/user", async (req, res) => {
  const { name, email } = req.body;
  await users
    .doc(email)
    .set({
      name: name,
      email: email,
      hobbies: [],
    })
    .then(() => {
      res.send({ message: "User added" });
    })
    .catch((error) => {
      res.send(error);
    });
  users.doc(email).onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`);
      console.log (docSnapshot);
      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
    
});
app.post("/hobbies", async (req, res) => {
  const { email, hobby } = req.body;
  await users.doc(email).update({
      hobbies: FieldValue.arrayUnion(hobby),
    })
    .then(() => {
      res.send({ message: "Hobby added" });
    })
    .catch((error) => {
      res.send(error);
    });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

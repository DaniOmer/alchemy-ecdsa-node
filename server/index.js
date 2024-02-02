const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

/*
Private key f9148fef1bcd932dd0f0f257b094524579881599a78ce21b7bcd5f3d9eac4496
Public key 028810b41b3124e57f748851908f59b78529e946bd6383eb0d9fff265deec9caa9
****************************************************************
Private key 140eeb11592a7413e2629bfab649554edf9681fce655d42d7183b48de42053d3
Public key 0267036f71ee5af9c5a134b3db863485ccd605462bac58ecc4894e1085069458be
****************************************************************
Private key 4b614c497e84196bcf1d55774577cb23c68bb58c6f1ac93bb430bf55112d4a98
Public key 02b800b78724e3310dbeae3c546ea657942d8fe91fb69fe89778bcc3045e23fb36
*/

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

import { useState } from "react";
import { useRouter } from "next/router";
import {
  getUser,
  getUsers,
  updateUser,
  addTransaction,
} from "../utils/storage";
import Layout from "../components/Layout";

export default function Receive() {
  const [from, setFrom] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleReceive = () => {
    const user = getUser();
    const amt = parseFloat(amount);

    if (!from) return alert("Sender email is required");
    if (isNaN(amt) || amt <= 0) return alert("Invalid amount");

    const allUsers = getUsers();
    const senderUser = allUsers.find((u) => u.email === from);
    if (!senderUser) return alert("Sender not found");
    if (senderUser.balance < amt) return alert("Sender has insufficient funds");

    
    const updatedReceiver = { ...user, balance: user.balance + amt };
    updateUser(updatedReceiver);

    
    const updatedSender = { ...senderUser, balance: senderUser.balance - amt };
    updateUser(updatedSender);

    
    addTransaction({
      type: "Received",
      amount: amt,
      from,
      to: user.email,
      email: user.email,
    });

    
    addTransaction({
      type: "Sent",
      amount: amt,
      from,
      to: user.email,
      email: from,
    });

    router.push("/dashboard");
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Receive Money</h1>
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="From (email)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="button"
        className="bg-green-600 text-white px-4 py-2"
        onClick={handleReceive}
      >
        Receive
      </button>
    </Layout>
  );
}

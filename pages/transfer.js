import { useState } from "react";
import { useRouter } from "next/router";
import {
  getUser,
  getUsers,
  updateUser,
  addTransaction,
} from "../utils/storage";
import Layout from "../components/Layout";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const router = useRouter();
  const user = getUser();

  const handleTransfer = () => {
    const amt = parseFloat(amount);
    if (!amt || !recipient) return alert("All fields required");
    if (amt > user.balance) return alert("Insufficient funds");

    const allUsers = getUsers();
    const recipientUser = allUsers.find((u) => u.email === recipient);
    if (!recipientUser) return alert("Recipient not found");

    
    const updatedSender = { ...user, balance: user.balance - amt };
    updateUser(updatedSender);

    
    const updatedRecipient = {
      ...recipientUser,
      balance: recipientUser.balance + amt,
    };
    updateUser(updatedRecipient);

    
    addTransaction({
      type: "Sent",
      amount: amt,
      from: user.email,
      to: recipient,
      email: user.email,
    });

    
    addTransaction({
      type: "Received",
      amount: amt,
      from: user.email,
      to: recipient,
      email: recipient,
    });

    router.push("/dashboard");
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Send Money</h1>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Recipient Email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleTransfer}
      >
        Send
      </button>
    </Layout>
  );
}

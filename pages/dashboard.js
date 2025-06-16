import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getUser,
  getTransactions,
  clearTransactions, 
} from "../utils/storage";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [user, setUserState] = useState(null);
  const [txs, setTxs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const u = getUser();
    if (!u) router.push("/signup");
    else {
      setUserState(u);
      loadTransactions(u.email);
    }
  }, []);

  const loadTransactions = (email) => {
    const allTxs = getTransactions();
    const userTxs = allTxs.filter((t) => t.email === email);


   
    setTxs(userTxs);
  };

  const handleClear = () => {
    if (confirm("Clear all your transactions?")) {
      clearTransactions();
      setTxs([]);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Welcome, {user.email}</h1>
      <p className="mb-4">
        Balance: <span className="font-semibold">${user.balance}</span>
      </p>

      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Transactions</h2>
        <button
          onClick={handleClear}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Transactions
        </button>
      </div>

      <ul className="space-y-2">
        {txs.map((t, i) => (
          <li key={i} className="border p-2">
            {t.type === "Received" ? (
              <>
                Received ${t.amount} from {t.from}
              </>
            ) : (
              <>
                Sent ${t.amount} to {t.to}
              </>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

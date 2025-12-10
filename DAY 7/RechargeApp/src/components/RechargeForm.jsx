import { useState } from "react";

export default function RechargeForm({ selectedPlan, onClose, onRecharge }) {
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState(selectedPlan.price);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter valid 10-digit mobile");
      return;
    }

    onRecharge({ mobile, amount, plan: selectedPlan });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <form className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30" onSubmit={submit}>
        <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recharge - {selectedPlan.name}</h3>

        <label className="block mt-4 text-sm font-semibold text-gray-700">Mobile Number</label>
        <input 
          className="border-2 border-gray-200 focus:border-blue-500 p-3 w-full rounded-lg mt-1 transition-colors"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          placeholder="Enter 10-digit mobile number"
        />

        <label className="block mt-4 text-sm font-semibold text-gray-700">Amount</label>
        <input 
          className="border-2 border-gray-200 focus:border-blue-500 p-3 w-full rounded-lg mt-1 transition-colors"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-3 bg-red-50 p-2 rounded">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} type="button" className="border-2 border-gray-300 hover:border-gray-400 px-6 py-2 rounded-lg transition-colors font-semibold">Cancel</button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg">Pay ₹{amount}</button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { X, Delete, Calculator } from 'lucide-react';

export default function GRECalculator({ isOpen, onClose, onTransferValue }) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [pendingOp, setPendingOp] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  if (!isOpen) return null;

  const handleDigit = (digit) => {
    if (display === '0' || waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setPendingOp(null);
    setWaitingForOperand(false);
  };

  const handleSquareRoot = () => {
    const val = parseFloat(display);
    if (val < 0) {
      setDisplay('Error');
    } else {
      setDisplay(String(Math.sqrt(val)));
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const handleOp = (op) => {
    const val = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(val);
    } else if (pendingOp) {
      const current = prevValue;
      let newResult = current;
      if (pendingOp === '+') newResult = current + val;
      if (pendingOp === '-') newResult = current - val;
      if (pendingOp === '*') newResult = current * val;
      if (pendingOp === '/') newResult = val !== 0 ? current / val : 'Error';

      setDisplay(String(newResult));
      setPrevValue(newResult);
    }

    setWaitingForOperand(true);
    setPendingOp(op);
  };

  const handleEqual = () => {
    const val = parseFloat(display);
    if (pendingOp && prevValue !== null) {
      let result = prevValue;
      if (pendingOp === '+') result = prevValue + val;
      if (pendingOp === '-') result = prevValue - val;
      if (pendingOp === '*') result = prevValue * val;
      if (pendingOp === '/') result = val !== 0 ? prevValue / val : 'Error';

      setDisplay(String(result));
      setPrevValue(null);
      setPendingOp(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 w-72 bg-[#0B192C] text-white rounded-2xl shadow-2xl border-2 border-slate-700 p-4 font-mono select-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Calculator className="w-4 h-4 text-[#1769E0]" />
          <span>GRE® Calculator</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Display */}
      <div className="bg-[#0F172A] p-3 rounded-xl text-right mb-4 border border-slate-800">
        <span className="text-2xl font-bold tracking-wider text-green-400 overflow-x-auto block">
          {display}
        </span>
      </div>

      {/* Calculator Keypad */}
      <div className="grid grid-cols-4 gap-2 text-xs font-bold">
        <button onClick={handleClear} className="bg-red-500/20 text-red-400 p-2.5 rounded-lg hover:bg-red-500/30">C</button>
        <button onClick={handleSquareRoot} className="bg-slate-800 text-slate-200 p-2.5 rounded-lg hover:bg-slate-700">√</button>
        <button onClick={handleToggleSign} className="bg-slate-800 text-slate-200 p-2.5 rounded-lg hover:bg-slate-700">±</button>
        <button onClick={() => handleOp('/')} className="bg-[#1769E0] text-white p-2.5 rounded-lg hover:bg-[#102A56]">÷</button>

        <button onClick={() => handleDigit(7)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">7</button>
        <button onClick={() => handleDigit(8)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">8</button>
        <button onClick={() => handleDigit(9)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">9</button>
        <button onClick={() => handleOp('*')} className="bg-[#1769E0] text-white p-2.5 rounded-lg hover:bg-[#102A56]">×</button>

        <button onClick={() => handleDigit(4)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">4</button>
        <button onClick={() => handleDigit(5)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">5</button>
        <button onClick={() => handleDigit(6)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">6</button>
        <button onClick={() => handleOp('-')} className="bg-[#1769E0] text-white p-2.5 rounded-lg hover:bg-[#102A56]">-</button>

        <button onClick={() => handleDigit(1)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">1</button>
        <button onClick={() => handleDigit(2)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">2</button>
        <button onClick={() => handleDigit(3)} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">3</button>
        <button onClick={() => handleOp('+')} className="bg-[#1769E0] text-white p-2.5 rounded-lg hover:bg-[#102A56]">+</button>

        <button onClick={() => handleDigit(0)} className="col-span-2 bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">0</button>
        <button onClick={handleDecimal} className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-slate-700">.</button>
        <button onClick={handleEqual} className="bg-[#18A957] text-white p-2.5 rounded-lg hover:bg-[#128342]">=</button>
      </div>

      {/* Transfer Value Button */}
      {onTransferValue && (
        <button
          onClick={() => onTransferValue(display)}
          className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 py-2 rounded-lg border border-slate-700 text-center"
        >
          Transfer Display to Entry Box
        </button>
      )}

    </div>
  );
}

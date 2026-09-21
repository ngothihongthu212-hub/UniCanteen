import React, { useState } from 'react';
import {
  X,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCcw,
  Sparkles,
  CreditCard,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';

export const WalletModal: React.FC = () => {
  const {
    currentUser,
    activeModal,
    setActiveModal,
    topUpWallet,
    transactions
  } = useCanteen();

  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number>(100000);

  if (activeModal !== 'wallet') return null;

  const quickAmounts = [20000, 50000, 100000, 200000, 500000];

  const handleTopUp = () => {
    const amount = customAmount ? parseInt(customAmount, 10) : selectedQuickAmount;
    if (amount && amount > 0) {
      topUpWallet(amount);
      setCustomAmount('');
    }
  };

  const userTransactions = transactions.filter(t => t.userId === currentUser.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-serif text-stone-900">
                Ví CanteenPay Sinh Viên
              </h2>
              <p className="text-xs text-stone-500">
                Thanh toán một chạm — Không cần tiền lẻ tại quầy
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Balance Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 p-6 text-white shadow-xl shadow-emerald-900/10">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block">
                  Số dư khả dụng
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight my-1">
                  {currentUser.walletBalance.toLocaleString('vi-VN')}
                  <span className="text-lg sm:text-xl ml-1 font-sans font-bold">VNĐ</span>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
                Cổng thanh toán Demo
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-emerald-100">
              <span>Chủ ví: <strong className="text-white">{currentUser.fullName}</strong></span>
              <span>MSSV: <strong className="text-white">{currentUser.studentId || '2374820011'}</strong></span>
            </div>
          </div>

          {/* Top-up Form */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              Chọn mệnh giá nạp tiền nhanh
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {quickAmounts.map((amt) => {
                const isSelected = selectedQuickAmount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedQuickAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold font-mono transition-all border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {(amt / 1000).toLocaleString('vi-VN')}k
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-stone-600 block mb-1">
                Hoặc nhập số tiền tùy ý:
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="VD: 150000"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                  VNĐ
                </span>
              </div>
            </div>

            <button
              onClick={handleTopUp}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                Nạp +{(customAmount ? parseInt(customAmount, 10) || 0 : selectedQuickAmount).toLocaleString('vi-VN')}đ vào ví
              </span>
            </button>
          </div>

          {/* Transaction History */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Lịch sử giao dịch gần đây
            </h3>

            {userTransactions.length === 0 ? (
              <p className="text-xs text-stone-400 italic text-center py-4">
                Chưa có giao dịch nào
              </p>
            ) : (
              <div className="divide-y divide-stone-100 border border-stone-200/80 rounded-2xl overflow-hidden bg-stone-50/50">
                {userTransactions.map((tx) => {
                  const isTopUp = tx.type === 'top_up';
                  const isRefund = tx.type === 'refund';

                  return (
                    <div key={tx.id} className="p-3.5 flex items-center justify-between gap-3 text-xs bg-white">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isTopUp
                              ? 'bg-emerald-100 text-emerald-700'
                              : isRefund
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {isTopUp ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : isRefund ? (
                            <RotateCcw className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900 leading-snug">
                            {tx.description}
                          </p>
                          <span className="text-[11px] text-stone-400">
                            {new Date(tx.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {new Date(tx.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`font-mono font-bold ${
                          tx.amount > 0 ? 'text-emerald-600' : 'text-stone-900'
                        }`}
                      >
                        {tx.amount > 0 ? `+${tx.amount.toLocaleString('vi-VN')}đ` : `${tx.amount.toLocaleString('vi-VN')}đ`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

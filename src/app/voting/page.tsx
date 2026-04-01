'use client';

import { useState, useCallback } from 'react';
import { suggestDishes, getCurrentMealTime } from '@/lib/suggest';
import { Dish } from '@/data/dishes';
import { VoteSession, createSession, castVote, getResults, hasEveryoneVoted } from '@/lib/voting';
import DishCard from '@/components/DishCard';

type Phase = 'setup' | 'voting' | 'results';

export default function VotingPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [members, setMembers] = useState<string[]>(['']);
  const [session, setSession] = useState<VoteSession | null>(null);
  const [currentMember, setCurrentMember] = useState(0);

  const addMember = () => setMembers((prev) => [...prev, '']);
  const removeMember = (index: number) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };
  const updateMember = (index: number, value: string) => {
    setMembers((prev) => prev.map((m, i) => (i === index ? value : m)));
  };

  const startVoting = useCallback(() => {
    const validMembers = members.filter((m) => m.trim());
    if (validMembers.length < 2) return;

    const dishes = suggestDishes({ mealTime: getCurrentMealTime() }, 4);
    const newSession = createSession(dishes, validMembers);
    setSession(newSession);
    setCurrentMember(0);
    setPhase('voting');
  }, [members]);

  const handleVote = (dishId: string, vote: 'up' | 'down') => {
    if (!session) return;
    const memberName = session.members[currentMember];
    const updated = castVote(session, memberName, dishId, vote);
    setSession(updated);
  };

  const nextMember = () => {
    if (!session) return;
    if (currentMember < session.members.length - 1) {
      setCurrentMember((prev) => prev + 1);
    } else {
      setPhase('results');
    }
  };

  const currentMemberVotes = session?.votes[session.members[currentMember]] || {};
  const allDishesVoted = session?.dishes.every((d) => d.id in currentMemberVotes) || false;

  const results = session ? getResults(session) : [];

  const reset = () => {
    setPhase('setup');
    setSession(null);
    setCurrentMember(0);
    setMembers(['']);
  };

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">👨‍👩‍👧</div>
        <h1 className="text-2xl font-bold text-gray-900">Vote gia đình</h1>
        <p className="text-sm text-gray-500 mt-1">Mỗi người vote, app quyết định cho cả nhà</p>
      </div>

      {/* Setup Phase */}
      {phase === 'setup' && (
        <div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-3">Thành viên gia đình</h2>
            <div className="space-y-2">
              {members.map((member, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateMember(i, e.target.value)}
                    placeholder={`Thành viên ${i + 1} (VD: Ba, Mẹ, Con...)`}
                    className="flex-1 px-3 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 border border-gray-100"
                  />
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(i)}
                      className="px-3 text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addMember}
              className="mt-3 w-full py-2 text-sm text-orange-500 font-medium border border-dashed border-orange-300 rounded-xl hover:bg-orange-50"
            >
              + Thêm thành viên
            </button>
          </div>

          <button
            onClick={startVoting}
            disabled={members.filter((m) => m.trim()).length < 2}
            className="w-full mt-4 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-base shadow-lg shadow-orange-200 transition-all active:scale-95 disabled:opacity-40"
          >
            🗳️ Bắt đầu Vote
          </button>

          <p className="text-center text-xs text-gray-400 mt-2">Cần ít nhất 2 thành viên</p>
        </div>
      )}

      {/* Voting Phase */}
      {phase === 'voting' && session && (
        <div>
          {/* Progress */}
          <div className="mb-4 flex items-center gap-2">
            {session.members.map((member, i) => (
              <div
                key={member}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  i < currentMember ? 'bg-green-400' : i === currentMember ? 'bg-orange-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="bg-orange-50 rounded-xl p-3 mb-4 text-center">
            <p className="text-sm text-orange-700">
              🙋 Lượt của <span className="font-bold">{session.members[currentMember]}</span>
            </p>
            <p className="text-xs text-orange-500 mt-0.5">
              ({currentMember + 1}/{session.members.length})
            </p>
          </div>

          <div className="space-y-3">
            {session.dishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                showVoting
                onVote={handleVote}
                currentVote={currentMemberVotes[dish.id]}
              />
            ))}
          </div>

          {allDishesVoted && (
            <button
              onClick={nextMember}
              className="w-full mt-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-base shadow-lg shadow-green-200 transition-all active:scale-95 animate-bounce-in"
            >
              {currentMember < session.members.length - 1 ? '➡️ Người tiếp theo' : '🎉 Xem kết quả'}
            </button>
          )}
        </div>
      )}

      {/* Results Phase */}
      {phase === 'results' && results.length > 0 && (
        <div>
          {/* Winner */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 text-center mb-4 border border-yellow-200 animate-bounce-in">
            <div className="text-5xl mb-2">🏆</div>
            <h2 className="text-lg font-bold text-yellow-800">Cả nhà ăn</h2>
            <div className="text-4xl mt-2">{results[0].dish.image}</div>
            <p className="text-xl font-bold text-gray-900 mt-1">{results[0].dish.name}</p>
            <p className="text-sm text-gray-500 mt-1">{results[0].dish.description}</p>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700">
              ⭐ {results[0].score} điểm
            </div>
          </div>

          {/* Other results */}
          {results.length > 1 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase">Các lựa chọn khác</h3>
              {results.slice(1).map((r, i) => (
                <div key={r.dish.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                  <span className="text-gray-400 text-sm font-medium">#{i + 2}</span>
                  <span className="text-2xl">{r.dish.image}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{r.dish.name}</p>
                  </div>
                  <span className={`text-sm font-medium ${r.score > 0 ? 'text-green-500' : r.score < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {r.score > 0 ? '+' : ''}{r.score}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={reset}
            className="w-full mt-4 py-3 bg-white border-2 border-orange-200 text-orange-600 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:bg-orange-50"
          >
            🔄 Vote lại
          </button>
        </div>
      )}
    </div>
  );
}

import { Dish } from '@/data/dishes';

export interface VoteSession {
  id: string;
  dishes: Dish[];
  votes: Record<string, Record<string, 'up' | 'down'>>; // memberId -> dishId -> vote
  members: string[];
  createdAt: number;
}

export function createSession(dishes: Dish[], members: string[]): VoteSession {
  return {
    id: Math.random().toString(36).slice(2, 8),
    dishes,
    votes: {},
    members,
    createdAt: Date.now(),
  };
}

export function castVote(
  session: VoteSession,
  memberId: string,
  dishId: string,
  vote: 'up' | 'down'
): VoteSession {
  return {
    ...session,
    votes: {
      ...session.votes,
      [memberId]: {
        ...(session.votes[memberId] || {}),
        [dishId]: vote,
      },
    },
  };
}

export function getResults(session: VoteSession): { dish: Dish; score: number }[] {
  return session.dishes
    .map((dish) => {
      let score = 0;
      for (const memberId of Object.keys(session.votes)) {
        const memberVotes = session.votes[memberId];
        if (memberVotes[dish.id] === 'up') score += 1;
        if (memberVotes[dish.id] === 'down') score -= 1;
      }
      return { dish, score };
    })
    .sort((a, b) => b.score - a.score);
}

export function hasEveryoneVoted(session: VoteSession): boolean {
  return session.members.every((member) => {
    const memberVotes = session.votes[member];
    if (!memberVotes) return false;
    return session.dishes.every((dish) => dish.id in memberVotes);
  });
}

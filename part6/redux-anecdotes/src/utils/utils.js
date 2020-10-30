const generateId = () => (100000 * Math.random()).toFixed(0);

const sortedByVotes = (objArr) => (objArr.sort((a, b) => (b.votes - a.votes)));

export {
  generateId,
  sortedByVotes
};

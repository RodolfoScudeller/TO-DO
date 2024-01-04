const calcOffset = (page, pageSize) => (page > 0 ? (page - 1) * pageSize : 0);

module.exports = calcOffset;

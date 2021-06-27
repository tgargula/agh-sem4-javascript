const getDateSpan = (startDate, endDate) => {
    const currDate = new Date(startDate);
    const end = new Date(endDate);
    const results = [];
    while (currDate <= end) {
      results.push(new Date(currDate).toISOString().split('T')[0]);
      currDate.setDate(currDate.getDate() + 1);
    }
    return results;
}

module.exports = {getDateSpan};
export default (array, N) =>
  array
    .sort(() => Math.random() - Math.random())
    .slice(0, N)

// start = Math.round(Math.random() * (data.length - 1))
// simpleNumber = data.length === 17 ? 5 : ,
// let array = []
// for (let i = 0; i < numberOfCases; i++)
// array.push(data[(start + (i * simpleNumber)) % data.length])

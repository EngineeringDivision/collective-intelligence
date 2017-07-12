// Silly node test
const { Map } = require('immutable')
const data = require('../data/movie-critic-ratings.json')
const { simDistance } = require('./recommendations/euclidian.js')

console.log(simDistance())
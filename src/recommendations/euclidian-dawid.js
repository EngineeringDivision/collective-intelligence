// Silly node test
const { Map, Set, fromJS } = require('immutable')
const data = require('../../data/movie-critic-ratings.json')

/** Non-immutable version */
const simDistance = ( data, p1, p2 ) => {
    const common = Object.keys( data[p1] )
        .filter( item => 
            data[p2][item] != null )
        .reduce( (r, item) => {
            r[item] = 1
            return r
        }, {})
    if (Object.keys(common).length == 0)
        return 0;

    const sumOfSquares = Object.keys( common )
        .reduce( (s, item) => 
            s + Math.pow(data[p1][item]-data[p2][item],2) 
            , 0 )

    return 1/(1 + Math.sqrt(sumOfSquares))
} 

/** Uses immutable data structures */
const simDistanceImm = ( data = Map(), p1, p2 ) => {
    const common =
        Set(data.get(p1, Map()).keySeq()).intersect(
        Set(data.get(p2, Map()).keySeq()))

    return common.isEmpty()
        ? 0
        : 1/(1 + Math.sqrt(common.reduce( (s, item) => 
            s + Math.pow( 
                data.getIn([p1,item]) - data.getIn([p2,item]), 2), 
                0)))

}


console.log('Answer: ' + 
    // JSON.stringify(simDistance(data, 'Lisa Rose','Lisa Rose')))
    JSON.stringify(simDistance(data, 'Lisa Rose','Michael Phillips')))

console.log('Answer (IMM): ' + 
    // JSON.stringify(simDistance(data, 'Lisa Rose','Lisa Rose')))
    JSON.stringify(simDistanceImm( fromJS(data), 'Lisa Rose','Michael Phillips')))

module.exports = {
    simDistance
}
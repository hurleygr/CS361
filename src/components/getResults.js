import {list} from './stock_data'

function getResults(query) {
    const filteredList = list.filter((x => (x.Symbol.toLowerCase().includes(query.toLowerCase()) || x.Name.toLowerCase().includes(query.toLowerCase())))).slice(0,30)
    return filteredList
  }

  export default getResults
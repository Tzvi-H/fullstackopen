import ReactDOM from 'react-dom'
import App from './App'

let counter = 1

function refresh() {
  ReactDOM.render(
    <App counter={counter} />, 
    document.getElementById('root')
  )
}

refresh()
setInterval(() => {
  counter += 1;
  refresh()
}, 1000);
import Selector from './components/Selector'
import Results from './components/Results'
import { HashRouter as Router, Route } from 'react-router-dom'


function App() {

  return (
    

        <div style={{ height :"500px" ,width : "400px" ,position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'}}>
          <Router>
              <Route exact path="/" component={Selector} />
              <Route path="/results/:id" children={<Results/>} />
          </Router>
        </div>
  );
}

export default App;

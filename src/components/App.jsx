import Tree from './Tree';

function Header() {
  return (
    <header className="App-header">
      <h1>Maple</h1>
    </header>
  );
}
  
function Maple() {
  return (
    <div className="App">
      <Header />
      <Tree />
    </div>
  );
}
  
export default Maple;
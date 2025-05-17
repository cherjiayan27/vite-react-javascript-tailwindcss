import Example from './components/PeopleList';
import HockeyTeamList from './components/HockeyTeamList';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-6">People List</h1>
        <Example />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-6">Hockey Teams</h1>
        <HockeyTeamList />
      </div>
    </div>
  );
}

export default App;

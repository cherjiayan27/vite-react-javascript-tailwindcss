// Sample hockey team data
const hockeyTeams = [
  {
    id: 1,
    name: 'Maple Leafs',
    city: 'Toronto',
    logo: 'https://images.unsplash.com/photo-1546636889-ba9fdd63583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Canadiens',
    city: 'Montreal',
    logo: 'https://images.unsplash.com/photo-1546636889-ba9fdd63583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Canucks',
    city: 'Vancouver',
    logo: 'https://images.unsplash.com/photo-1546636889-ba9fdd63583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
];

function HockeyTeamItem({ team }) {
  return (
    <li className="flex py-4">
      <img className="size-10 rounded-full" src={team.logo} alt="" />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{team.name}</p>
        <p className="text-sm text-gray-500">{team.city}</p>
      </div>
    </li>
  );
}

export default function HockeyTeamList() {
  return (
    <ul className="divide-y divide-gray-200">
      {hockeyTeams.map(team => (
        <HockeyTeamItem key={team.id} team={team} />
      ))}
    </ul>
  );
}

import ListPanel from "./components/ListPanel";

export default function Home() {
  const sampleItems = [
    {
      id: 1,
      title: "Cricket",
      content:
        "Cricket is a bat-and-ball game played between two teams of eleven players. It is set on a cricket field centered around a 22-yard-long pitch with two wickets (each comprising a bail balanced on three stumps) at each end. One team bats, attempting to score as many runs as possible, while the other team bowls and fields, trying to minimize the number of runs scored and dismiss the batsmen.",
    },
    {
      id: 2,
      title: "Football",
      content:
        "Football, known as soccer in some countries, is a team sport played with a spherical ball between two teams of eleven players. It is played by approximately 250 million players in over 200 countries and dependencies, making it the world's most popular sport. The game is played on a rectangular field with a goal at each end. The object is to score by moving the ball beyond the goal line into the opposing goal.",
    },
    {
      id: 3,
      title: "Basketball",
      content:
        "Basketball is a team sport in which two teams, most commonly of five players each, compete to shoot a ball through the opponent's hoop, which is an elevated net and ring. The team with the most points at the end of the game wins. It is played on a rectangular court with a hoop at each end. Players advance the ball by bouncing it while walking or running or by passing it to teammates.",
    },
    {
      id: 4,
      title: "Baseball",
      content:
        "Baseball is a bat-and-ball game played between two opposing teams who take turns batting and fielding. The game proceeds when a player on the fielding team, called the pitcher, throws a ball which a player on the batting team tries to hit with a bat. The objective is to score runs by hitting a thrown ball with a bat and touching a series of bases arranged at the corners of a 90-foot square, or diamond.",
    },
  ];
  return (
    <main className="max-w-screen-lg	mx-auto py-10">
      <ListPanel items={sampleItems} />
    </main>
  );
}

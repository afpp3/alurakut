import { Main } from '../components/MainGrid';
import { AlurakutMenu } from '../lib/AlurakutCommons';

export default function Home() {
  const githubUser = 'afpp3';

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <Main githubUser={githubUser} />
    </>
  );
}

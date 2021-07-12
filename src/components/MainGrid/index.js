import Image from 'next/image';
import { OrkutNostalgicIconSet } from '../../lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
import { MainGrid, Box } from './styles';

function ProfileSidebar() {
  const gitHubUser = 'afpp3';

  return (
    <Box>
      <Image
        src={`http://github.com/${gitHubUser}.png`}
        alt="profile"
        height={40}
        width={40}
        layout="responsive"
        aria-label="Profile Picture"
        className="profilePicture"
      />
    </Box>
  );
}

export const Main = () => {
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar />
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>

          <OrkutNostalgicIconSet />
        </Box>
      </div>

      <div
        className="profileRelationsArea"
        style={{ gridArea: 'profileRelationsArea' }}
      >
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((user) => (
              <li key={user}>
                <a href={`/users/${user}`} key={user}>
                  <img src={`https://github.com/${user}.png`} />
                  <span>{user}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>Comunidades</Box>
      </div>
    </MainGrid>
  );
};

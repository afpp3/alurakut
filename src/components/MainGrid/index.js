import Image from 'next/image';
import { useState } from 'react';
import {
  AlurakutMenuProfileSidebar,
  OrkutNostalgicIconSet,
} from '../../lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
import { MainGrid, Box } from './styles';

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <AlurakutMenuProfileSidebar githubUser={githubUser} />
    </Box>
  );
}

export const Main = ({ githubUser }) => {
  const [communities, setCommunities] = useState([]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  const handleCreateCommunity = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.target);

    const community = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image'),
    };

    setCommunities([...communities, community]);
  };

  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>

          <form onSubmit={handleCreateCommunity}>
            <div>
              <input
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Coloque uma URL para usarmos de capa"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>

            <button>Criar comunidade</button>
          </form>
        </Box>
      </div>

      <div
        className="profileRelationsArea"
        style={{ gridArea: 'profileRelationsArea' }}
      >
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades({communities.length})</h2>

          <ul>
            {communities.map((community) => (
              <li key={community.id}>
                <a href={`/community/${community.title}`} key={community.title}>
                  <img src={community.image} />
                  <span>{community.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>

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
      </div>
    </MainGrid>
  );
};

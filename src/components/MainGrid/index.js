import Image from 'next/image';
import { useState } from 'react';
import {
  AlurakutMenuProfileSidebar,
  OrkutNostalgicIconSet,
} from '../../lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations/styles';
import { MainGrid, Box } from './styles';

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <AlurakutMenuProfileSidebar githubUser={githubUser} />
    </Box>
  );
}

export const Main = ({
  githubUser,
  followers,
  communities,
  setCommunities,
}) => {
  // const [communities, setCommunities] = useState([]);

  const handleCreateCommunity = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.target);

    const community = {
      title: dataForm.get('title'),
      imageUrl: dataForm.get('image'),
      creatorSlug: githubUser,
    };

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    }).then(async (res) => {
      const data = await res.json();
      const newCommunity = data.record;
      setCommunities([...communities, newCommunity]);
    });
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
                type="url"
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
                  <img src={community.imageUrl} alt={community.title} />
                  <span>{community.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({followers.length})
          </h2>

          <ul>
            {followers.map((user) => (
              <li key={user.id}>
                <a href={`/users/${user}`}>
                  <img
                    src={`https://github.com/${user.login}.png`}
                    alt={user}
                  />
                  <span>{user.login}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  );
};

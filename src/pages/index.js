import { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import { Main } from '../components/MainGrid';
import { AlurakutMenu } from '../lib/AlurakutCommons';

export default function Home({ githubUser }) {
  // const githubUser = 'afpp3';

  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/afpp3/followers')
      .then((data) => data.json())
      .then((dataJson) => setFollowers(dataJson));

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: '43e205a2fe4dfac57ad4f6593ebd3c',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query communitys {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const communitiesData = data.data.allCommunities;
        setCommunities(communitiesData);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <Main
        githubUser={githubUser}
        followers={followers}
        communities={communities}
        setCommunities={setCommunities}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch(
    'http://alurakut.vercel.app/api/auth',
    {
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser,
    },
  };
}

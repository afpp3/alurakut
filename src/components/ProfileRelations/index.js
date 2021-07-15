import { ProfileRelationsBoxWrapper } from './styles';

export const ProfileRelationsBox = ({ title, total, interation }) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title}({total})
      </h2>

      <ul>
        {interation.map((item) => (
          <li key={item}>
            <a href={`/community/${item.title}`} key={item}>
              <img src={item} alt={item} />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

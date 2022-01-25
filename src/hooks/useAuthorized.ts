import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';

export default () => useSelector(authorizedSelector);

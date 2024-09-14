import Post from '../../components/post';
import { posts } from '../../store/posts';

export default function Flow() {
  return (
    <>
      {posts.map((post, index) => <Post post={post} key={index} />)}
    </>
  );
}
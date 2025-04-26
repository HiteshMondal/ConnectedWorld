import { useQuery } from '@tanstack/react-query';

export const PostList = () => {
    const {} = useQuery({
        queryKey: ["posts"],
    })
    return <div>PostList</div>;
};

export default PostList;
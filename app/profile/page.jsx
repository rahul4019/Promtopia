'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();

        setPosts(data);
      })();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {};
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

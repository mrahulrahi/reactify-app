'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CreateVideoPage = () => {

  const router = useRouter();

  useEffect(() => {
    router.push('create-video/upload-photo');
  }, []);

  return (
    <>
    </>
  )
}

export default CreateVideoPage;

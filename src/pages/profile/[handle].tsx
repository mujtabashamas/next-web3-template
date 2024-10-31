// app/profile/[handle]/page.tsx
//@ts-ignore

'use client'
import { useProfile, usePublications, Profile } from '@lens-protocol/react-web'

import { Head } from 'components/layout/Head'
import { useRouter } from 'next/router'

export default function Profile({}) {
  const router = useRouter()
  const { handle } = router.query
  console.log(handle)
  let { data: profile, loading } = useProfile({ handle: handle as string })

  if (loading) return <p className="p-14">Loading ...</p>

  return (
    <>
      <Head />

      <main>
        <div>
          <div className="p-14">
            {profile?.picture?.__typename === 'MediaSet' && (
              <img width="200" height="200" alt={profile.handle} className="rounded-xl" src={profile.picture.original.url} />
            )}
            <h1 className="text-3xl my-3">{profile?.handle}</h1>
            <h3 className="text-xl mb-4">{profile?.bio}</h3>
            <h2 className="text-xl mb-4">Publications:</h2>
            <br />
            {profile && <Publications profile={profile} />}
          </div>
        </div>
      </main>
    </>
  )
}

function Publications({ profile }: { profile: Profile }) {
  let { data: publications } = usePublications({
    profileId: profile.id,
    limit: 10,
  })
  publications = publications?.map((publication) => {
    if (publication.__typename === 'Mirror') {
      return publication.mirrorOf
    } else {
      return publication
    }
  })

  return (
    <>
      {publications?.map((pub: any, index: number) => (
        <>
          <div key={index} className="py-4 bg-zinc-900 rounded mb-3 px-4">
            <p>{pub.metadata.content}</p>
            {pub.metadata?.media[0]?.original && ['image/jpeg', 'image/png'].includes(pub.metadata?.media[0]?.original.mimeType) && (
              <img width="400" height="400" alt={profile.handle} className="rounded-xl mt-6 mb-2" src={pub.metadata.media[0].original.url} />
            )}
          </div>
          <br />
        </>
      ))}
    </>
  )
}

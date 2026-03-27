import MovePageComp from '@mod/moves/components/move-page-com'
import React from 'react'

interface MovePageProps {
    params: Promise<{
        slug: string
    }>
}

const MovePage: React.FC<MovePageProps> = async ({ params }) => {
    const { slug } = await params
    return <MovePageComp slug={slug} />
}

export default MovePage